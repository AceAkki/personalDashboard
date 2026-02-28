export interface TaskActionData {
  taskName: string;
  id: string;
  type: TasksTypes;
}

export type TaskIDMainType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
];

export interface TasksTypes {
  Current: boolean;
  Priority: boolean;
  Completed: boolean;
}

export type TaskActionDataSet = (task: TaskActionData) => void;

interface ReactSet {
  taskSet: (task: TaskActionData) => void;
}

export interface TasksProps extends ReactSet {
  taskData: TaskActionData[];
}

export interface TasksMainProps extends TasksProps {
  Type: string;
}

export interface TaskType extends ReactSet {
  taskTxt: TaskActionData;
}

export interface RefUse extends ReactSet, TaskType {
  refer: React.RefObject<HTMLDivElement | null>;
}

export interface optionPopupProps {
  refer: React.RefObject<HTMLDivElement | null>;
  taskObject: TaskActionData;
  moveTask: ({
    id,
    targetType,
    currentType,
  }: {
    id: string;
    targetType: string;
    currentType: string;
  }) => void;
  deleteTask: (id: string) => void;
}

export interface MoveBtnsProps {
  typesArr: string[];
  currentType: string;
  targetType: string;
  taskObject: TaskActionData;
  moveTask: ({
    id,
    targetType,
    currentType,
  }: {
    id: string;
    targetType: string;
    currentType: string;
  }) => void;
}

export interface OptionsMain extends TaskType {
  currentType: string;
  targetType: string;
}
