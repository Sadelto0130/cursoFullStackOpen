import { gql } from "@apollo/client";

export const AUTHORIZE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      } 
    ) {
      id
      repositoryId
      user {
        id
        username
      }  
      rating
      createdAt
      text
    }
  }
`

/* export const CREATE_USER = gql`
  mutation CreateUser(
    $username: !String
    $password: !String
  ) {
    createUser(
      user: {
        username: $username
        password: $password
      }
    ) {
      id
      username
      createdAt  
    }
  }
` */

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
      createdAt  
    }
  }
`