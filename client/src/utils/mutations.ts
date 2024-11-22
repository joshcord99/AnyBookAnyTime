import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation Mutation($username: String, $email: String, $password: String) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation Mutation($description: String, $bookId: String, $title: String) {
  saveBook(description: $description, bookId: $bookId, title: $title) {
    email
    savedBooks {
      bookId
    }
    username
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
