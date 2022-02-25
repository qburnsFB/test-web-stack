import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GetUsersDocument, User } from "@lib/gql/generated";
import { Heading } from "@components/Common";
import { getPageFromURL, scrollPageBy } from "@lib/helpers";
import { useSearch } from "@lib/hooks";
import { SearchInput, UserCard } from "@components/Home";
import { UsersListFooter } from "@components/Home/UsersList";
import { useState } from "react";
import { useClient } from "urql";
import * as url from "url";
const cardLimit = 6;

export const UsersList = (): JSX.Element => {
  const client = useClient();
  const { handleSearch, searchResults, isSearching, searchTerm }: SearchType = useSearch();

  // Loading/button states
  const [loading, setLoading] = useState(true);
  const showLoader = loading || isSearching;
  const [outOfUsers, setOutOfUsers] = useState(false);

  // If last server result returned less than requested, or if search has completed, or if no results at all,
  const showOutOfUsers = outOfUsers || (!showLoader && searchTerm);

  // Users and Ref Setup
  const [users, setUsers] = useState([]);
  const usersToUse = searchTerm ? searchResults : users;
  const firstNewUserIndex = useRef(0);
  const focusRef = useRef(null);

  // Initial fetch
  useEffect(() => {
    if (!users.length) {
      handleFetchUsers({ initialLoad: true });
    }

    // We assign a ref to the first new user that has loaded in, so we can focus it and continue
    // using our tab/keyboard navigation for a11y instead of it jumping to the button
    const current = focusRef?.current as any;
    if (current?.focus) {
      current?.focus();
      scrollPageBy(document.body.scrollHeight - 100);
    }
  }, [users]);

  const handleFetchUsers = async ({ initialLoad = false }) => {
    setLoading(true);
    const urlPage = getPageFromURL();
    let pageToUse = 1;
    let limitToUse = cardLimit;

    if (initialLoad && urlPage > 1) {
      limitToUse = urlPage * cardLimit; // if we're coming in from a reload, we need to check the page and grab that many
    }
    if (!initialLoad) {
      pageToUse = urlPage === 1 ? 2 : urlPage + 1;
    }


    const { data } = await client
      .query(GetUsersDocument, { page: pageToUse, limit: limitToUse })
      .toPromise();

    if (data?.users?.length) {

      // Set ref index so we can use it after to properly focus on the latest user to appear
      // Mostly for accessibility / keyboard navigation
      firstNewUserIndex.current = data.users.length - cardLimit || usersToUse?.length;

      // Set users and show out of users response if required
      // @ts-ignore
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
      const lessThanExpected = initialLoad ? urlPage * cardLimit : cardLimit;
      if (data.users.length < lessThanExpected) {
        setOutOfUsers(true);
      }
    }

    // Update url so we can refresh and get back to the same spot
    if (!initialLoad) {
      const pageToSet = pageToUse;
      window.history.replaceState("", "", `/?page=${pageToSet.toString()}`);
    }

    setLoading(false);
  };

  const renderUsers = () => {
    return usersToUse?.map((user: User, i: number) => {
      const isFirstNewResult = i === firstNewUserIndex.current;

      // As mentioned above in fetch method, set focus on the newest result so a11y works as expected.
      // Skips for first page so we can maintain focus on search on load

      const giveFocusRef = isFirstNewResult && usersToUse.length > cardLimit ? focusRef : undefined;
      return (
        <UserCard
          key={user.id}
          user={user}
          ref={giveFocusRef}
        />
      );
    });
  };

  return (
    <>
      <main
        css={{
          display: "grid",
          alignContent: "center",
          gridTemplateRows: "1fr auto",
          gridTemplateColumns: "repeat(3, 440px)",
          gridGap: "4rem",
          justifyContent: "center",
          overflow: "hidden",
          padding: "2rem 0",
        }}
      >
        <Heading
          as="h1"
          size="larger"
          css={{
            marginBottom: "-0.7rem",
          }}
        >
          Users list
        </Heading>
        <SearchInput handleSearch={handleSearch} existingUsers={users} />
        {renderUsers()}
      </main>
      <UsersListFooter
        loading={showLoader}
        outOfUsers={showOutOfUsers}
        handleFetchUsers={handleFetchUsers}
      />
    </>
  );
};
