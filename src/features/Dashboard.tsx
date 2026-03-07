// main react imports
import { type ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

// common imports
import { ToastContainer, Bounce } from "react-toastify";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";

// state imports
import { useUserStore } from "./auth/useAuthStore";
// css imports
import "./dashboard.css";

const Dashboard = (): ReactElement => {
  // retrieved data from the loader
  const { weatherData, aqiData } = useLoaderData();

  // getting the current background url from the store
  const currentBG = useUserStore((state) => state.backgroundURL);
  console.log(currentBG);

  let root = document.documentElement;
  // if currentBG exists then it sets the background image
  if (currentBG) {
    root.style.setProperty("--background-img", currentBG);
  }

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
