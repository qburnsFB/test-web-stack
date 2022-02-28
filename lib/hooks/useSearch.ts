import { useState, useEffect } from "react";
import { useClient } from "urql";
import { useDebounce } from "@lib/hooks/useDebounce";
import { SearchUsersDocument, User } from "@lib/gql/generated";

export type SearchType = {
  nameToSearch: string;
  existingUsers: User[];
};

export type UseSearchType = {
  handleSearch: ({ nameToSearch, existingUsers }: SearchType) => Promise<void>;
  searchResults: [];
  isSearching: boolean;
  searchTerm: string;
};
const capitalizeFirstLetter = (name: string) => {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
};

export const useSearch = (): UseSearchType => {
  const client = useClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = async ({ nameToSearch, existingUsers }: SearchType) => {
    setSearchTerm(nameToSearch);
    const filtered = existingUsers.filter((u: User) =>
      u?.name?.includes(capitalizeFirstLetter(nameToSearch))
    );
    setSearchResults(filtered);
    setIsSearching(true);
  };

const handleFetchUsers = async () => {
    if (debouncedSearchTerm) {
      const { data } = await client
        .query(SearchUsersDocument, {
          where: { name_contains: capitalizeFirstLetter(debouncedSearchTerm) },
        })
        .toPromise();
          setIsSearching(false);
          setSearchResults(data?.users);
          console.log(data?.users);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
};
  useEffect(() => {
  handleFetchUsers();
  }, [debouncedSearchTerm]);

  return {
    searchResults,
    handleSearch,
    isSearching,
    searchTerm,
  };
};
