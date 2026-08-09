import { useOutletContext } from "react-router-dom";
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
import useRouteNewsData from "../news-feed/hooks/useRouteNewsData";
import RenderNews from "../news-feed/components/RenderNews";
import FavLinks from "../favLinks/FavLinks";

import { useNoteStore } from "../quicknotes/hooks/useNoteStore";

// State
import { useUserStore } from "../auth/useAuthStore";
import { timeOfTheDayGreeting } from "../../global/globalFunctions";

// type imports
import type { DashboardContext } from "../mainTypes";

// css imports
import "./BentoStructure.css";

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
  const { weatherData, aqiData } = useOutletContext<DashboardContext>();
  const { newsArr } = useRouteNewsData();

  const { tasks, updateTasks } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      updateTasks: state.updateTasks,
    })),
  );
  const inputRef = useTaskMain(updateTasks);

  const username = useUserStore((state) => state.username);

  const updateNotes = useNoteStore((state) => state.updateNotes);

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
        <motion.div variants={itemVariants} className="grid-item span-row">
          <div>
            <TaskForm inputRef={inputRef} />
          </div>
          <TasksMain taskData={tasks} Type="Priority" />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item">
          <WeatherCard
            current={weatherData.current}
            current_units={weatherData.current_units}
            aqiCurrent={aqiData.current}
            aqiCurrent_units={aqiData.current_units}
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

        <motion.div variants={itemVariants} className="grid-item">
          <Pomodoro />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-item span-column">
          <RenderNews newsArr={newsArr} />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-item">
          <LinkStorage />
        </motion.div>
      </motion.div>
    </>
  );
};

export default BentoStructure;
