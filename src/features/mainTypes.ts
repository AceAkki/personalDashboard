import type { TaskActionData } from "./task-manager/taskTypes";
import type { WeatherData, AQIData } from "./weather/weatherType";
import type { linkObject, linkObjectSet } from "./linkStorage/linkTypes";

export type DashboardContext = {
  tasks: TaskActionData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskActionData[]>>;
  notes: string[];
  setNotes: reactStringSet;
  weatherData: WeatherData;
  aqiData: AQIData;
  links: linkObject[];
  setLinks: linkObjectSet;
};

export type reactStringSet = React.Dispatch<React.SetStateAction<string[]>>;

export type stringSet = {
  setNotes: reactStringSet;
};
