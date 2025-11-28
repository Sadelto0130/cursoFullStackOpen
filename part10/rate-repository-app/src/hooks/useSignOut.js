import { useApolloClient } from "@apollo/client";
import { useContext } from "react";
import AuthStorageContext from "../context/AuthStorageContext";

export const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext)

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return signOut;
};