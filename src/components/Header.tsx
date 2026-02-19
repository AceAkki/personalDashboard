import { Link } from "react-router-dom";
import { GearIcon, LayoutIcon } from "@phosphor-icons/react";

import type { ReactElement } from "react";
import type { userType } from "../features/mainTypes";

import "./Header.css";

// Define the props for the Header component
type HeaderProps = { title?: string; userData: userType };
// Create the Header component that accepts title as a prop and returns type ReactElement
export function Header({ title, userData }: HeaderProps): ReactElement {
  console.log(userData);
  return (
    <header className="header">
      <div className="header-logo-wrap">
        <Link to=".">
          <LayoutIcon size={32} weight="fill" />
          <p>{title}</p>
        </Link>
      </div>
      <button className="user-header-wrap">
        <div className="username-header-wrap">
          <p>{userData.username}</p>
        </div>
        <div className="icon-header-wrap">
          <GearIcon size={32} />
        </div>
      </button>
    </header>
  );
}
