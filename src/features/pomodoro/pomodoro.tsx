import { useEffect, useState } from "react";

const Pomodoro = () => {
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <>
      <div>
        <p>
          {Math.floor(timer / 60)}:{`0${timer % 60}`.slice(-2)}
        </p>
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setTimer(25 * 60);
            setIsActive(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Pomodoro;
