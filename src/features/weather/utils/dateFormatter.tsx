const useDateFormatter = (timeHour: string[]) => {
  let currentTime = makeDate(new Date(), true);

  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);

  let nextDateTime = makeDate(nextDate, false);
  let filteredTimeArr = timeHour.filter(
    (hour) => hour > currentTime && hour < nextDateTime,
  );
  console.log(filteredTimeArr, currentTime);
  let startIndex =
    timeHour.findIndex((hour) => hour === filteredTimeArr[0]) - 1;

  function makeDate(date: Date, next: boolean) {
    let time = next
      ? date
          .toLocaleDateString(undefined, { hour12: false, hour: "2-digit" })
          .split(",")[1]
          .trim()
      : "00";
    // let time = next
    //   ? date
    //       .toLocaleDateString(undefined, { hour: "2-digit" })
    //       .split(/\d+\/\d+\/\d+,\s(\d+)\s\w+/g)
    //       .join("")
    //   : "00";
    return `${date.getFullYear()}-${date.toLocaleDateString(undefined, {
      month: "2-digit",
    })}-${date.toLocaleDateString(undefined, {
      day: "2-digit",
    })}T${time}:00`;
  }

  return {
    hourArray: filteredTimeArr,
    startIndex: startIndex,
  };
};

export default useDateFormatter;
