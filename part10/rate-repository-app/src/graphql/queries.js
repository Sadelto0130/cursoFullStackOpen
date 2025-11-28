import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          fullName      
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`

export const ME_USER = gql`
  query {
    me {
      id
      username
    }
  }
`