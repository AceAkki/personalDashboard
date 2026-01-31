import type { ReactElement } from "react"
import "./QuickLinks.css"

const QuickLinks = ():ReactElement => {
  return (
    <div className="quick-wrap">       
        <ul className="quick-links">
            <li><a href="#link1">Link 1</a></li>
            <li><a href="#link2">Link 2</a></li>
            <li><a href="#link3">Link 3</a></li>
        </ul>
    </div>
    )
}   

export default QuickLinks