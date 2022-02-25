import type { NextPage } from "next";
import Head from "next/head";
import { Heading } from '@components/Common';
import { UserCard } from './UserCard';
import { UsersList } from './UsersList';

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
