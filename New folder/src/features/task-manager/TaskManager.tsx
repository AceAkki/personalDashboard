// react based import statements
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  type ActionFunctionArgs,
  useOutletContext,
} from "react-router-dom";

// component imports
import CurrentTasks from "./components/CurrentTasks";
import CompletedTasks from "./components/CompletedTasks";
import PriorityTasks from "./components/PriorityTasks";

// all type definitions
import { TaskActionData } from "./types";

// action function to handle form submissions
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const task = formData.get("task") as string;
  if (!task) return null;
  let newTask = {
    taskName: task,
    id: Date.now(),
    type: { Current: true, Priority: false, Completed: false },
  } as TaskActionData;
  return newTask;
}

const TaskManager = () => {
  const [tasks, setTasks] = useOutletContext() as [
    TaskActionData[],
    React.Dispatch<React.SetStateAction<TaskActionData[]>>
  ];
  const actionData = useActionData() as TaskActionData | null;

  useEffect(() => {
    if (actionData?.taskName) {
      console.log(actionData);
      setTasks((prev) => [...prev, actionData]);
    }
  }, [actionData]);

  return (
    <div>
      <h2>Task Manager</h2>
      <p>This is the Task Manager component.</p>

      <Form method="post">
        <input type="text" name="task" placeholder="New Task" required />
        <button type="submit">Add Task</button>
      </Form>

      <div>
        <CurrentTasks taskData={tasks} taskSet={setTasks} />
        <CompletedTasks />
        <PriorityTasks taskData={tasks} taskSet={setTasks} />
      </div>
    </div>
  );
};

export default TaskManager;
