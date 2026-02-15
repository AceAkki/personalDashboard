import { useEffect, useState } from "react";

import usePomo from "./usePomo";
import "./pomodoro.css";

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
  let [tick, setTick] = useState(0);

  let [startPomodoro, getRemainingTime] = usePomo({
    timeObj: timeObj,
    setTimeObj: setTimeObj,
  });

  useEffect(() => {
    if (!isActive) return;
    if (timeObj.endTime === 0) {
      startPomodoro();
    }
    const timeInterval = setInterval(() => {
      const now = new Date().getTime();
      if (timeObj.endTime && now >= timeObj.endTime) {
        clearInterval(timeInterval);
        return;
      }
      setTick((prevTick) => prevTick + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isActive, timeObj.endTime]);

  let remainingMin = 25;
  let remainingSec = 0;

  if (timeObj.endTime !== 0) {
    const { remainingMinutes, remainingSeconds } =
      getRemainingTime() as unknown as {
        remainingMinutes: number;
        remainingSeconds: number;
      };
    remainingMin = remainingMinutes;
    remainingSec = remainingSeconds;
  }

  return (
    <div className="pomo-main-wrap">
      <div>
        <div className="circle">
          <div className="pomo-txt">
            <h1>{`${remainingMin}:${remainingSec.toString().padStart(2, "0")}`}</h1>
            <button
              onClick={() => {
                setIsActive((pre) => !pre);
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
      </div>
    </div>
  );
};

export default Pomo;
