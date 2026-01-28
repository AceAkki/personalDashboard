// react based import statements
import { useEffect, useState } from 'react';
import { Form, useActionData, type ActionFunctionArgs } from 'react-router-dom';

// component imports
import CurrentTasks from './components/CurrentTasks';
import CompletedTasks from './components/CompletedTasks';
import PriorityTasks from './components/PriorityTasks';

// all type definitions
interface TaskActionData {      
  task: string;
  id: number;
}


// action function to handle form submissions
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const task = formData.get('task') as string; 
  if (!task) return null;  
  return { task, id: Date.now() };
}

const TaskManager = () => {
   const [tasks, setTasks] = useState<string[]>([]);
   const actionData = useActionData() as TaskActionData | null; 

   useEffect(() => {
     if (actionData?.task) {
      setTasks(prev => [...prev, actionData.task]);
    }
    }, [actionData]);

  return (
    <div>
      <h2>Task Manager</h2>
      <p>This is the Task Manager component.</p>

      <Form method='post'>
        <input type="text" name='task' placeholder="New Task" required />
        <button type='submit'>Add Task</button>
      </Form>

      <div>
        <CurrentTasks taskData={tasks} />
        <CompletedTasks />
        <PriorityTasks />
      </div>
    </div>
  );
};

export default TaskManager;