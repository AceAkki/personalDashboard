import { RefUse, TaskType, TasksTypes } from "../types";

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

function MoveBtns(
  typesArr: string[],
  optionsMain: OptionsMain
): React.ReactElement[] {
  let { taskSet, taskTxt, currentType } = optionsMain;
  return typesArr.map((targetType) => {
    return (
      <li key={taskTxt.id}>
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
  let newArr = typesArr.filter((type) => type !== currentType);
  return (
    <div className={`options-wrap hide`} ref={refer}>
      <ul>
        <MoveBtns typesArr={newArr} />
        <li>
          <button> Move to Completed </button>
        </li>
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
