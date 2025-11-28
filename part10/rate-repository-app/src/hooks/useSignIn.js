import { useMutation, useApolloClient } from "@apollo/client";
import { useContext } from "react";
import { AUTHORIZE } from "../graphql/mutation";
import AuthStorageContext from "../context/AuthStorageContext";

export const useSignIn = () => {
  const [authorize, result] = useMutation(AUTHORIZE)
  const apolloClient = useApolloClient()
  const authStorage = useContext(AuthStorageContext)

  const signIn = async({username, password}) => {
    const {data} = await authorize({
      variables: {credentials: {username, password}}
    })

    const accessToken = data?.authenticate?.accessToken
    if(!accessToken) return null
    
    await authStorage.setAccessToken(accessToken)

    await apolloClient.resetStore()

    return accessToken
  }
  return [signIn, result]
};

