// main react imports
import { type ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

// common imports
import { ToastContainer, Bounce } from "react-toastify";
import { Header } from "../components/Header";

// link
import QuickLinks from "../components/QuickLinks";

// css imports
import "./dashboard.css";

const Dashboard = (): ReactElement => {
  const { weatherData, aqiData } = useLoaderData();

  return (
    <>
      <Header title="tableroPersonel" />
      <main className="main-wrap scroll">
        <QuickLinks />
        <section className="dashboard-section scroll">
          <div className="main-outlet-wrap">
            <Outlet
              context={{
                weatherData,
                aqiData,
              }}
            />
          </div>
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
