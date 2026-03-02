import { useShallow } from "zustand/shallow";
import useOptions from "../hooks/useOptions";
import { useTaskStore } from "../hooks/useTasksStore";
// type imports
import type { optionPopupProps } from "../taskTypes";

// css imports
import "./OptionsPopup.css";

export default function OptionsPopup({ refer, taskObject }: optionPopupProps) {
  const { MoveBtns, getCurrentType } = useOptions();
  const { moveTask, deleteTask } = useTaskStore(
    useShallow((state) => ({
      moveTask: state.moveTask,
      deleteTask: state.deleteTask,
    })),
  );

  let typesArr = ["Current", "Priority", "Completed"];
  let currentType = getCurrentType(taskObject.type);
  let newArr = Array.from(
    new Set(typesArr.filter((type) => type !== currentType)),
  );
  return (
    <div className={`options-wrap`} ref={refer}>
      <ul>
        <MoveBtns
          typesArr={newArr}
          moveTask={moveTask}
          taskObject={taskObject}
          currentType={currentType}
          targetType=""
        />
        <li>
          <button> Edit Task </button>
        </li>
        <li>
          <button onClick={() => deleteTask(taskObject.id)}>Delete Task</button>
        </li>
      </ul>
    </div>
  );
}
