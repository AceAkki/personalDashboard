import type { ReactElement } from "react";
import "./QuickLinks.css";
import { Link } from "react-router-dom";

// QuickLinks component providing navigation links
const QuickLinks = (): ReactElement => {
  return (
    <div className="quick-wrap">
      <ul className="quick-links">
        <li>
          <Link to="/taskmanager">Tasks</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
        <li>
          <Link to="/pomodoro">Pomodoro</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/newsfeed">News</Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
