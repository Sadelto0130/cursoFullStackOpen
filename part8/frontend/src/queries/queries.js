import import gql from 'graphql-tag'; from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      __typename
    }
    published
    genres
    __typename
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
    ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const USER = gql`
  query getUser {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createNewBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor(
    $name: String!,
    $born: Int!
  ){
    editAuthor(
      name: $name,
      born: $born
    ){
      name
      born
    }  
  }
`;

export const LOGIN = gql`
  mutation loginUSer(
    $username: String!,
    $password: String!
  ){
    login(
      username: $username,
      password: $password
    ) {
      value  
    }
  }
`;

export const CREATE_USER = gql`
  mutation createNewUser(
    $username: String!,
    $password: String!,
    $favoriteGenre: String!
  ){
    createUser(
      username: $username,
      password: $password,
      favoriteGenre: $favoriteGenre
    ) {
      username  
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
    ${BOOK_DETAILS}
`
