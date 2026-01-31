import { type ReactElement } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

// Define the props for the Header component
type HeaderProps = { title?: string };
// Create the Header component that accepts title as a prop and returns type ReactElement
export function Header({ title }: HeaderProps): ReactElement {
  return (
    <div className="header">
      <div>
        <Link to="./">
          <h1>{title}</h1>
        </Link>
      </div>
      <div>
        <p>User</p>
      </div>
    </div>
  );
}
