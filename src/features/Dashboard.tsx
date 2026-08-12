// main react imports
import { type ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useRef } from "react";
// common imports
import { ToastContainer, Bounce } from "react-toastify";
import { Header } from "../components/Header";
import QuickLinks from "../components/QuickLinks";
import OptionsPopup from "./task-manager/components/OptionsPopup";
import EditTaskForm from "./task-manager/components/EditTaskForm";
import EditNoteForm from "./quicknotes/components/EditNoteForm";
// state imports
import { useUserStore } from "./auth/useAuthStore";
import { useTaskStore } from "./task-manager/hooks/useTasksStore";
import { useNoteStore } from "./quicknotes/hooks/useNoteStore";
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

  const { tasks, taskID, isTaskEditMode } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      taskID: state.taskID,
      isTaskEditMode: state.isEditMode,
    })),
  );
  const { notes, noteID, isNoteEditMode } = useNoteStore(
    useShallow((state) => ({
      notes: state.notes,
      noteID: state.noteID,
      isNoteEditMode: state.isEditMode,
    })),
  );
  const optionRef = useRef<HTMLDivElement>(null);
  const taskTxt = tasks.find((task) => task?.id === taskID);
  const noteTxt = notes.find((note) => note?.id === noteID);
  console.log(noteTxt, noteID === noteTxt?.id, isNoteEditMode);
  return (
    <>
      <Header title="FocusDeck" />
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
        {taskID === taskTxt?.id && (
          <OptionsPopup refer={optionRef} taskObject={taskTxt} />
        )}
        {taskID === taskTxt?.id && isTaskEditMode && (
          <EditTaskForm taskObject={taskTxt} />
        )}
        {noteID === noteTxt?.id && isNoteEditMode && (
          <EditNoteForm noteObject={noteTxt} />
        )}
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
