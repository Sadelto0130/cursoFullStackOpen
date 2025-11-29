import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutation";

export const createUser = () => {
  const [mutate, result] = useMutation(CREATE_USER)
  
  const create_user = async({username, password}) => {
    try {
      const {data} = await mutate({
        variables: {
            user: {
              username, 
              password,
            }           
        }
      })
  
      return data?.createUser
    } catch (error) {
      console.log("GraphQL RAW ERROR:", JSON.stringify(error, null, 2));
      const code = error?.graphQLErrors?.[0]?.extensions?.code;
      if (code === "USERNAME_TAKEN") {
        throw new Error("Username is already taken.");
      }
      throw new Error("Could not create the user. Please try again later.");
    }   
  }
  return [create_user, result]
}