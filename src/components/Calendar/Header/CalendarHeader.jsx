import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIsTodayEnabled } from "@/utils/date-utils";

function CalendarHeader(props) {
  const { calendarRef, handleChangeView, headerDate, updateHeaderDate } = props;

  const [mode, setMode] = useState("month");
  const [isDisabledTodayButton, setIsDisabledTodayButton] = useState(true);

  const handleDateChange = (direction) => {
    const calApi = calendarRef.current?.getApi();
    if (calApi) {
      if (direction === "prev") {
        calApi.prev();
      } else if (direction === "next") {
        calApi.next();
      } else {
        calApi.today();
      }
    }
    updateHeaderDate(dayjs(calApi.getDate()).format("YYYY/MM/DD"));
  };

  useEffect(() => {
    let checkMode = CheckIsTodayEnabled(headerDate, mode);
    setIsDisabledTodayButton(!checkMode);
  }, [headerDate, mode]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        {/* <button
          className="px-3 py-1 text-light-blue rounded-lg border-[1px] border-light-blue hover:text-dark-blue hover:border-dark-blue duration-200"
          onClick={() => handleDateChange("today")}
        >
          Today
        </button> */}

        <Button
          variant="outline"
          onClick={() => handleDateChange("today")}
          disabled={isDisabledTodayButton}
        >
          Today
        </Button>

        <button onClick={() => handleDateChange("prev")}>
          <ChevronLeft className="text-light-blue hover:text-dark-blue duration-200" />
        </button>
        <button onClick={() => handleDateChange("next")}>
          <ChevronRight className="text-light-blue hover:text-dark-blue duration-200" />
        </button>
        <h1 className="flex items-center text-xl font-extrabold text-dark-blue dark:text-white">
          {dayjs(headerDate).format("MMM YYYY")}
        </h1>
      </div>
      <div>
        <Select
          onValueChange={(value) => {
            handleChangeView(value);
            if (value === "dayGridMonth") {
              setMode("month");
            } else if (value === "timeGridWeek") {
              setMode("week");
            } else {
              setMode("day");
            }
          }}
        >
          <SelectTrigger className="flex gap-2 ">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dayGridMonth">Month</SelectItem>
            <SelectItem value="timeGridWeek">Week</SelectItem>
            <SelectItem value="timeGridDay">Day</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default CalendarHeader;
