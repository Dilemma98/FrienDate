import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import fetchCalendarEvents from "./calendarService";
import renderCalendarUI from "./calendarUI";
import AddEvent from "./addEvent";


interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  colorId?: string;
}


export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // To add calendar event by clicking on day
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  
  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    };

    getEvents();
    
  }, []);

  // Function that triggers by a day being clicked
  const handleDayClick = (slotInfo: {start: Date}) => {
    setSelectedDate(slotInfo.start);
    setShowAddEvent(true);
  }

  return (
    <div>
      {renderCalendarUI(events, handleDayClick)}
      {showAddEvent && selectedDate && (
        <AddEvent
          onClose={() => setShowAddEvent(false)}
          defaultDate={selectedDate}
          />
      )}
    </div>
  );
}

