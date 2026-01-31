import { nanoid } from "nanoid";
import { type RefUse, type TaskType, type TasksTypes } from "../types";

interface MoveBtnsProps extends OptionsMain {
  typesArr: string[];
}

interface OptionsMain extends TaskType {
  currentType: string;
  targetType: string;
}

function optionToMove({
  taskSet,
  taskTxt,
  currentType,
  targetType,
}: OptionsMain) {
  taskSet((prevTasks) => {
    return prevTasks.map((task) => {
      return task.id === taskTxt.id
        ? {
            ...task,
            type: {
              ...task.type,
              [targetType]: true,
              [currentType]: false,
            },
          }
        : task;
    });
  });
}

function MoveBtns({ typesArr, taskSet, taskTxt, currentType }: MoveBtnsProps) {
  console.log(typesArr);
  return typesArr.map((targetType) => {
    return (
      <li key={nanoid()}>
        <button
          onClick={() =>
            optionToMove({ taskSet, taskTxt, currentType, targetType })
          }
        >
          Move to {targetType}
        </button>
      </li>
    );
  });
}

export default function OptionsPopup({ refer, taskSet, taskTxt }: RefUse) {
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

function getCurrentType(object: TasksTypes): string | any {
  for (let [key, value] of Object.entries(object)) {
    if (value === true) {
      return key;
    }
  }
}
