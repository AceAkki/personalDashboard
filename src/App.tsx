import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./App.css";
import Dashboard from "./features/Dashboard";
import BentoStructure from "./features/bento/BentoStructure";
import TaskManager, {
  action as taskManagerAction,
} from "./features/task-manager/TaskManager";

import Pomodoro from "./features/pomodoro/Pomodoro";
import Weather from "./features/weather/Weather";
import { getWeather } from "./features/weather/getWeather";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<BentoStructure />} loader={getWeather} />
        <Route
          path="taskmanager"
          element={<TaskManager />}
          action={taskManagerAction}
        />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="weather" element={<Weather />} loader={getWeather} />
      </Route>
    </>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
