import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDebounce } from "use-debounce";
import { searchUsersApi, type TSearchUser } from "../api";

type Props = {
  setIsSearchActive: Dispatch<SetStateAction<boolean>>;
  setSearchResult: Dispatch<SetStateAction<TSearchUser[]>>;
};

export default function SearchForm({
  setIsSearchActive,
  setSearchResult,
}: Props) {
  const [searchKey, setSearchKey] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [value] = useDebounce(searchKey, 500);
  useEffect(() => {
    const hasText = searchKey.trim().length > 0;
    setIsSearchActive(isFocused && hasText);
  }, [isFocused, searchKey, setIsSearchActive]);

  useEffect(() => {
    if (!!value) {
      searchUsersApi(value).then((users) => {
        setSearchResult(users);
      });
    } else {
      setSearchResult([]);
    }
  }, [value, setSearchResult]);

  return (
    <fieldset>
      <InputGroup>
        <InputGroupInput
          autoFocus={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 150);
          }}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {searchKey && (
          <InputGroupAddon
            onClick={() => {
              setSearchKey("");
            }}
            align="inline-end"
            className="cursor-pointer"
          >
            <X />
          </InputGroupAddon>
        )}
      </InputGroup>
    </fieldset>
  );
}
