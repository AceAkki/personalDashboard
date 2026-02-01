import { Link, useOutletContext } from "react-router-dom";
import type { OutletContextType } from "../task-manager/types";
import TasksMain from "../task-manager/components/TasksMain";

const BentoStructure = () => {
  const [tasks, setTasks] = useOutletContext<OutletContextType>();
  return (
    <>
      <div>
        <h1>Welcome to the Bento Grid Dashboard</h1>
      </div>
      <div>
        <Link to="../taskmanager">
          <TasksMain taskData={tasks} taskSet={setTasks} Type="Current" />
        </Link>
      </div>
    </>
  );
};

export default BentoStructure;
