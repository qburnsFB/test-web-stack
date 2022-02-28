import { useEffect, useRef, useState } from "react";
import { GetUsersDocument, User } from "@lib/gql/generated";
import { Heading } from "@components/Common";
import { getPageFromURL, scrollPageBy } from "@lib/helpers";
import { useSearch, UseSearchType } from "@lib/hooks";
import { SearchInput, UserCard } from "@components/Home";
import { UsersListFooter } from "@components/Home/UsersList";
import { useRecoilState } from "recoil";
import { usersAtom } from "@components/Home/store";
import { useClient } from "urql";

const cardLimit = 6;

export const UsersList = (): JSX.Element => {
  const client = useClient();
  const {
    handleSearch,
    searchResults,
    isSearching,
    searchTerm,
  }: UseSearchType = useSearch();

  // Loading/button states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const showLoader = loading || isSearching;
  const [outOfUsers, setOutOfUsers] = useState(false);

  // Users and Ref Setup
  const [users, setUsers] = useRecoilState(usersAtom);
  const usersToUse = searchTerm ? searchResults : users;
  const firstNewUserIndex = useRef(0);
  const focusRef = useRef(null);

  // If last server result returned less than requested, or if search has completed, or if no results at all,
  const showOutOfUsers = outOfUsers || (!showLoader && Boolean(searchTerm));

  // Initial fetch, and handle scrolling when length of users changes.
  // Note, has to be length of users since we can update the users in place and don't want to rescroll
  useEffect(() => {
    if (!users.length) {
      handleFetchUsers();
    } else {
      scrollPageBy(document.body.scrollHeight - 100);
    }
  }, [users?.length]);

  const handleFetchUsers = async () => {
    setError(false);
    setLoading(true);

    // Figure out which page to search for
    // if we're coming in from a reload, we need to check the page from the url and grab PAGE * CARD_LIMIT
    const urlPage = getPageFromURL();
    let pageToUse = 1;
    let limitToUse = cardLimit;

    if (initialLoad && urlPage > 1) {
      limitToUse = urlPage * cardLimit;
    }
    if (!initialLoad) {
      pageToUse = urlPage === 1 ? 2 : urlPage + 1;
    }

    // Finally, fetch the data once we have that sorted
    const { data, error } = await client
      .query(GetUsersDocument, { page: pageToUse, limit: limitToUse })
      .toPromise();

    if (error) {
      setLoading(false);
      return setError(true);
    }

    if (data?.users?.length) {
      // Set ref index so we can use it after to properly focus on the latest user to appear
      // Mostly for accessibility / keyboard navigation
      firstNewUserIndex.current =
        data.users.length - cardLimit || usersToUse?.length;
      setUsers((prevUsers: User[]) => [...prevUsers, ...data.users]);

      // If we have less users than we expect now, we're out of users and can't grab anymore
      const lessThanExpected = initialLoad ? urlPage * cardLimit : cardLimit;
      if (data.users.length < lessThanExpected) {
        setOutOfUsers(true);
      }
    }

    // Update url so we can refresh and get back to the same spot
    if (!initialLoad) {
      window.history.replaceState("", "", `/?page=${pageToUse.toString()}`);
    } else {
      setInitialLoad(false);
    }

    setLoading(false);
  };

  const renderUsers = () => {
    return usersToUse?.map((user: User, i: number) => {
      const isFirstNewResult = i === firstNewUserIndex.current;

      // As mentioned above in fetch method, set focus on the newest result so a11y works as expected.
      // It is skipped for first page so we can maintain focus on search on load

      const giveFocusRef =
        isFirstNewResult && usersToUse.length > cardLimit
          ? focusRef
          : undefined;
      return <UserCard key={user.id} user={user} ref={giveFocusRef} />;
    });
  };

  return (
    <>
      <div
        className="UsersList"
        data-testid="UsersList"
        css={{
          display: "grid",
          gridTemplateRows: "1fr auto",
          gridGap: "4rem",
          gridTemplateColumns: "repeat(3, 440px)",
          justifyContent: "center",
          padding: "2rem 0",
        }}
      >
        <main
          css={{
            gridColumnStart: 1,
            gridColumnEnd: 4,
            display: "grid",
            gridTemplateRows: "1fr auto",
            gridTemplateColumns: "repeat(3, 440px)",
            gridGap: "4rem",
            marginBottom: "-3rem",
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
          <SearchInput handleSearch={handleSearch} isSearching={isSearching} />
        </main>
        <ul
          css={{
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateRows: "1fr auto",
            gridTemplateColumns: "repeat(3, 440px)",
            gridGap: "4rem",
          }}
        >
          {renderUsers()}
        </ul>
      </div>
      <UsersListFooter
        errorFetching={error}
        loading={showLoader}
        outOfUsers={showOutOfUsers}
        handleFetchUsers={handleFetchUsers}
      />
    </>
  );
};
