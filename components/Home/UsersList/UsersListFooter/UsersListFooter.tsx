import { Button, Heading } from "@components/Common";

type UsersListFooterType = {
  outOfUsers: boolean;
  loading: boolean;
  handleFetchUsers: ({ initialLoad }: { initialLoad?: boolean; }) => Promise<void>;
};
export const UsersListFooter = ({ outOfUsers, loading, handleFetchUsers }: UsersListFooterType) => {
  return (
    <footer
      css={{
        display: "grid",
        margin: "4rem 0",
        justifyContent: "center",
      }}
    >
      {outOfUsers ? (
        <>
          <Heading size="larger" as="h2">
            No more users to display!
          </Heading>
          <button
            css={{
              marginTop: "1rem",
            }}
            onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
          >
            BACK TO TOP
          </button>
        </>
      ) : (
        <Button loading={loading} disabled={loading} onClick={handleFetchUsers}>
          LOAD MORE
        </Button>
      )}
    </footer>
  );
};
