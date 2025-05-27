import { useEffect, useRef, useState } from "react";
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

  // 📌 Reference to the calendar container
  const calendarRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    };

    getEvents();

    // 📌 Scroll to the calendar element on component mount
    // This helps the presentation jump straight to the calendar without manual scroll
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
  }, []);

  return renderCalendarUI(events, calendarRef);
}

