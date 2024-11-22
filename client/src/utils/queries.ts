import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
  query getSingleUser($id: ID, $username: String) {
    getSingleUser(id: $id, username: $username) {
      username
      email
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

