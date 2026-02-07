import type { TaskActionData } from "./task-manager/taskTypes";
import type { WeatherData } from "./weather/weatherType";

export type DashboardContext = {
  tasks: TaskActionData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskActionData[]>>;
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
  weatherData: WeatherData;
};
