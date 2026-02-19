import { Link } from "react-router-dom";
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
          <Link to="/taskmanager" aria-label="link to taskmanager">
            <KanbanIcon size={32} weight="fill" />
          </Link>
        </li>
        <li>
          <Link to="/weather" aria-label="link to weather">
            <CloudIcon size={32} weight="fill" />
          </Link>
        </li>
        <li>
          <Link to="/pomodoro" aria-label="link to pomodoro">
            <ClockCountdownIcon size={32} weight="fill" />
          </Link>
        </li>
        <li>
          <Link to="/notes" aria-label="link to notes">
            <NoteIcon size={32} weight="fill" />
          </Link>
        </li>
        <li>
          <Link to="/newsfeed" aria-label="link to newsfeed">
            <NewspaperIcon size={32} weight="fill" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
