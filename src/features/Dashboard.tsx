import { useState, type ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";
import type { TaskActionData } from "./task-manager/taskTypes";
import type { NoteType } from "./quicknotes/notesTypes";
import type { linkObject } from "./linkStorage/linkTypes";
import "./dashboard.css";

const Dashboard = (): ReactElement => {
  const [tasks, setTasks] = useState<TaskActionData[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [links, setLinks] = useState<linkObject[]>([]);

  let [timeObj, setTimeObj] = useState({
    endTime: 0,
    pausedMin: 0,
    pausedSec: 0,
  });
  let [isActive, setIsActive] = useState(false);
  let [tick, setTick] = useState(0);
  const { weatherData, aqiData } = useLoaderData();

  return (
    <>
      <Header title="tableroPersonel" />
      <main className="main-wrap scroll">
        <QuickLinks />
        <section className="dashboard-section scroll">
          <Outlet
            context={{
              tasks,
              setTasks,
              notes,
              setNotes,
              weatherData,
              aqiData,
              links,
              setLinks,
              timeObj,
              setTimeObj,
              isActive,
              setIsActive,
              tick,
              setTick,
            }}
          />
        </section>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Dashboard;
