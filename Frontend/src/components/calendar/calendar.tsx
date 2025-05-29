import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import fetchCalendarEvents from "./calendarService";
import renderCalendarUI from "./calendarUI";


interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  colorId?: string;
}


export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  
  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    };

    getEvents();
    
  }, []);

  return renderCalendarUI(events);
}

