export interface TimeObj {
  endTime: number;
}

export interface TimeProps {
  timeObj: TimeObj;
  setTimeObj: React.Dispatch<React.SetStateAction<TimeObj>>;
}

export interface ActiveProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TickProps {
  tick: number;
  setTick: React.Dispatch<React.SetStateAction<number>>;
}

export type PomodoroMainProps = TimeProps & ActiveProps & TickProps;
