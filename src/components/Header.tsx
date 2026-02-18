import { type ReactElement } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import type { userType } from "../features/mainTypes";

// Define the props for the Header component
type HeaderProps = { title?: string; userData: userType };
// Create the Header component that accepts title as a prop and returns type ReactElement
export function Header({ title, userData }: HeaderProps): ReactElement {
  return (
    <div className="header">
      <div>
        <Link to=".">
          <h1>{title}</h1>
        </Link>
      </div>
      <div>
        <p>{userData.username}</p>
      </div>
    </div>
  );
}
