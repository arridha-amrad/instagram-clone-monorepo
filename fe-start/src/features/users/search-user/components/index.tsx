import { useState } from "react";
import SearchForm from "./search-form";
import SearchHistory from "./search-history";
import SearchResult from "./search-result";
import type { TSearchUser } from "../api";

type Props = {
  setOpen: (v: boolean) => void;
};

export default function SearchUser({ setOpen }: Props) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState<TSearchUser[]>([]);
  return (
    <>
      <SearchForm
        setIsSearchActive={setIsSearchActive}
        setSearchResult={setSearchResult}
      />
      {isSearchActive ? (
        <SearchResult setOpen={setOpen} users={searchResult} />
      ) : (
        <SearchHistory setOpen={setOpen} />
      )}
    </>
  );
}
