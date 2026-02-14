import { useState } from "react";
import SearchLink from "./components/SearchLink";
import RenderFavLinks from "./components/RenderFavLinks";
import type { SeachParam } from "./favLinkTypes";
import "./favLinks.css";
const favLinks = () => {
  const [search, setSearch] = useState<SeachParam>({
    searchURL: "",
    searchQuery: "",
    isParamNeeded: false,
  });
  return (
    <div className="fav-links">
      <SearchLink search={search} setSearch={setSearch} />

      <RenderFavLinks search={search} setSearch={setSearch} />
    </div>
  );
};
export default favLinks;
