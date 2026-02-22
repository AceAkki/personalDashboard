import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthLayout from "./features/auth/AuthLayout";
import Login, { action as loginAction } from "./features/auth/Login";
import { userKey } from "./features/auth/authStore";
import { requireAuth } from "./global/globalFunctions";

import Dashboard from "./features/Dashboard";
import BentoStructure from "./features/bento/BentoStructure";
import TaskManager, {
  action as taskManagerAction,
} from "./features/task-manager/TaskManager";

import Pomodoro from "./features/pomodoro/Pomodoro";
import Weather from "./features/weather/Weather";
import { getWeather, getAQI } from "./features/weather/hooks/getWeather";

import NewsFeed from "./features/news-feed/NewsFeed";
import useFetchNews from "./features/news-feed/hooks/useFetchNews";

import Notes from "./features/quicknotes/Notes";

import "./global/customProto";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route element={<AuthLayout />} loader={requireAuth}>
        <Route
          path="/"
          element={<Dashboard />}
          loader={async () => {
            let { state } = JSON.parse(localStorage.getItem(userKey) as string);
            const [weatherData, aqiData, newsData] = await Promise.all([
              getWeather({
                latitude: state.location.latitude,
                longitude: state.location.longitude,
              }),
              getAQI({
                latitude: state.location.latitude,
                longitude: state.location.longitude,
              }),
              useFetchNews(),
            ]).then((value) => value);

            return {
              weatherData,
              aqiData,
              newsData,
            };

            // return {
            //   weatherData: await getWeather(),
            //   aqiData: await getAQI(),
            //   newsData: await useFetchNews(),
            // };
          }}
          id="root"
        >
          <Route
            index
            element={<BentoStructure />}
            action={taskManagerAction}
          />
          <Route
            path="taskmanager"
            element={<TaskManager />}
            action={taskManagerAction}
          />
          <Route path="weather" element={<Weather />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="notes" element={<Notes />} />
          <Route path="newsfeed" element={<NewsFeed />} />
        </Route>
        ,
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
