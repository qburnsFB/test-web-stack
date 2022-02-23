import { createClient, Client } from "urql";

export const urqlClient: () => Client = () => {
  const clientWithOptions = createClient({
    url: "https://graphqlzero.almansi.me/api",
  });
  return clientWithOptions;
};
