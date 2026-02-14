import type { FavLinksProps } from "../favLinkTypes";
const SearchLink = ({ search, setSearch }: FavLinksProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch((prevSearch) => {
        return {
          ...prevSearch,
          searchQuery: value,
        };
      });
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
