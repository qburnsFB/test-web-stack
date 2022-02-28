import { createClient, Client } from "urql";

export const urqlClient: Client = createClient({
  url: process.env.NEXT_PUBLIC_GQL_CLIENT,
});
