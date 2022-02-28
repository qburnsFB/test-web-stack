import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents a date and time following the ISO 8601 standard */
  DateTime: any;
  _Any: any;
  _FieldSet: any;
};

export type CreateUserInput = {
  address: Scalars["String"];
  description: Scalars["String"];
  dob: Scalars["String"];
  name: Scalars["String"];
};

export enum MathOptions {
  Ceil = "CEIL",
  Floor = "FLOOR",
  Round = "ROUND",
}

export type Mutation = {
  __typename?: "Mutation";
  _createSnapshot: Scalars["Boolean"];
  createUser: User;
  deleteUser: Scalars["ID"];
  updateUser: User;
};

export type Mutation_CreateSnapshotArgs = {
  key: Scalars["String"];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: "Query";
  _aggregation: Scalars["Float"];
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  _typeDefs: Scalars["String"];
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Query_AggregationArgs = {
  field?: InputMaybe<Scalars["String"]>;
  ref?: InputMaybe<Scalars["String"]>;
  stat: Scalars["String"];
  type?: InputMaybe<Scalars["String"]>;
};

export type Query_EntitiesArgs = {
  representations: Array<Scalars["_Any"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  dir?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  ref?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<UsersWhere>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  dob?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  _boolean?: Scalars["Boolean"];
  _float?: Scalars["Float"];
  _int?: Scalars["Int"];
  _nest?: User;
  _string?: Scalars["String"];
  address: Scalars["String"];
  description: Scalars["String"];
  dob: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type User_FloatArgs = {
  fixed?: InputMaybe<Scalars["Int"]>;
  max?: InputMaybe<Scalars["Float"]>;
  min?: InputMaybe<Scalars["Float"]>;
};

export type User_IntArgs = {
  max?: InputMaybe<Scalars["Int"]>;
  min?: InputMaybe<Scalars["Int"]>;
};

export type User_StringArgs = {
  casing?: InputMaybe<Scalars["String"]>;
  full?: InputMaybe<Scalars["Boolean"]>;
  length?: InputMaybe<Scalars["Int"]>;
  locale?: InputMaybe<Scalars["String"]>;
  max?: InputMaybe<Scalars["Int"]>;
  min?: InputMaybe<Scalars["Int"]>;
  nationality?: InputMaybe<Scalars["String"]>;
  pool?: InputMaybe<Scalars["String"]>;
  sentences?: InputMaybe<Scalars["Int"]>;
  syllables?: InputMaybe<Scalars["Int"]>;
  template?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
  words?: InputMaybe<Scalars["Int"]>;
};

export type UserAddressArgs = {
  length?: InputMaybe<Scalars["Int"]>;
};

export type UserDescriptionArgs = {
  length?: InputMaybe<Scalars["Int"]>;
};

export type UserDobArgs = {
  length?: InputMaybe<Scalars["Int"]>;
};

export type UserNameArgs = {
  length?: InputMaybe<Scalars["Int"]>;
};

export type UsersWhere = {
  address_contains?: InputMaybe<Scalars["String"]>;
  address_endswith?: InputMaybe<Scalars["String"]>;
  address_eq?: InputMaybe<Scalars["String"]>;
  address_exists?: InputMaybe<Scalars["Boolean"]>;
  address_in?: InputMaybe<Array<Scalars["String"]>>;
  address_neq?: InputMaybe<Scalars["String"]>;
  address_nin?: InputMaybe<Array<Scalars["String"]>>;
  address_startswith?: InputMaybe<Scalars["String"]>;
  and?: InputMaybe<Array<UsersWhere>>;
  description_contains?: InputMaybe<Scalars["String"]>;
  description_endswith?: InputMaybe<Scalars["String"]>;
  description_eq?: InputMaybe<Scalars["String"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]>;
  description_in?: InputMaybe<Array<Scalars["String"]>>;
  description_neq?: InputMaybe<Scalars["String"]>;
  description_nin?: InputMaybe<Array<Scalars["String"]>>;
  description_startswith?: InputMaybe<Scalars["String"]>;
  dob_contains?: InputMaybe<Scalars["String"]>;
  dob_endswith?: InputMaybe<Scalars["String"]>;
  dob_eq?: InputMaybe<Scalars["String"]>;
  dob_exists?: InputMaybe<Scalars["Boolean"]>;
  dob_in?: InputMaybe<Array<Scalars["String"]>>;
  dob_neq?: InputMaybe<Scalars["String"]>;
  dob_nin?: InputMaybe<Array<Scalars["String"]>>;
  dob_startswith?: InputMaybe<Scalars["String"]>;
  id_eq?: InputMaybe<Scalars["Float"]>;
  id_ge?: InputMaybe<Scalars["Float"]>;
  id_gt?: InputMaybe<Scalars["Float"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_le?: InputMaybe<Scalars["Float"]>;
  id_lt?: InputMaybe<Scalars["Float"]>;
  id_neq?: InputMaybe<Scalars["Float"]>;
  id_nin?: InputMaybe<Array<Scalars["ID"]>>;
  like?: InputMaybe<Scalars["String"]>;
  name_contains?: InputMaybe<Scalars["String"]>;
  name_endswith?: InputMaybe<Scalars["String"]>;
  name_eq?: InputMaybe<Scalars["String"]>;
  name_exists?: InputMaybe<Scalars["Boolean"]>;
  name_in?: InputMaybe<Array<Scalars["String"]>>;
  name_neq?: InputMaybe<Scalars["String"]>;
  name_nin?: InputMaybe<Array<Scalars["String"]>>;
  name_startswith?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<Array<UsersWhere>>;
  or?: InputMaybe<Array<UsersWhere>>;
  search?: InputMaybe<Scalars["String"]>;
};

export type _Entity = User;

export type _Service = {
  __typename?: "_Service";
  sdl?: Maybe<Scalars["String"]>;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars["ID"];
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    id: string;
    name: string;
    dob: string;
    address: string;
    description: string;
  };
};

export type GetUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  users?: Array<{
    __typename?: "User";
    id: string;
    name: string;
    dob: string;
    address: string;
    description: string;
  } | null> | null;
};

export type SearchUsersQueryVariables = Exact<{
  where?: InputMaybe<UsersWhere>;
}>;

export type SearchUsersQuery = {
  __typename?: "Query";
  users?: Array<{
    __typename?: "User";
    id: string;
    name: string;
    dob: string;
    address: string;
    description: string;
  } | null> | null;
};

export const UpdateUserDocument = gql`
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

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  );
}
export const GetUsersDocument = gql`
  query getUsers($page: Int, $limit: Int) {
    users(page: $page, limit: $limit) {
      id
      name
      dob
      address
      description
    }
  }
`;

export function useGetUsersQuery(
  options?: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, "query">
) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
}
export const SearchUsersDocument = gql`
  query searchUsers($where: UsersWhere) {
    users(where: $where) {
      id
      name
      dob
      address
      description
    }
  }
`;

export function useSearchUsersQuery(
  options?: Omit<Urql.UseQueryArgs<SearchUsersQueryVariables>, "query">
) {
  return Urql.useQuery<SearchUsersQuery>({
    query: SearchUsersDocument,
    ...options,
  });
}
import { IntrospectionQuery } from "graphql";
export default {
  __schema: {
    queryType: {
      name: "Query",
    },
    mutationType: {
      name: "Mutation",
    },
    subscriptionType: null,
    types: [
      {
        kind: "OBJECT",
        name: "Mutation",
        fields: [
          {
            name: "_createSnapshot",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "key",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "createUser",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "input",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "deleteUser",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "updateUser",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
              {
                name: "input",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Query",
        fields: [
          {
            name: "_aggregation",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "field",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "ref",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "stat",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
              {
                name: "type",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "_entities",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "UNION",
                  name: "_Entity",
                  ofType: null,
                },
              },
            },
            args: [
              {
                name: "representations",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "LIST",
                    ofType: {
                      kind: "NON_NULL",
                      ofType: {
                        kind: "SCALAR",
                        name: "Any",
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            name: "_service",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "_Service",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "_typeDefs",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "user",
            type: {
              kind: "OBJECT",
              name: "User",
              ofType: null,
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "users",
            type: {
              kind: "LIST",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [
              {
                name: "dir",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "limit",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "page",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "ref",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "sort",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "where",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "User",
        fields: [
          {
            name: "_boolean",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "_float",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "fixed",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "max",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "min",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "_int",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "max",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "min",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "_nest",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "User",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "_string",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "casing",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "full",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "length",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "locale",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "max",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "min",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "nationality",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "pool",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "sentences",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "syllables",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "template",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "type",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
              {
                name: "words",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "address",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "length",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "description",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "length",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "dob",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "length",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [
              {
                name: "length",
                type: {
                  kind: "SCALAR",
                  name: "Any",
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: "UNION",
        name: "_Entity",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "User",
          },
        ],
      },
      {
        kind: "OBJECT",
        name: "_Service",
        fields: [
          {
            name: "sdl",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "SCALAR",
        name: "Any",
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery;
