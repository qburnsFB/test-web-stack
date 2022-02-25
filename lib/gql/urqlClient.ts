import { createClient, Client } from "urql";

export const urqlClient: Client = createClient({
  url: "https://fakeql.com/graphql/f0b6645e9f97e407c7b3ffb216b3f0a0",
});