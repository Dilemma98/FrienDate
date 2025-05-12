import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
 import {sv} from "date-fns/locale/sv";
const locales = {
    sv: sv,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
      console.log("🔍 useEffect körs!");
    const getEvents = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    };

    getEvents();
  }, []);

  return renderCalendarUI(events);
}

// 🔹 Hämta events från Google Calendar API
async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  console.log("🔍 Hämtar events...");
    const token = localStorage.getItem("accessToken");
if (!token) {
  console.warn("⚠️ Inget accessToken hittades i localStorage");
  return [];
}

  try {
    const calendarRes = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!calendarRes.ok) {
      throw new Error("Kunde inte hämta kalenderdata");
    }

    const calendarData = await calendarRes.json();

    return calendarData.items.map((event: any) => ({
      title: event.summary || "Ingen titel",
      start: new Date(event.start?.dateTime || event.start?.date),
      end: new Date(event.end?.dateTime || event.end?.date),
    }));
  } catch (err) {
    console.error("❌ Fel vid hämtning av kalenderdata:", err);
    return [];
  }
}

// 🔹 Renderar kalender-UI
function renderCalendarUI(events: CalendarEvent[]) {
  return (
    <div style={{ height: "600px" }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day", "agenda"]}
        style={{ height: 500 }}
      />
    </div>
  );
}
