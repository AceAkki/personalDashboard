export type linkObject = {
  link: string;
  expiryTime: number;
};

export type linkObjectSet = React.Dispatch<React.SetStateAction<linkObject[]>>;
