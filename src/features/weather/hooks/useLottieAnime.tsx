import { useLottie } from "lottie-react";

import sunny from "../lottieAnime/Weather-sunny.json";
// import night from "../lottieAnime/Weather-night.json";

import foggy from "../lottieAnime/Foggy.json";
import mist from "../lottieAnime/Weather-mist.json";
import partlyCloudy from "../lottieAnime/Weather-partly-cloudy.json";
import partlyShower from "../lottieAnime/Weather-partly-shower.json";
import snow from "../lottieAnime/Weather-snow.json";
import storm from "../lottieAnime/Weather-storm.json";
import thunder from "../lottieAnime/Weather-thunder.json";
// import windy from "../lottieAnime/Weather-windy.json";

const weatherRef = [
  {
    ids: [0, 1],
    file: sunny,
  },
  {
    ids: [2, 3],
    file: partlyCloudy,
  },
  {
    ids: [45, 48],
    file: foggy,
  },
  {
    ids: [51, 53, 55],
    file: mist,
  },
  {
    ids: [61, 63, 65],
    file: partlyShower,
  },
  {
    ids: [80, 81, 82],
    file: storm,
  },
  {
    ids: [95, 96, 99],
    file: thunder,
  },
  {
    ids: [56, 57, 66, 67, 71, 73, 75, 77, 85, 86],
    file: snow,
  },
];

// const timeofDay = [{ 0: night }, { 1: sunny }];

type codeProps = {
  code: number;
};
// type isDayProps = {
//   isDay: number;
// };

const RenderAnime = ({ code }: codeProps) => {
  let weatherAnime = weatherRef.filter((obj) => obj.ids.includes(code))[0].file;
  //   : timeofDay[props.isDay];
  const options = {
    animationData: weatherAnime,
    loop: true,
    autoplay: true,
  };
  const style = {
    width: "100%",
    height: "100%",
  };
  const { View } = useLottie(options, style);
  return View;
};

export default RenderAnime;
