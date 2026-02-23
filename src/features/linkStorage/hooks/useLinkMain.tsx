import { useState, useRef } from "react";
import type { linkObjectSet } from "../linkTypes";

const useLinkMain = (setLinks: linkObjectSet) => {
  const [link, setLink] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      updateLink(value);
    }, 1000);
  };

  const updateLink = (value: string) => {
    let fourtyEightHours = new Date().getTime() + 1 * 60 * 1000;
    console.log(fourtyEightHours, new Date(fourtyEightHours));
    setLinks({ link: value, expiryTime: fourtyEightHours });
    setLink("");
  };

  return {
    link,
    handleChange,
  };
};

export default useLinkMain;
