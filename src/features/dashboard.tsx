import { useState, type ReactElement } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";

import type { TaskActionData } from "./task-manager/taskTypes";
import "./dashboard.css";

const Dashboard = (): ReactElement => {
  const [tasks, setTasks] = useState<TaskActionData[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const { weatherData, aqiData } = useLoaderData();
  return (
    <>
      <QuickLinks />
      <section className="dashboard-section">
        <Header title="Dashboard" />
        <Outlet
          context={{ tasks, setTasks, notes, setNotes, weatherData, aqiData }}
        />
      </section>
    </>
  );
};

export default Dashboard;
