
import type { ReactElement } from "react"
import {Outlet} from "react-router-dom"
import { Header } from "../components/Header"
import QuickLinks from "../components/QuickLinks"

import "./dashboard.css"

const Dashboard = (): ReactElement => {
  return (
    <>
      <QuickLinks />
      <section className="dashboard-section">
      <Header title="Dashboard" />
      <div>   
          <h1>Welcome to the Bento Grid Dashboard</h1>    
      </div>
      <Outlet />

      </section>
      
    </>
    )   
}

export default Dashboard