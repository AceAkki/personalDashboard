import { Form } from "react-router-dom";
const TaskForm = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <Form method="post">
      <div>
        <input
          type="text"
          name="task"
          placeholder="Add a New Task"
          required
          ref={inputRef}
        />
      </div>
      <div>
        <button type="submit">Add Task</button>
      </div>
    </Form>
  );
};

export default TaskForm;
