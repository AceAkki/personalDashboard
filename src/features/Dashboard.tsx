import { useState, type ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";
import type { TaskActionData } from "./task-manager/taskTypes";
import type { linkObject } from "./linkStorage/linkTypes";
import "./dashboard.css";

const Dashboard = (): ReactElement => {
  const [tasks, setTasks] = useState<TaskActionData[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [links, setLinks] = useState<linkObject[]>([]);
  const { weatherData, aqiData } = useLoaderData();

  return (
    <>
      <QuickLinks />
      <section className="dashboard-section scroll">
        <Header title="Dashboard" />
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
          }}
        />
      </section>
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
