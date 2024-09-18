import Cookies from "js-cookie";
import dayjs from "dayjs";

export function AddEventIntoCookie(event) {
  const cookieName = event.client ? "specialEvent" : "event";
  let events = Cookies.get(cookieName);
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  events.push(event);
  Cookies.set(cookieName, JSON.stringify(events));
}

export function GetAllEvents() {
  const events = Cookies.get("event");
  const specialEvents = Cookies.get("specialEvent");
  const eventArray = events ? JSON.parse(events) : [];
  const specialEventArray = specialEvents ? JSON.parse(specialEvents) : [];
  return eventArray.concat(specialEventArray);
}

export function GetEventById(ID) {
  const allEvents = GetAllEvents();
  return allEvents.find((event) => event.id === ID) || null;
}

export function DeleteEventById(ID) {
  const allEvents = GetAllEvents();

  const updatedEvents = allEvents.filter((event) => event.id !== ID);

  Cookies.set(
    "event",
    JSON.stringify(updatedEvents.filter((event) => !event.special))
  );
  Cookies.set(
    "specialEvent",
    JSON.stringify(updatedEvents.filter((event) => event.special))
  );

  return updatedEvents;
}

export function UpdateEventById(id, start, end) {
  const allEvents = GetAllEvents();

  const eventToUpdate = allEvents.find((event) => event.id === id);

  if (eventToUpdate) {
    eventToUpdate.start = start;
    eventToUpdate.end = end;

    const updatedEvents = allEvents.map((event) =>
      event.id === id ? eventToUpdate : event
    );

    Cookies.set(
      "event",
      JSON.stringify(updatedEvents.filter((event) => !event.special))
    );
    Cookies.set(
      "specialEvent",
      JSON.stringify(updatedEvents.filter((event) => event.special))
    );

    return eventToUpdate;
  }

  return null;
}

export function GetUpcomingEvents() {
  const allEvents = GetAllEvents();
  const now = dayjs();
  return allEvents.filter((event) => {
    const eventStart = dayjs(event.start);
    return eventStart.isAfter(now);
  });
}

export function GetOngoingEvents() {
  const allEvents = GetAllEvents();
  const now = dayjs();

  return allEvents.filter((event) => {
    const eventStart = dayjs(event.start);
    const eventEnd = dayjs(event.end);
    return eventStart.isBefore(now) && eventEnd.isAfter(now);
  });
}

export function GetPastEvents() {
  const allEvents = GetAllEvents();
  const now = dayjs();

  return allEvents.filter((event) => {
    const eventEnd = dayjs(event.end);
    return eventEnd.isBefore(now);
  });
}
