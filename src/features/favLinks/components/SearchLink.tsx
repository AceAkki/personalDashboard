import { useRef } from "react";
import type { FavLinksProps } from "../favLinkTypes";
const SearchLink = ({ search, setSearch }: FavLinksProps) => {
  const timeoutRef = useRef<number | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    console.log(
      timeoutRef.current,
      search.searchQuery === "" && value !== "" && search.searchQuery !== value,
    );
    timeoutRef.current = window.setTimeout(() => {
      if (
        search.searchQuery === "" &&
        value !== "" &&
        search.searchQuery !== value
      ) {
        setSearch((prevSearch) => {
          return {
            ...prevSearch,
            searchQuery: value,
          };
        });
      }
    }, 4000);
  }
  return (
    <div className="search-link">
      <input
        type="text"
        placeholder="Search"
        value={search.searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchLink;
