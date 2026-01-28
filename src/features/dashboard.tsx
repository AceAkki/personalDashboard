
import { useState, type ReactElement } from "react"
import {Outlet} from "react-router-dom"
import { Header } from "../components/Header"
import QuickLinks from "../components/QuickLinks"

import "./dashboard.css"
import CurrentTasks from "./task-manager/components/CurrentTasks"

const Dashboard = (): ReactElement => {
   const [tasks, setTasks] = useState<string[]>([]);
  return (
    <>
      <QuickLinks />
      <section className="dashboard-section">
      <Header title="Dashboard" />
      <div>   
          <h1>Welcome to the Bento Grid Dashboard</h1>    
      </div>
      <div>
         <CurrentTasks taskData={tasks} />
      </div>

      <Outlet context={[tasks, setTasks]}/>

      </section>
      
    </>
    )   
}

export default Dashboard