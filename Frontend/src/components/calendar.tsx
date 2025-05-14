import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { sv } from "date-fns/locale/sv";
import "../style.css";
import { ToolbarProps } from "react-big-calendar";

const CustomToolbar: React.FC<ToolbarProps<CalendarEvent, object>> = ({
  label,
  onNavigate,
}) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => onNavigate("PREV")}
          className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          ⟵ Föregående
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          Idag
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          Nästa ⟶
        </button>
      </div>
    </div>
  );
};
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
  colorId?: string;
}

const colorMap: Record<string, string> = {
  1: "#FF6F61", // Korallrosa
  2: "#6B5B95", // Lila-lavendel
  3: "#88B04B60", // Olivgrön
  4: "#F7CAC9", // Ljusrosa
  5: "#92A8D180", // Ljusblå
  6: "#F2B5D4", // Ljuslavendel
  7: "#F9AFAE", // Ljuskorall
  8: "#C9B9D2", // Grå-lila
  9: "#E0E0E2", // Mycket ljusgrå
  10: "#4E8E8E", // Mörk turkos
  11: "#F4E1D2", // Ljusbeige
  12: "#F28D35", // Ljusorange
  13: "#7C9D97", // Mörkblågrön
  14: "#B7C3C1", // Ljus grå-grön
  15: "#A5D8D9", // Mjuk turkosblå
  16: "#FFB6C1", // Ljusrosa
};

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

// 🔹 Hämta events från Google Calendar API
async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.warn("⚠️ Inget accessToken hittades i localStorage");
    return [];
  }

  try {
    const response = await fetch(
      "http://localhost:5231/api/google/fetchCalendar",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      // If the response status is not OK, log the error status and the error message
      console.error("Felstatus:", response.status, await response.text());
      // Throw an error to indicate that the data could not be fetched
      throw new Error("Kunde inte hämta kalenderdata");
    }

    // Parse the response body as JSON
    const calendarData = await response.json();

     // Check if the 'items' property is a string (some API responses might send a string instead of an array)
    const items =
      typeof calendarData.items === "string"
       // If it's a string, parse it into an array
        ? JSON.parse(calendarData.items)
        // If it's already an array, use it directly
        : calendarData.items;

    // Map the fetched data into a format suitable for our Calendar component
    return items.map((event: any) => ({
      // If no title is available, use a default message
      title: event.summary || "Ingen titel",
      // Parse the start date, considering both dateTime or date formats
      start: new Date(event.start?.dateTime || event.start?.date),
      // Parse the end date, considering both dateTime or date formats
      end: new Date(event.end?.dateTime || event.end?.date),
      // If a colorId exists, map it to a color from the colorMap
      colorId: event.colorId ? colorMap[event.colorId] : undefined,
    }));
  } catch (err) {
    // If an error occurs during the fetch or data processing, log the error
    console.error("❌ Fel vid hämtning av kalenderdata:", err);
    // Return an empty array if something goes wrong
    return [];
  }
}

// 🔹 Renderar kalender-UI
function renderCalendarUI(events: CalendarEvent[]) {
  return (
    <div
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4 h-[80vh]"
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month" // Standardvy är månad
        views={["month"]} // Vi behåller bara månadsvyn
        style={{
          height: "100%",
          fontSize: "14px",
        }}
        eventPropGetter={(event) => ({
          className: "event-item", // Lägg till CSS-klassen här om du vill ha specifik styling
          style: {
            backgroundColor: event.colorId || "#FFB3BA", // Standardfärg om inget colorId finns
            color: "black",
            border: "none",
            textAlign: "center",
            position: "relative",
            fontSize: "0.8em",
          },
        })}
        components={{
          toolbar: CustomToolbar,
          event: ({ event }) => (
            <div>
              <span>{event.title}</span>
              <div className="rbc-event-time">
                {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
              </div>
            </div>
          ),
        }}
        messages={{
          allDay: "Heldag",
          previous: "Föregående",
          next: "Nästa",
          today: "Idag",
          month: "Månad",
          week: "Vecka",
          day: "Dag",
          agenda: "Agenda",
          date: "Datum",
          time: "Tid",
        }}
        culture="sv"
        formats={{
          dateFormat: "dd",
          dayFormat: "eeee",
          weekdayFormat: "EEEE",
          monthHeaderFormat: "MMMM yyyy",
        }}
      />
    </div>
  );
}
