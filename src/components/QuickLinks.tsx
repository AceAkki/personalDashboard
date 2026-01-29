import type { ReactElement } from "react"
import "./QuickLinks.css"
import { Link } from "react-router-dom"

const QuickLinks = ():ReactElement => {
  return (
    <div className="quick-wrap">       
        <ul className="quick-links">
            <li><a href="#link1">Link 1</a></li>
            <li><a href="#link2">Link 2</a></li>
            <li>
                <Link to="/pomodoro">
                    Pomodoro
                </Link>
            </li>
        </ul>
    </div>
    )
}   

export default QuickLinks