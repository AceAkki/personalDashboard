import { type ReactElement } from "react";
import "./Header.css";

// Define the props for the Header component
type HeaderProps = {title?: string};
            // Create the Header component that accepts title as a prop and returns type ReactElement
export function Header({title}: HeaderProps): ReactElement {
  return (
    <header className="header">
     <div>
      <h1>{title}</h1>
     </div>
     <div>
      <p>User</p>
     </div>
    </header>
  );
}