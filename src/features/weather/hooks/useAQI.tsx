import type { objUSAQI, AQILevel } from "../weatherType";

export const USAQI = {
  good: [0, 50],
  moderate: [51, 100],
  sensitive: [101, 150],
  unhealthy: [101, 200],
  severe: [201, 300],
  hazardous: [301, 500],
};

export const getAQILevel = (aqiValue: number, object: objUSAQI): string => {
  return Object.keys(object).filter(
    (key) =>
      object[key as AQILevel][0] <= aqiValue &&
      object[key as AQILevel][1] >= aqiValue,
  )[0];
};
