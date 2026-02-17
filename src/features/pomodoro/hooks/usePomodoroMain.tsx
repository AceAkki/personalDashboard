import { useEffect } from "react";
import usePomoHelper from "../hooks/usePomoHelper";
import type { PomodoroMainProps } from "../pomodoroTypes";

const usePomodoroMain = ({
  timeObj,
  setTimeObj,
  isActive,
  setIsActive,
  tick,
  setTick,
}: PomodoroMainProps) => {
  const [startPomodoro, getRemainingTime] = usePomoHelper({
    timeObj: timeObj,
    setTimeObj: setTimeObj,
  });

  let remainingMin = 25;
  let remainingSec = 0;
  if (timeObj.endTime !== 0 && timeObj.endTime > Date.now()) {
    const { remainingMinutes, remainingSeconds } =
      getRemainingTime() as unknown as {
        remainingMinutes: number;
        remainingSeconds: number;
      };
    remainingMin = remainingMinutes;
    remainingSec = remainingSeconds;
  }

  // resets on complete
  if (timeObj.endTime !== 0 && timeObj.endTime < Date.now()) {
    setTimeObj({ endTime: 0 });
    setIsActive(false);
  }

  useEffect(() => {
    if (!isActive) return;
    if (timeObj.endTime === 0) {
      startPomodoro(0.2);
    }
    const timeInterval = setInterval(() => {
      const now = Date.now();
      if (timeObj.endTime && now >= timeObj.endTime) {
        clearInterval(timeInterval);
        setIsActive(false);
        return;
      } else {
        setTick((prevTick) => prevTick + 1);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isActive, timeObj.endTime, tick]);

  const handleStartPause = () => {
    if (isActive) {
      startPomodoro(parseFloat(`${remainingMin + remainingSec / 60}`));
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setTimeObj({ endTime: 0 });
    setIsActive(false);
  };

  return {
    startPomodoro,
    remainingMin,
    remainingSec,
    handleStartPause,
    handleReset,
  } as const;
};

export default usePomodoroMain;
