import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TaskActionData } from "../taskTypes";

interface useTaskStore {
  tasks: TaskActionData[];
  deleteTask: (id: string) => void;
  updateTasks: (task: TaskActionData) => void;
  clearAllTasks: () => void;
  taskID: string | null;
  setTaskID: (id: string) => void;
}

const tasksKey = "tasks-storage";

export const useTaskStore = create<useTaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTasks: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      clearAllTasks: () => {
        set({ tasks: [] });
        localStorage.removeItem(tasksKey);
      },
      taskID: null,
      setTaskID: (id) => set({ taskID: id }),
    }),
    { name: tasksKey }, // localStorage key)
  ),
);
