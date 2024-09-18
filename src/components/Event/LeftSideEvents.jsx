import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import WebinarCard from "../Calendar/Card/WebinarCard/WebinarCard";
import ClientCard from "../Calendar/Card/ClientCard/ClientCard";
import EmptyPlaceholder from "../Placeholder/Empty";

function LeftSideEvents(props) {
  const {
    title,
    isUpComing,
    events,
    calendarRef,
    updateHeaderDate,
    handleOpenClientProfile,
    updateClientProfile,
    openAllEventDialog,
  } = props;

  const goToEvent = (date) => {
    const calApi = calendarRef.current?.getApi();
    if (calApi) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      calApi.gotoDate(formattedDate);
      updateHeaderDate(dayjs(date).format("YYYY/MM/DD"));
    }
  };

  const openAllEventsDialog = () => {
    openAllEventDialog(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow dark:bg-zinc-800">
      <div className="flex flex-col ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div
            className="px-3 py-1 bg-light-blue hover:bg-dark-blue duration-300
            dark:bg-gray-700
            dark:hover:bg-black
            text-white cursor-pointer rounded-2xl text-sm"
            onClick={openAllEventsDialog}
          >
            View All
          </div>
        </div>
        {isUpComing && (
          <h1 className="mb-4 font-medium text-[#71717a] dark:text-white">
            Today, {dayjs().format("MMM YYYY")}{" "}
          </h1>
        )}
      </div>

      <div className="space-y-4">
        {events.length > 0 ? (
          <>
            {events.map((event) => {
              if (event?.client) {
                return (
                  <React.Fragment key={event?.id}>
                    <ClientCard
                      event={event}
                      goToEvent={goToEvent}
                      handleOpenClientProfile={handleOpenClientProfile}
                      updateClientProfile={updateClientProfile}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={event?.id}>
                    <WebinarCard event={event} goToEvent={goToEvent} />
                  </React.Fragment>
                );
              }
            })}
          </>
        ) : (
          <>
            <EmptyPlaceholder />
          </>
        )}
      </div>
    </div>
  );
}

export default LeftSideEvents;
