import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { sv } from "date-fns/locale/sv";
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
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.warn("⚠️ Inget accessToken hittades i localStorage");
    return [];
  }

  try {
    const response = await fetch("http://localhost:5231/api/google/fetchCalendar",
      {
        // method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // skicka token i headern
        },
      });

    if (!response.ok) {
       console.error("Felstatus:", response.status, await response.text());
      throw new Error("Kunde inte hämta kalenderdata");
    }

    const calendarData = await response.json();
    const items = typeof calendarData.items === "string" ? JSON.parse(calendarData.items) : calendarData.items;
    
    console.log("📅 Kalenderdata:", JSON.stringify(items, null, 2));
    return items.map((event: any) => ({
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
