import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TaskActionData } from "../taskTypes";

interface useTaskStore {
  tasks: TaskActionData[];
  deleteTask: (id: string) => void;
  moveTask: ({
    id,
    targetType,
    currentType,
  }: {
    id: string;
    targetType: string;
    currentType: string;
  }) => void;
  updateTasks: (task: TaskActionData) => void;
  clearAllTasks: () => void;
  taskID: string | null;
  setTaskID: (id: string | null) => void;
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
      moveTask: ({ id, targetType, currentType }) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  type: {
                    ...task.type,
                    [targetType]: true,
                    [currentType]: false,
                  },
                }
              : task,
          ),
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
