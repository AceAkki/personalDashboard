import { useState, type ReactElement } from "react";
import { Link, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";

import "./dashboard.css";

const Dashboard = (): ReactElement => {
  const [tasks, setTasks] = useState<string[]>([]);
  return (
    <>
      <QuickLinks />
      <section className="dashboard-section">
        <Header title="Dashboard" />

        <Outlet context={[tasks, setTasks]} />
      </section>
    </>
  );
};

export default Dashboard;
