import gql from "graphql-tag";

export const getUsers = gql`
  query getUsers($page: Int, $limit: Int) {
      users (page: $page, limit: $limit) {
          id
          name
          dob
          address
          description
      }
  }
`;
