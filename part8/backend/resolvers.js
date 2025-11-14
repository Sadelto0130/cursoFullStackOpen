import jwt from 'jsonwebtoken'
import {GraphQLError} from 'graphql'
import {ApolloServerErrorCode} from '@apollo/server/errors'
import {UserInputError} from 'apollo-server-errors'
import Authors from './schemas/author.js'
import Books from './schemas/book.js'
import User from './schemas/user.js'

const resolvers = {
  Query: {
    dummy: () => 0,
    
    me: async (root, args, context) => {
      return context.currentUser
    },

    bookCount: async () => Books.collection.countDocuments(),

    authorCount: async () => Authors.collection.countDocuments(),

    allBooks: async (root, args) => {
      const filter = {}
      if(args.author) filter.author = args.author
      if(args.genre) filter.genres = {$in: [args.genre]}
 
      return Books.find(filter)
    },

    allAuthors: async (root, args) => {
      if(args.author) {
        return await Authors.find({name: args.author}) 
      }
      return await Authors.find({})
    }
  },

  Author: {
    bookCount: async (root) => {
      return await Books.countDocuments({author: root._id})
    }
  },

  Book: {
    author: async (root) => {
      return await Authors.findById(root.author);
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const {currentUser, pubsub} = context

      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if(!args.author || args.author.length < 4 ) {
        throw new GraphQLError('Name author to short', {
          extensions: {
            code: 'BAD_AUTHOR_NAME',
            argumentName: "author"
          }
        })
      }

      if(args.title.length < 2) {
        throw new GraphQLError('Title to short', {
          extensions: {
            code: 'BAD_TITLE',
            argumentName: "title"
          }
        })
      }
      let author = await Authors.findOne({name: args.author})
      if(!author) {
        author = new Authors({name: args.author})
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const newBook = new Books({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres ?? []
      })

      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const populatedBook = await newBook.populate('author')
      pubsub.publish('BOOK_ADDED', {bookAdded: populatedBook})
      
      return populatedBook
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      
      const author = await Authors.findOne({name: args.name})
      if(!author) return null
  
      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      if(!args.username || args.username.length < 2 ) {
        throw new GraphQLError('Username to short', {
          extensions: {
            code: 'BAD_USERNAME',
            argumentName: "username"
          }
        })
      }

      if(!args.password || args.password.length < 2) {
        throw new GraphQLError('Password to short', {
          extensions: {
            code: 'BAD_PASSWORD',
            argumentName: "password"
          }
        })
      }

      let newUser = await User.findOne({username: args.username})
      if(newUser) {
        throw new GraphQLError('Username all ready exist', {
          extensions: {
            code: 'BAD_USERNAME',
            argumentName: "username"
          }
        })
      }

      newUser = new User({
        username: args.username,
        password: args.password,
        favoriteGenre: args.favoriteGenre
      })

      try {
        await newUser.save()
        return newUser
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user) {
        throw new GraphQLError('Username not exist', {
          extensions: {
            code: 'BAD_USERNAME',
            argumentName: "username"
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: async(_, __, {pubsub}) => {
        return await pubsub.subscribe('BOOK_ADDED')
      }
    }
  }
}

export default resolvers