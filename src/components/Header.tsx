import { type ReactElement } from "react";

// Define the props for the Header component
type HeaderProps = {title?: string};
            // Create the Header component that accepts title as a prop and returns type ReactElement
export function Header({title}: HeaderProps): ReactElement {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
}