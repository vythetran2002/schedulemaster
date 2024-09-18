import Image from "next/image";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import Head from "next/head";
import Layout from "@/components/layout/Index";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarHeader from "@/components/Calendar/Header/CalendarHeader";
import AddEventDialog from "@/components/Calendar/AddEventDialog/AddEventDialog";
import DetailEventDialog from "@/components/Calendar/DetailEventDialog/DetailEventDialog";
import { GetAllEvents } from "@/models/Event";
import { GetUpcomingEvents } from "@/models/Event";
import { GetOngoingEvents } from "@/models/Event";
import { GetPastEvents } from "@/models/Event";
import ClientCard from "@/components/Calendar/Card/ClientCard/ClientCard";
import { UpdateEventById } from "@/models/Event";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import LeftSideEvents from "@/components/Event/LeftSideEvents";
import MinorCalendar from "@/components/Calendar/MinorCalendar/MinorCalendar";
import WebinarCard from "@/components/Calendar/Card/WebinarCard/WebinarCard";
import DetailClientDialog from "@/components/Calendar/DetailClientDialog/DetailClientDialog";
import AllEventsDialog from "@/components/Calendar/AllEventDialog/AllEventsDialog";

export default function Home() {
  const [dateView, setDateView] = useState("dayGridMonth");
  const [headerDate, setHeaderDate] = useState(() =>
    dayjs().format("YYYY/MM/DD")
  );
  const [isOpenAddEventDialog, setIsOpenAddEventDialog] = useState(false);
  const [isOpenDetailEventDialog, setIsOpenDetailEventDialog] = useState(false);
  const [isDetailedClientDialog, setIsDetailedClientDialog] = useState(false);
  const [isOpenAllEventsDialog, setIsOpenAllEventsDialog] = useState(false);
  const [clientProfile, setClientProfile] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [upComingEvents, setUpComingEvents] = useState([]);
  const [onGoingEvents, setOnGoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [reload, setReload] = useState(false);

  //refs
  const calendarRef = useRef();

  const handleChangeView = (option) => {
    const calendarApi = calendarRef?.current.getApi();
    if (calendarApi) {
      calendarApi.changeView(option);
    }
  };

  function handleDateSelect(selectInfo) {
    setIsOpenAddEventDialog(true);
    if (selectInfo) {
      setSelectedInfo(selectInfo);
    }
  }

  function handleEventClick(clickInfo) {
    setIsOpenDetailEventDialog(true);
    if (clickInfo) {
      setSelectedInfo(clickInfo);
    }
  }

  const handleEventDrop = (dragInfo) => {
    UpdateEventById(
      dragInfo?.event?.id,
      dragInfo?.event?.start,
      dragInfo?.event?.end
    );
    toast.success("Updated event successfully");
    setReload(!reload);
  };

  useEffect(() => {
    setEvents(GetAllEvents());
    setUpComingEvents(GetUpcomingEvents());
    setOnGoingEvents(GetOngoingEvents());
    setPastEvents(GetPastEvents());
  }, [isOpenAddEventDialog, isOpenDetailEventDialog, reload]);

  return (
    <>
      <Head>
        <title>Schelude Master</title>
      </Head>
      <Layout>
        <div className="container mx-auto p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-blue-50 dark:bg-zinc-800 p-4 rounded-lg shadow ">
                <MinorCalendar
                  calendarRef={calendarRef}
                  updateHeaderDate={setHeaderDate}
                />
              </div>
              <LeftSideEvents
                calendarRef={calendarRef}
                title={"Upcoming Events"}
                isUpComing={true}
                updateHeaderDate={setHeaderDate}
                events={upComingEvents}
                handleOpenClientProfile={setIsDetailedClientDialog}
                updateClientProfile={setClientProfile}
                openAllEventDialog={setIsOpenAllEventsDialog}
              />
              <LeftSideEvents
                calendarRef={calendarRef}
                title={"OnGoing Events"}
                isOnGoing={false}
                updateHeaderDate={setHeaderDate}
                events={onGoingEvents}
                handleOpenClientProfile={setIsDetailedClientDialog}
                updateClientProfile={setClientProfile}
                openAllEventDialog={setIsOpenAllEventsDialog}
              />
              <LeftSideEvents
                calendarRef={calendarRef}
                title={"Past Events"}
                updateHeaderDate={setHeaderDate}
                is={false}
                events={pastEvents}
                handleOpenClientProfile={setIsDetailedClientDialog}
                updateClientProfile={setClientProfile}
                openAllEventDialog={setIsOpenAllEventsDialog}
              />
            </div>

            <div className="md:col-span-2">
              <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow flex flex-col gap-5">
                <CalendarHeader
                  headerDate={headerDate}
                  updateHeaderDate={setHeaderDate}
                  calendarRef={calendarRef}
                  handleChangeView={handleChangeView}
                />
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={false}
                  customButtons={{
                    customButton: {
                      text: "Custom",
                      click: function () {
                        alert("Custom button clicked!");
                      },
                    },
                  }}
                  initialView={dateView}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  select={handleDateSelect}
                  events={events}
                  eventDrop={handleEventDrop} // Callback cho kéo và thả
                  eventClick={handleEventClick}
                />
              </div>
            </div>
          </div>
          <AddEventDialog
            selectedDate={selectedInfo}
            open={isOpenAddEventDialog}
            handleChangeOpen={setIsOpenAddEventDialog}
          />
          <DetailEventDialog
            calendarRef={calendarRef}
            updateHeaderDate={setHeaderDate}
            selectedDate={selectedInfo}
            open={isOpenDetailEventDialog}
            handleChangeOpen={setIsOpenDetailEventDialog}
          />
          <DetailClientDialog
            open={isDetailedClientDialog}
            handleChangeOpen={setIsDetailedClientDialog}
            profile={clientProfile}
          />
          <AllEventsDialog
            calendarRef={calendarRef}
            updateHeaderDate={setHeaderDate}
            open={isOpenAllEventsDialog}
            handleChangeOpen={setIsOpenAllEventsDialog}
            upComingEvents={upComingEvents}
            onGoingEvents={onGoingEvents}
            pastEvents={pastEvents}
            updateClientProfile={setClientProfile}
            handleOpenClientProfile={setIsDetailedClientDialog}
          />
        </div>
      </Layout>
    </>
  );
}
