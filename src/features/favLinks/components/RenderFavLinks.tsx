import type { FavLinksProps } from "../favLinkTypes";
const favLinks = {
  SearchLinks: [
    {
      name: "DuckDuckGo",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://duckduckgo.com&sz=256",
      searchURL: "https://duckduckgo.com/?q=",
    },
    {
      name: "Brave Search",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://search.brave.com&sz=256",
      searchURL: "https://search.brave.com/search?q=",
    },
    {
      name: "Google",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://www.google.com&sz=256",
      searchURL: "https://www.google.com/search?q=",
    },
    {
      name: "Wikipedia",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=256",
      searchURL: "https://en.wikipedia.org/wiki/Special:Search/",
    },
    {
      name: "Youtube",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://www.youtube.com&sz=256",
      searchURL: "https://www.youtube.com/results?search_query=",
    },
    {
      name: "Microsoft Bing",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://www.bing.com&sz=256",
      searchURL: "https://www.bing.com/search?form=&q=",
    },
    {
      name: "Yandex",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://yandex.com&sz=256",
      searchURL: "https://yandex.com/search?text=",
    },
  ],
};
const RenderFavLinks = ({ search, setSearch }: FavLinksProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    let searchURL = favLinks.SearchLinks.find(
      (link) => link.name === e.target.value,
    )?.searchURL as string;
    setSearch((prevSeach) => {
      return {
        ...prevSeach,
        searchURL: searchURL,
      };
    });
  }

  if (search.searchQuery !== "" && search.searchURL !== "") {
    setTimeout(() => {
      window.open(`${search.searchURL}${search.searchQuery}`, "_blank");
      setSearch({
        searchURL: "",
        searchQuery: "",
      });
    }, 2000);
  }
  return (
    <div className="fav-links-btns">
      {favLinks.SearchLinks.map((link) => {
        return (
          <label className="fav-link-label">
            <input
              type="radio"
              name="search-Links"
              value={link.name}
              onChange={handleChange}
            />
            <div className="fav-link-img" key={link.name}>
              <img src={link.favicon} alt={link.name} />
            </div>
          </label>
        );
      })}
    </div>
  );
};
export default RenderFavLinks;
