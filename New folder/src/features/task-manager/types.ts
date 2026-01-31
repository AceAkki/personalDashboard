export interface TaskActionData {
  taskName: string;
  id: number;
  type: TasksTypes;
}

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

export interface TaskType extends ReactSet {
  taskTxt: TaskActionData;
}

export interface RefUse extends ReactSet, TaskType {
  refer: React.LegacyRef<HTMLDivElement>;
}
