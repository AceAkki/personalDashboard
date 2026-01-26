
import { Header } from "../components/Header"
import QuickLinks from "../components/QuickLinks"

import "./dashboard.css"

const Dashboard = () => {
  return (
    <>
      <QuickLinks />
      <section className="dashboard-section">
      <Header title="Dashboard" />
      <div>   
          <h1>Welcome to the Bento Grid Dashboard</h1>    
      </div>

      </section>
      
    </>
    )   
}

export default Dashboard