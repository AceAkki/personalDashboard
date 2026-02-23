export type linkObject = {
  link: string;
  expiryTime: number;
};

export type linkObjectSet = (link: linkObject) => void;

export type RenderLinksProps = {
  links: linkObject[];
  deleteLink: (link: string) => void;
};
