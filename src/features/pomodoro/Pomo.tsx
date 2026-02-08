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

  let [startPomodoro, getRemainingTime] = usePomo({
    timeObj: timeObj,
    setTimeObj: setTimeObj,
  });

  useEffect(() => {
    if (isActive && timeObj.endTime === 0) {
      startPomodoro();
    }
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
