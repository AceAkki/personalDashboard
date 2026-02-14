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
    {
      name: "WolframAlpha",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://www.wolframalpha.com&sz=256",
      searchURL: "https://www.wolframalpha.com/input/?i=",
    },
    {
      name: "StackOverflow",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://stackoverflow.com&sz=256",
      searchURL: "https://stackoverflow.com/search?q=",
    },
    {
      name: "GitHub",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://github.com&sz=256",
      searchURL: "https://github.com/search?q=",
    },
  ],
  StaticLinks: [
    {
      name: "Downdetector",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://downdetector.com&sz=256",
      searchURL: "https://downdetector.com",
    },
    {
      name: "Threatmap",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://threatmap.checkpoint.com&sz=256",
      searchURL: "https://threatmap.checkpoint.com",
    },
    {
      name: "SpeedTest",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://fast.com&sz=256",
      searchURL: "https://fast.com",
    },
    {
      name: "Wayback",
      favicon:
        "http://www.google.com/s2/favicons?domain=https://archive.org/web/&sz=256",
      searchURL: "https://archive.org/web/",
    },
  ],
};
type favLinksKey = keyof typeof favLinks;

import { toastErrMsg } from "../../../global/utilsToast";

const RenderFavLinks = ({ search, setSearch }: FavLinksProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [name, type] = e.target.value.split(" | ");
    let paramBoolean = type === "SearchLinks" ? true : false;
    let searchURL = Object.values(favLinks)
      .flat()
      .find((link) => link.name === name)?.searchURL as string;
    setSearch((prevSeach) => {
      return {
        ...prevSeach,
        searchURL: searchURL,
        isParamNeeded: paramBoolean,
      };
    });
  }

  if (search.searchURL !== "") {
    setTimeout(() => {
      search.searchQuery !== "" && search.isParamNeeded
        ? window.open(`${search.searchURL}${search.searchQuery}`, "_blank")
        : search.searchQuery === "" && !search.isParamNeeded
          ? window.open(`${search.searchURL}`, "_blank")
          : null;

      setSearch({
        searchURL: "",
        searchQuery: "",
        isParamNeeded: false,
      });
    }, 2000);
  }
  return (
    <div className="fav-links-btns">
      {Object.keys(favLinks).map((key) => {
        return favLinks[key as favLinksKey].map((link) => {
          return (
            <label className="fav-link-label">
              <input
                type="radio"
                name="search-Links"
                value={`${link.name} | ${key}`}
                onChange={handleChange}
              />
              <div className="fav-link-img" key={link.name}>
                <img src={link.favicon} alt={link.name} />
              </div>
            </label>
          );
        });
      })}
    </div>
  );
};
export default RenderFavLinks;
