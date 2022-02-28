import { useEffect, useRef } from "react";
import { Button, Heading } from "@components/Common";
import { CombinedError } from "urql";
import { scrollPageBy } from "@lib/helpers";

type UsersListFooterType = {
  outOfUsers: boolean;
  loading?: boolean;
  errorFetching?: CombinedError | boolean;
  handleFetchUsers: ({
    initialLoad,
  }: {
    initialLoad?: boolean;
  }) => Promise<void>;
};
export const UsersListFooter = ({
  outOfUsers,
  loading,
  handleFetchUsers,
  errorFetching,
}: UsersListFooterType) => {
  const retryRef = useRef(null);

  useEffect(() => {
    if (errorFetching) {
      const refToUse = retryRef?.current as any;
      refToUse.focus({ preventScroll: true });
      scrollPageBy(document.body.scrollHeight - 100);
    }
  }, [errorFetching]);

  const renderFooter = () => {
    if (errorFetching) {
      return (
        <div
          css={{
            textAlign: "center",
          }}
        >
          <Heading size="larger" as="h2">
            Failed to grab users
          </Heading>
          <Button
            ref={retryRef}
            loading={loading}
            disabled={loading}
            onClick={handleFetchUsers}
            css={{
              marginTop: "1rem",
            }}
          >
            TRY AGAIN
          </Button>
        </div>
      );
    }

    if (outOfUsers) {
      return (
        <>
          <Heading size="larger" as="h2">
            No more users to display!
          </Heading>
          <button
            css={{
              marginTop: "1rem",
              display: "inline-block",
              "&:focus": {
                span: {
                  outline: "2px solid #555",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                },
              },
            }}
            onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>BACK TO TOP</span>
          </button>
        </>
      );
    }

    return (
      <Button loading={loading} disabled={loading} onClick={handleFetchUsers}>
        LOAD MORE
      </Button>
    );
  };

  return (
    <footer
      css={{
        display: "grid",
        margin: "4rem 0",
        justifyContent: "center",
      }}
    >
      {renderFooter()}
    </footer>
  );
};
