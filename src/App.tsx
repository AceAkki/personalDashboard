import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import AuthLayout from "./features/auth/AuthLayout";
import Login, { action as loginAction } from "./features/auth/Login";
import { requireAuth } from "./global/globalFunctions";

import Dashboard from "./features/Dashboard";
import BentoStructure from "./features/bento/BentoStructure";
import TaskManager, {
  action as taskManagerAction,
} from "./features/task-manager/TaskManager";

import PomoWrapper from "./features/pomodoro/PomoWrapper";
import Weather from "./features/weather/Weather";

import NewsFeed from "./features/news-feed/NewsFeed";

import Notes from "./features/quicknotes/Notes";

import ErrorPage from "./features/Error";
import FallBackLoader from "./components/ui/FallbackLoader";
import "./global/customProto";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route
        element={<AuthLayout />}
        loader={requireAuth}
        errorElement={<ErrorPage />}
        hydrateFallbackElement={<FallBackLoader />}
      >
        <Route
          path="/"
          element={<Dashboard />}
          // removed other file references but followig was using router loader
          // loader={async () => {
          //   let { state } = JSON.parse(localStorage.getItem(userKey) as string);
          //   const [weatherData, aqiData, newsData] = await Promise.all([
          //     getWeather({
          //       latitude: state.location.latitude,
          //       longitude: state.location.longitude,
          //     }),
          //     getAQI({
          //       latitude: state.location.latitude,
          //       longitude: state.location.longitude,
          //     }),
          //     fetchNews(),
          //   ]).then((value) => value);
          //
          //           //   return {
          //           //     weatherData,
          //           //     aqiData,
          //           //     newsData,
          //           //   };
          // }}
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
          <Route path="pomodoro" element={<PomoWrapper />} />
          <Route path="notes" element={<Notes />} />
          <Route path="newsfeed" element={<NewsFeed />} />
        </Route>
      </Route>
    </>,
  ),
);

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  );
}

export default App;
