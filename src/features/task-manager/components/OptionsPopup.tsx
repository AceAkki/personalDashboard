import useOptions from "../hooks/useOptions";

// type imports
import type { optionPopupProps } from "../taskTypes";

// css imports
import "./OptionsPopup.css";

export default function OptionsPopup({
  refer,
  taskObject,
  moveTask,
}: optionPopupProps) {
  const { MoveBtns, getCurrentType } = useOptions();
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
          <button> Delete Task </button>
        </li>
      </ul>
    </div>
  );
}
