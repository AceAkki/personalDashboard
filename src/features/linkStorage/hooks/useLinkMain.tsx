import { useState, useRef } from "react";
import type { reactStringSet } from "../../mainTypes";
const useLinkMain = (setLinks: reactStringSet) => {
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
    setLinks((prevLinks: string[]) => [...prevLinks, value]);
    setLink("");
  };

  return {
    link,
    handleChange,
  };
};

export default useLinkMain;
