import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video } from "lucide-react";
import { FormatTimeRange } from "@/utils/date-utils";

function ClientCard(props) {
  const {
    event,
    isDetailed,
    goToEvent,
    handleOpenClientProfile,
    updateClientProfile,
  } = props;

  const handleGoToEvent = () => {
    goToEvent(event?.start);
  };

  return (
    <div
      className="flex justify-between bg-blue-100 p-3 rounded-lg border-l-[10px] border-[#fb923c]
      cursor-pointer hover:shadow-md duration-300
      "
      onClick={handleGoToEvent}
      style={{ background: event?.backgroundColor, color: event?.textColor }}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">{event?.title}</span>
        </div>
        <div
          className="text-xs text-gray-500"
          style={{ color: event?.textColor }}
        >
          {FormatTimeRange(event?.start, event?.end)}
        </div>
        {!isDetailed && (
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="w-[35px] h-[35px] border-[3px] border-[balck] ">
              <AvatarImage src={event?.client?.avatar} />
              <AvatarFallback>{event?.client?.name}</AvatarFallback>
            </Avatar>

            <span
              className="text-xs hover:underline cursor-pointer duration-300"
              onClick={() => {
                handleOpenClientProfile(true);
                updateClientProfile(event?.client);
              }}
            >
              View Client Profile
            </span>
          </div>
        )}
      </div>
      <div className="p-3 hover:bg-light-orange h-fit rounded-full cursor-pointer duration-300  ">
        <Video />
      </div>
    </div>
  );
}

export default ClientCard;
