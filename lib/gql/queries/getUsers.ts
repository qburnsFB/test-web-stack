import gql from "graphql-tag";

export const getUsers = gql`
  query getUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
      }
    }
  }
`;
