export interface TaskActionData {
  taskName: string;
  id: string;
  type: TasksTypes;
}

export type OutletContextType = [
  TaskActionData[],
  React.Dispatch<React.SetStateAction<TaskActionData[]>>,
];

export interface TasksTypes {
  Current: boolean;
  Priority: boolean;
  Completed: boolean;
}

interface ReactSet {
  taskSet: React.Dispatch<React.SetStateAction<TaskActionData[]>>;
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
  refer: React.LegacyRef<HTMLDivElement>;
}

export interface MoveBtnsProps extends OptionsMain {
  typesArr: string[];
}

export interface OptionsMain extends TaskType {
  currentType: string;
  targetType: string;
}
