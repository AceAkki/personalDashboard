import { useState, type ReactElement } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";

import type { TaskActionData } from "./task-manager/taskTypes";
import "./dashboard.css";

const Dashboard = (): ReactElement => {
  const [tasks, setTasks] = useState<TaskActionData[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const { weatherData } = useLoaderData();
  return (
    <>
      <QuickLinks />
      <section className="dashboard-section">
        <Header title="Dashboard" />
        <Outlet context={{ tasks, setTasks, notes, setNotes, weatherData }} />
      </section>
    </>
  );
};

export default Dashboard;
