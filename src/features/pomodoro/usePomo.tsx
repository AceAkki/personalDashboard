import type { PomoProps } from "./Pomo";
const usePomo = ({ timeObj, setTimeObj }: PomoProps) => {
  function startPomodoro() {
    const endTime = new Date().getTime() + 25 * 60 * 1000;
    setTimeObj({
      endTime: endTime,
    });
  }

  function getRemainingTime(): {
    remainingMinutes: number;
    remainingSeconds: number;
  } {
    const milliDiff = timeObj.endTime - new Date().getTime();
    // Total number of seconds in the difference
    const totalSeconds = Math.floor(milliDiff / 1000);
    // Total number of minutes in the difference
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    return {
      remainingMinutes,
      remainingSeconds,
    };
  }

  return [startPomodoro, getRemainingTime];
};
export default usePomo;
