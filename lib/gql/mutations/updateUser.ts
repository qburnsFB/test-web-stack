import gql from "graphql-tag";

export const updateUser = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      dob
      address
      description
    }
  }
`;
