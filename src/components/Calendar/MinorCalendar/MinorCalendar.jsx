import React from "react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

function MinorCalendar(props) {
  const { calendarRef, updateHeaderDate } = props;

  const [date, setDate] = React.useState(dayjs().toDate());

  const handleChangeDate = (value) => {
    const calApi = calendarRef.current?.getApi();
    if (calApi) {
      const formattedDate = dayjs(value).format("YYYY-MM-DD");
      calApi.gotoDate(formattedDate);
      updateHeaderDate(dayjs(value).format("YYYY/MM/DD"));
      setDate(value);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleChangeDate}
        className="rounded-md border
        w-full h-full"
      />
    </div>
  );
}

export default MinorCalendar;
