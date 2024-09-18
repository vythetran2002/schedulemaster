import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientCard from "../Card/ClientCard/ClientCard";
import WebinarCard from "../Card/WebinarCard/WebinarCard";
import ClientProfileCard from "../Card/ClientProfileCard/ClientProfileCard";
import { GetEventById } from "@/models/Event";
import { Button } from "@/components/ui/button";
import { DeleteEventById } from "@/models/Event";
import toast from "react-hot-toast";
import dayjs from "dayjs";

function DetailEventDialog(props) {
  const {
    selectedDate,
    open,
    handleChangeOpen,
    calendarRef,
    updateHeaderDate,
  } = props;

  const [date, setDate] = useState(GetEventById(selectedDate?.event?.id));

  const handleDeleteEvent = () => {
    selectedDate?.event?.remove();
    DeleteEventById(date?.id);
    toast.success("Deleted event sucessfully");
    handleChangeOpen(false);
  };

  const goToEvent = (date) => {
    const calApi = calendarRef.current?.getApi();
    if (calApi) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      calApi.gotoDate(formattedDate);
      updateHeaderDate(dayjs(date).format("YYYY/MM/DD"));
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setDate(GetEventById(selectedDate?.event?.id));
    }
  }, [selectedDate]);

  return (
    <Dialog open={open} onOpenChange={handleChangeOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event Information</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {date?.client ? (
          <>
            <ClientCard event={date} isDetailed={true} goToEvent={goToEvent} />
            <ClientProfileCard profile={date?.client} />
          </>
        ) : (
          <WebinarCard event={date} goToEvent={goToEvent} />
        )}
        <Button
          className="mt-2"
          variant="destructive"
          onClick={handleDeleteEvent}
        >
          Delete Event
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default DetailEventDialog;
