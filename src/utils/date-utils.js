import dayjs from "dayjs";

export function FormatTimeRange(start, end) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  if (startDate.isSame(endDate, "day")) {
    return `${startDate.format("h A")} - ${endDate.format(
      "h A"
    )}, ${startDate.format("DD/MM/YYYY")}`;
  } else {
    return `${startDate.format("DD/MM/YYYY")} - ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }
}

export function CheckIsTodayEnabled(date, key) {
  const currentDate = dayjs();

  if (key === "month") {
    return currentDate.month() !== dayjs(date).month();
  }

  if (key === "week") {
    const startOfCurrentWeek = currentDate.startOf("week");
    const startOfGivenWeek = dayjs(date).startOf("week");
    return !startOfCurrentWeek.isSame(startOfGivenWeek);
  }

  if (key === "day") {
    return !currentDate.isSame(dayjs(date), "day");
  }

  return null;
}
