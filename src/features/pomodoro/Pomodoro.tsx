import { useShallow } from "zustand/shallow";
import usePomodoroMain from "./hooks/usePomodoroMain";
import { usePomoStore } from "./hooks/pomoStore";
import "./pomodoro.css";

const Pomodoro = () => {
  // const { timeObj, setTimeObj, isActive, setIsActive, tick, setTick } =
  //   useOutletContext<DashboardContext>();
  // console.log(timeObj, isActive);

  const {
    endTime,
    pausedMin,
    pausedSec,
    setTimeObj,
    isActive,
    setIsActive,
    tick,
    setTick,
  } = usePomoStore(
    useShallow((state) => ({
      endTime: state.endTime,
      pausedMin: state.pausedMin,
      pausedSec: state.pausedSec,
      setTimeObj: state.updateTimeObj,
      isActive: state.isActive,
      setIsActive: state.updateIsActive,
      tick: state.tick,
      setTick: state.updateTick,
    })),
  );

  const { remainingMin, remainingSec, handleStartPause, handleReset } =
    usePomodoroMain({
      timeObj: { endTime: endTime, pausedMin: pausedMin, pausedSec: pausedSec },
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
