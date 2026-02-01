import type { RefUse } from "../types";

import useOptions from "../hooks/useOptions";

export default function OptionsPopup({ refer, taskSet, taskTxt }: RefUse) {
  const { MoveBtns, getCurrentType } = useOptions();
  let typesArr = ["Current", "Priority", "Completed"];
  let currentType = getCurrentType(taskTxt.type);
  let newArr = Array.from(
    new Set(typesArr.filter((type) => type !== currentType)),
  );
  return (
    <div className={`options-wrap hide`} ref={refer}>
      <ul>
        <MoveBtns
          typesArr={newArr}
          taskSet={taskSet}
          taskTxt={taskTxt}
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
