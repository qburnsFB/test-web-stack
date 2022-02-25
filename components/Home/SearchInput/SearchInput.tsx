import { useRef, useEffect } from 'react';
import { useSearch } from "@lib/hooks";
import { useTheme } from "@emotion/react";

type SearchInputType = {
    handleSearch: ({ nameToSearch, existingUsers }: SearchType) => Promise<void>;
    existingUsers: User[];
}
export const SearchInput = ({ handleSearch, existingUsers }: SearchInputType) => {
  const theme = useTheme();
  const ref = useRef(null);

  useEffect(() => {
      const refToUse = ref?.current as any;
       refToUse.focus();
  }, []);

  return (
    <>
      <span />
      <input
          ref={ref}
        css={{
          width: "300px",
          position: "relative",
          top: "33px",
          zIndex: theme.zIndex.low,
        }}
        tabIndex={0}
        placeholder="Search..."
        onChange={(e) => handleSearch({ nameToSearch: e.target.value, existingUsers })}
      />
    </>
  );
};
