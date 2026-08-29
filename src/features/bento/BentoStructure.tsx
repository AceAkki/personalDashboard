import { useShallow } from "zustand/shallow";
import { motion } from "motion/react";

// components imports
import TasksMain from "../task-manager/components/TasksMain";
import TaskForm from "../task-manager/components/TaskForm";

import Pomodoro from "../pomodoro/Pomodoro";
import NotesForm from "../quicknotes/components/NotesForm";
import WeatherCard from "../weather/components/WeatherCard";
import LinkStorage from "../linkStorage/LinkStorage";

import useTaskMain from "../task-manager/hooks/useTaskMain";
import { useTaskStore } from "../task-manager/hooks/useTasksStore";
import useFetchNewsData from "../news-feed/hooks/useFetchNewsData";
import RenderNews from "../news-feed/components/RenderNews";
import FavLinks from "../favLinks/FavLinks";
import FallBackLoader from "../../components/ui/FallBackLoader";
import { useNoteStore } from "../quicknotes/hooks/useNoteStore";

// State
import { useUserStore } from "../auth/useAuthStore";
import { timeOfTheDayGreeting } from "../../global/globalFunctions";
import useFetchWeatherData from "../weather/hooks/useFetchWeatherData";

// css imports
import "./BentoStructure.css";

import type { AQIData, WeatherData } from "../weather/weatherType";
import type { NewsObject } from "../news-feed/newsTypes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5, // Delay all children animations by 0.3s
      staggerChildren: 0.2, // Stagger each child's animation by 0.15s
      opacity: { ease: "easeInOut" },
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0, scale: 0 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

const BentoStructure = () => {
  let { weatherData, aqiData, weatherQueryLoading, apiQueryLoading } =
    useFetchWeatherData();

  //const { weatherData, aqiData } = useOutletContext<DashboardContext>();
  const { loadingStatus, successData, newsArr } = useFetchNewsData();

  const { tasks, updateTasks } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      updateTasks: state.updateTasks,
    })),
  );
  const inputRef = useTaskMain(updateTasks);

  const username = useUserStore((state) => state.username);

  const updateNotes = useNoteStore((state) => state.updateNotes);

  // fallback loader is data is not ready or isLoading
  if (
    weatherQueryLoading ||
    apiQueryLoading ||
    !weatherData ||
    !aqiData ||
    loadingStatus ||
    successData === undefined ||
    newsArr === undefined
  )
    return (
      <section className="loader-section">
        <FallBackLoader />
      </section>
    );

  return (
    <>
      <div className="welcome-greet-wrap">
        <h1>
          {timeOfTheDayGreeting()} {username}!
        </h1>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bento-grid-layout"
      >
        <motion.div
          variants={itemVariants}
          className="grid-item span-row no-border-radius"
        >
          <div>
            <TaskForm inputRef={inputRef} />
          </div>
          <TasksMain taskData={tasks} Type="Priority" />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item">
          <WeatherCard
            current={weatherData?.current as WeatherData["current"]}
            current_units={
              weatherData?.current_units as WeatherData["current_units"]
            }
            aqiCurrent={aqiData?.current as AQIData["current"]}
            aqiCurrent_units={
              aqiData?.current_units as AQIData["current_units"]
            }
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item span-column">
          <FavLinks />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item">
          <TasksMain taskData={tasks} Type="Current" />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-item">
          <NotesForm setNotes={updateNotes} />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item span-row">
          <Pomodoro />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item span-column">
          <RenderNews newsArr={newsArr as NewsObject[]} />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-item">
          <LinkStorage />
        </motion.div>
      </motion.div>
    </>
  );
};

export default BentoStructure;
