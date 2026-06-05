import { useState } from "react";
import SearchForm from "./search-form";
import SearchHistory from "./search-history";
import SearchResult from "./search-result";
import type { TSearchUser } from "../api";

export default function SearchUser() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState<TSearchUser[]>([]);
  return (
    <>
      <SearchForm
        setIsSearchActive={setIsSearchActive}
        setSearchResult={setSearchResult}
      />
      {isSearchActive ? (
        <SearchResult users={searchResult} />
      ) : (
        <SearchHistory />
      )}
    </>
  );
}
