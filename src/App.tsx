import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'

import './App.css'
import Dashboard from './features/dashboard'
import TaskManager, {action as taskManagerAction} from './features/task-manager/TaskManager'
import Pomodoro from './features/pomodoro/pomodoro'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Dashboard/>}>
          <Route path='taskmanager' element={<TaskManager/>} action={taskManagerAction} />
          <Route path='pomodoro' element={<Pomodoro />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
