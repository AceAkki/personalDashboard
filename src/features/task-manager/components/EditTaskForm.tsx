import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useTaskStore } from "../hooks/useTasksStore";
import type { TaskActionData } from "../taskTypes";

import "./EditTaskForm.css";

const EditTaskForm = ({ taskObject }: { taskObject: TaskActionData }) => {
  const { editTask, toggleEditMode } = useTaskStore(
    useShallow((state) => ({
      editTask: state.editTask,
      toggleEditMode: state.toggleEditMode,
    })),
  );
  const [newTaskTxt, SetNewTaskTxt] = useState<string>(taskObject.taskName);
  return (
    <div className="edit-task-form">
      <div className="edit-task-content">
        <div>
          <input
            type="text"
            value={newTaskTxt}
            className="task-edit show"
            onChange={(e) => {
              SetNewTaskTxt(e.target.value);
            }}
          />
        </div>
        <div className="btn-wrap">
          <button
            onClick={() => editTask({ id: taskObject.id, newTask: newTaskTxt })}
            className="confirm-btn"
          >
            Confirm
          </button>
          <button onClick={() => toggleEditMode()} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskForm;
