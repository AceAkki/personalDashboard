interface CurrentTasksProps {
  taskData: string[];
}

const CurrentTasks = ({ taskData }: CurrentTasksProps) => {
  return (
   <>
    <h3>Current Tasks</h3>
     <ul>
      {taskData.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
   </>
  );
};

export default CurrentTasks;