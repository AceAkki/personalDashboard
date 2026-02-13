export type FavLink = {
  name: string;
  favicon: string;
  searchURL: string;
};

export type SeachParam = {
  searchURL: string;
  searchQuery: string;
};
export type FavLinksProps = {
  search: SeachParam;
  setSearch: React.Dispatch<React.SetStateAction<SeachParam>>;
};
