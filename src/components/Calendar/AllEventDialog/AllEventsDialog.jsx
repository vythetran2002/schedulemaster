import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WebinarCard from "../Card/WebinarCard/WebinarCard";
import ClientCard from "../Card/ClientCard/ClientCard";
import EmptyPlaceholder from "@/components/Placeholder/Empty";
import dayjs from "dayjs";
export default function AllEventsDialog(props) {
  const {
    open,
    handleChangeOpen,
    upComingEvents,
    onGoingEvents,
    pastEvents,
    calendarRef,
    updateHeaderDate,
    updateClientProfile,
    handleOpenClientProfile,
  } = props;

  const goToEvent = (date) => {
    const calApi = calendarRef.current?.getApi();
    if (calApi) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      calApi.gotoDate(formattedDate);
      updateHeaderDate(dayjs(date).format("YYYY/MM/DD"));
    }
  };

  return (
    <Dialog onOpenChange={handleChangeOpen} open={open}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="rounded-md p-6 w-3/4 max-w-4xl">
        <DialogHeader>
          <DialogTitle>{"All the events"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-dark-blue">
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {upComingEvents.length > 0 ? (
                    <>
                      {upComingEvents.map((event) => {
                        if (event?.client) {
                          return (
                            <React.Fragment key={event?.id}>
                              <ClientCard
                                event={event}
                                goToEvent={goToEvent}
                                handleOpenClientProfile={
                                  handleOpenClientProfile
                                }
                                updateClientProfile={updateClientProfile}
                              />
                            </React.Fragment>
                          );
                        } else {
                          return (
                            <React.Fragment key={event?.id}>
                              <WebinarCard
                                event={event}
                                goToEvent={goToEvent}
                              />
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

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-dark-orange">
                  Ongoing Events
                </h2>
                <div className="space-y-4">
                  {onGoingEvents.length > 0 ? (
                    <>
                      {onGoingEvents.map((event) => {
                        if (event?.client) {
                          return (
                            <React.Fragment key={event?.id}>
                              <ClientCard
                                event={event}
                                goToEvent={goToEvent}
                                handleOpenClientProfile={
                                  handleOpenClientProfile
                                }
                                updateClientProfile={updateClientProfile}
                              />
                            </React.Fragment>
                          );
                        } else {
                          return (
                            <React.Fragment key={event?.id}>
                              <WebinarCard
                                event={event}
                                goToEvent={goToEvent}
                              />
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

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-600">
                  Past Events
                </h2>
                <div className="space-y-4">
                  {pastEvents.length > 0 ? (
                    <>
                      {pastEvents.map((event) => {
                        if (event?.client) {
                          return (
                            <React.Fragment key={event?.id}>
                              <ClientCard
                                event={event}
                                goToEvent={goToEvent}
                                handleOpenClientProfile={
                                  handleOpenClientProfile
                                }
                                updateClientProfile={updateClientProfile}
                              />
                            </React.Fragment>
                          );
                        } else {
                          return (
                            <React.Fragment key={event?.id}>
                              <WebinarCard
                                event={event}
                                goToEvent={goToEvent}
                              />
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
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
