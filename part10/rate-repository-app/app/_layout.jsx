import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AppBar from "../src/components/AppBar";
import client from "./../src/utils/apolloClient.js";
import AuthStorageContext from './../src/context/AuthStorageContext.jsx'
import { authStorage } from "../src/utils/authStorage.js";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <AuthStorageContext.Provider value={authStorage}>
        <View style={{ flex: 1 }}>
          <AppBar />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
