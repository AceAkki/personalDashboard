import { NavLink } from "react-router-dom";
import {
  KanbanIcon,
  CloudIcon,
  ClockCountdownIcon,
  NoteIcon,
  NewspaperIcon,
} from "@phosphor-icons/react";
import type { ReactElement } from "react";
import "./QuickLinks.css";

// QuickLinks component providing navigation links
const QuickLinks = (): ReactElement => {
  return (
    <div className="quick-wrap">
      <ul className="quick-links">
        <li>
          <NavLink to="/taskmanager" aria-label="link to taskmanager">
            {({ isActive }) => (
              <KanbanIcon size={32} weight={isActive ? "fill" : "regular"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather" aria-label="link to weather">
            {({ isActive }) => (
              <CloudIcon size={32} weight={isActive ? "fill" : "regular"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/pomodoro" aria-label="link to pomodoro">
            {({ isActive }) => (
              <ClockCountdownIcon
                size={32}
                weight={isActive ? "fill" : "regular"}
              />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/notes" aria-label="link to notes">
            {({ isActive }) => (
              <NoteIcon size={32} weight={isActive ? "fill" : "regular"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/newsfeed" aria-label="link to newsfeed">
            {({ isActive }) => (
              <NewspaperIcon size={32} weight={isActive ? "fill" : "regular"} />
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
