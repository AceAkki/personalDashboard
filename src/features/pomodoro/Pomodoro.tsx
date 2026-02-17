import { useOutletContext } from "react-router-dom";
import usePomodoroMain from "./hooks/usePomodoroMain";
import type { DashboardContext } from "../mainTypes";
import "./pomodoro.css";

const Pomodoro = () => {
  const { timeObj, setTimeObj, isActive, setIsActive, tick, setTick } =
    useOutletContext<DashboardContext>();
  console.log(timeObj, isActive);

  const { remainingMin, remainingSec, handleStartPause, handleReset } =
    usePomodoroMain({
      timeObj: timeObj,
      setTimeObj: setTimeObj,
      isActive: isActive,
      setIsActive: setIsActive,
      tick: tick,
      setTick: setTick,
    });

  return (
    <div className="pomo-main-wrap">
      <div>
        <div className="circle">
          <div className="pomo-txt">
            <h1>{`${remainingMin}:${remainingSec.toString().padStart(2, "0")}`}</h1>
            <button onClick={() => handleStartPause()}>
              {!isActive ? "Start" : "Pause"}
            </button>
            <button onClick={() => handleReset()}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
