import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'

import './App.css'
import Dashboard from './features/dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Dashboard/>}>

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
