import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection
  ){
    repositories (
      orderBy: $orderBy, 
      orderDirection: $orderDirection
    ) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName      
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
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

export const GET_REPOSITORY = gql`
query Repository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    description
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    url
    language
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`