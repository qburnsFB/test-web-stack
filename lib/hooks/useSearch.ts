import { useState, useEffect } from "react";
import { useClient } from "urql";
import { useDebounce } from '@lib/hooks/useDebounce';
import {
  SearchUsersDocument,
} from "@lib/gql/generated";

type SearchType = {
  nameToSearch: string;
  existingUsers: User[];
};


const capitalizeFirstLetter = (name) => {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

export const useSearch = () => {
  const client = useClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  const handleSearch = async ({ nameToSearch, existingUsers }: SearchType) => {
  setSearchTerm(nameToSearch);
        const filtered = existingUsers.filter(u => u.name.includes(capitalizeFirstLetter(nameToSearch)));
       setSearchResults(filtered);
        setIsSearching(true);
  };

  useEffect(() => {
      if (debouncedSearchTerm) {

    const {
      data } = client
      .query(SearchUsersDocument, { where: { name_contains: capitalizeFirstLetter(debouncedSearchTerm) } })
      .toPromise().then(results => {
          setIsSearching(false);
          setSearchResults(results.data.users);
          console.log(results);
      });
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    },[debouncedSearchTerm]);

  return {
    searchResults,
    handleSearch,
    isSearching,
    searchTerm
  }
};
