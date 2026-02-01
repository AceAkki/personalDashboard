import { Link, useOutletContext } from "react-router-dom";
import TasksMain from "../task-manager/components/TasksMain";
import Pomodoro from "../pomodoro/Pomodoro";
import type { OutletContextType } from "../task-manager/types";

import "./BentoStructure.css";

const BentoStructure = () => {
  const [tasks, setTasks] = useOutletContext<OutletContextType>();
  return (
    <>
      <div>
        <h1>Welcome to the Dashboard</h1>
      </div>
      <div className="bento-grid-layout">
        <div className="span-row">
          <TasksMain taskData={tasks} taskSet={setTasks} Type="Priority" />
        </div>

        <Pomodoro />
      </div>
    </>
  );
};

export default BentoStructure;
