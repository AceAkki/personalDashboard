import { Link } from "react-router-dom";
import { GearIcon, LayoutIcon } from "@phosphor-icons/react";

import { useEffect, useRef, type ReactElement } from "react";

import "./Header.css";

// Define the props for the Header component
type HeaderProps = { title?: string };
// Create the Header component that accepts title as a prop and returns type ReactElement
export function Header({ title }: HeaderProps): ReactElement {
  //console.log(userData);
  let headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const nav = headerRef.current;
    if (!nav) return;
    let headerHeight = Math.floor(nav.getBoundingClientRect().height) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);
  }, []);
  return (
    <header className="header" ref={headerRef}>
      <div className="header-logo-wrap">
        <Link to=".">
          <LayoutIcon size={32} weight="fill" />
          <p>{title}</p>
        </Link>
      </div>
      <button className="user-header-wrap">
        {/* <div className="username-header-wrap">
          <p>{userData.username}</p>
        </div> */}
        <div className="icon-header-wrap">
          <GearIcon size={32} />
        </div>
      </button>
    </header>
  );
}
