import gql from "graphql-tag";

export const searchUsers = gql`
  query searchUsers($where: UsersWhere) {
      users (where: $where) {
          id
          name
          dob
          address
          description
      }
  }
`;
