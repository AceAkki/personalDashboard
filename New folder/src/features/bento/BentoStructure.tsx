import { Link, useOutletContext } from "react-router-dom";

import CurrentTasks from "../task-manager/components/CurrentTasks";

const BentoStructure = () => {
  const [tasks, setTasks] = useOutletContext() as [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ];
  return (
    <>
      <div>
        <h1>Welcome to the Bento Grid Dashboard</h1>
      </div>
      <div>
        <Link to="../taskmanager">
          <CurrentTasks taskData={tasks} />
        </Link>
      </div>
    </>
  );
};

export default BentoStructure;
