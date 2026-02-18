import type { TaskActionData } from "./task-manager/taskTypes";
import type { WeatherData, AQIData } from "./weather/weatherType";
import type { linkObject, linkObjectSet } from "./linkStorage/linkTypes";
import type {
  TimeProps,
  ActiveProps,
  TickProps,
} from "./pomodoro/pomodoroTypes";

export interface DashboardContext extends TimeProps, ActiveProps, TickProps {
  tasks: TaskActionData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskActionData[]>>;
  notes: string[];
  setNotes: reactStringSet;
  weatherData: WeatherData;
  aqiData: AQIData;
  links: linkObject[];
  setLinks: linkObjectSet;
}

export type reactStringSet = React.Dispatch<React.SetStateAction<string[]>>;

export type stringSet = {
  setNotes: reactStringSet;
};

export type location = {
  latitude: number;
  longitude: number;
};

export interface userType {
  username: string;
  location: { latitude: number; longitude: number };
}
