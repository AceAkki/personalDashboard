import { useEffect, useState } from "react";

import usePomo from "./usePomo";

export interface TimeObj {
  endTime: number;
}

export interface PomoProps {
  timeObj: TimeObj;
  setTimeObj: React.Dispatch<React.SetStateAction<TimeObj>>;
}

const Pomo = () => {
  let [timeObj, setTimeObj] = useState({ endTime: 0 });
  let [isActive, setIsActive] = useState(false);
  let [runningTime, setRunningTime] = useState(0);
  let [startPomodoro, getRemainingTime] = usePomo({
    timeObj: timeObj,
    setTimeObj: setTimeObj,
  });
  let remainingMin = "25",
    remainingSec = "00";

  useEffect(() => {
    console.log(timeObj, isActive, runningTime);
    if (isActive && timeObj.endTime === 0) {
      startPomodoro();
    } else if (isActive && timeObj.endTime !== 0) {
      let { remainingMinutes, remainingSeconds } = getRemainingTime();
      remainingMin = remainingMinutes;
      remainingSec = remainingSeconds;
      setRunningTime(timeObj.endTime - new Date().getTime());
    }
    console.log(runningTime);
  }, [timeObj, runningTime]);

  return (
    <div className="pomo-main-wrap">
      <div>
        <h1>{`${remainingMin}:${remainingSec}`}</h1>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {!isActive ? "Start" : "Pause"}
        </button>
        <button
          onClick={() => {
            setTimeObj({ endTime: 0 });
            setIsActive(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomo;
