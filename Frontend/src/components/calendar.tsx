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
    <div
      style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}
    >
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
  1: "#FFE3D1", // Mjuk roströd
  2: "#F0FFD1", // Urtvättad ljusrosa
  3: "#C4CFB0", // Urtvättad grårosa
  4: "#C2B0CF", // Dämpad blågrå
  5: "#BA95A3", // Ljusgråblå
  6: "#D2D6FA", // Ljus turkosblå
  7: "#CCDCDE", // Ljus urtvättad rosé
  8: "#C98BA3", // Dämpad lavendelblå
  9: "#c7d2d3", // Faded blågrå
  10: "#d1c5c5", // Blekt grårosa
  11: "#E8C0EB", // Ljus blågrå
  12: "#d0d8d9", // Ljus gråturkos
  13: "#a8d1d5", // Ljus mintturkos
  14: "#F2BF9D", // Svag roströd
  15: "#b9c4c7", // Dämpad himmelsblå
};

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    };

    //Looking for changes in the calendar every 30 seconds
    const intervalId = setInterval(getEvents, 30000);

    getEvents();
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
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
        ? // If it's a string, parse it into an array
          JSON.parse(calendarData.items)
        : // If it's already an array, use it directly
          calendarData.items;

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

// Render calendar UI with events
function renderCalendarUI(events: CalendarEvent[]) {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4 h-[80vh]">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month" // Standardview is month
        views={["month"]}
        style={{
          height: "100%",
          fontSize: "14px",
        }}
        eventPropGetter={(event) => ({
          className: "event-item", // Add a class for custom styling
          style: {
            backgroundColor: event.colorId || "#EBDCC0", // Fallback color if no colorId
            color: "black",
            border: "none",
            textAlign: "center",
            position: "relative",
            fontSize: "0.8em",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            lineHeight: "1.2",
            marginTop: "-0.2em",
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
