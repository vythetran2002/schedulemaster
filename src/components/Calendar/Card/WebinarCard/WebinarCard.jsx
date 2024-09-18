import React from "react";
import { FormatTimeRange } from "@/utils/date-utils";
function WebinarCard(props) {
  const { event, goToEvent } = props;

  const handleGoToEvent = () => {
    goToEvent(event?.start);
  };

  return (
    <div
      className="bg-orange-100 p-3 rounded-lg border-l-[10px] border-[#fb923c]
      cursor-pointer hover:shadow-md duration-300
      "
      onClick={handleGoToEvent}
      style={{ background: event?.backgroundColor, color: event?.textColor }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium">{event?.title}</span>
      </div>
      <div
        className="text-xs text-gray-500"
        style={{ color: event?.textColor }}
      >
        {FormatTimeRange(event?.start, event?.end)}
      </div>
    </div>
  );
}

export default WebinarCard;
