import 'dotenv/config'
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer' 
import {makeExecutableSchema} from '@graphql-tools/schema'
import {execute, subscribe} from 'graphql'
import {useServer} from 'graphql-ws/use/ws'
import { WebSocketServer } from 'ws'
import { createPubSub } from '@graphql-yoga/subscription'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import jwt from 'jsonwebtoken'
import './mongo.js'

import User from './schemas/user.js'
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const start = async () => {
  const pubsub = createPubSub()
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  })

  const subscriptionServer = useServer(
    {
      schema,
      execute,
      subscribe,
      context: async () => {return {pubsub}}
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("Bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { pubsub, currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    cors(),
    express.json(), 
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const auth = req?.headers?.authorization || null
        let currentUser = null

        if(auth && auth.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(
              auth.substring(7), process.env.JWT_SECRET
            )
            currentUser = await User.findById(decodedToken.id)
          } catch (error) {
            console.log("JWT error:", error.message)
          }
        }
        return {currentUser, pubsub}
      }
    }),
  )

  const PORT = process.env.PORT;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
    console.log(`Subscriptions is now running on http://localhost:${PORT}/graphql`)
  });
};

start();