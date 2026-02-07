import { nanoid } from "nanoid";

import type { MoveBtnsProps, OptionsMain, TasksTypes } from "../taskTypes";
export default function useOptions() {
  return {
    MoveBtns,
    getCurrentType,
  };
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
  return typesArr.map((targetType) => {
    return (
      <li key={nanoid()}>
        <button
          onClick={() =>
            optionToMove({ taskSet, taskTxt, currentType, targetType })
          }
        >
          {targetType}
        </button>
      </li>
    );
  });
}

function getCurrentType(object: TasksTypes): string | any {
  for (let [key, value] of Object.entries(object)) {
    if (value === true) {
      return key;
    }
  }
}
