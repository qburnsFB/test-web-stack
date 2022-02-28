import { useEffect, useRef } from "react";
import { SearchType } from "@lib/hooks";
import { useTheme } from "@emotion/react";
import { Loader } from "@components/Common/Loader";
import { useRecoilValue } from "recoil";
import { usersAtom } from "@components/Home/store/usersAtom";

type SearchInputType = {
  handleSearch: ({ nameToSearch, existingUsers }: SearchType) => Promise<void>;
  isSearching: boolean;
};

export const SearchInput = ({ handleSearch, isSearching }: SearchInputType) => {
  const theme = useTheme();
  const ref = useRef(null);
  const existingUsers = useRecoilValue(usersAtom);
  useEffect(() => {
    const refToUse = ref?.current as any;
    refToUse.focus();
  }, []);

  return (
    <>
      <div
        className="SearchInput"
        css={{
          gridColumnStart: 3,
          margin: 0,
          position: "relative",
          top: "32px",
        }}
      >
        <input
          aria-label="Search through users"
          type="search"
          name="search"
          placeholder="Search..."
          ref={ref}
          css={{
            width: "300px",
            position: "relative",
            zIndex: theme.zIndex.low,
          }}
          tabIndex={0}
          onChange={(e) =>
            handleSearch({ nameToSearch: e.target.value, existingUsers })
          }
        />

        <span
          data-testid="searchInputIsSearching"
          css={{
            position: "absolute",
            right: "5rem",
            top: "1.5rem",
            opacity: isSearching ? 1 : 0,
            zIndex: theme.zIndex.low,
          }}
        >
          <Loader size="0.5rem" color="#ccc" />
        </span>
      </div>
    </>
  );
};
