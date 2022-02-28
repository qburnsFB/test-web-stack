import Head from "next/head";
import { UsersList } from "./UsersList";

export const Home = () => {
  return (
    <div className="Home">
      <Head>
        <title>SF Project - Users List</title>
      </Head>
      <UsersList />
    </div>
  );
};
