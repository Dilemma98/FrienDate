// import { useEffect, useRef, useState } from "react";
// import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { sv } from "date-fns/locale/sv";
// import "../style.css";
// import { ToolbarProps } from "react-big-calendar";

// const CustomToolbar: React.FC<ToolbarProps<CalendarEvent, object>> = ({
//   label,
//   onNavigate,
// }) => {
//   return (
//     <div
//       style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}
//     >
//       <div
//         style={{
//           fontSize: "1.5rem",
//           fontWeight: "bold",
//           marginBottom: "0.5rem",
//         }}
//       >
//         {label}
//       </div>
//       <div className="flex justify-center gap-6">
//         <button
//           onClick={() => onNavigate("PREV")}
//           className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
//         >
//           ⟵ Föregående
//         </button>
//         <button
//           onClick={() => onNavigate("TODAY")}
//           className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
//         >
//           Idag
//         </button>
//         <button
//           onClick={() => onNavigate("NEXT")}
//           className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200"
//         >
//           Nästa ⟶
//         </button>
//       </div>
//     </div>
//   );
// };

// const locales = {
//   sv: sv,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

// interface CalendarEvent {
//   title: string;
//   start: Date;
//   end: Date;
//   colorId?: string;
// }

// const colorMap: Record<string, string> = {
//   1: "#FFE3D1",
//   2: "#F0FFD1",
//   3: "#C4CFB0",
//   4: "#C2B0CF",
//   5: "#BA95A3",
//   6: "#D2D6FA",
//   7: "#CCDCDE",
//   8: "#C98BA3",
//   9: "#c7d2d3",
//   10: "#d1c5c5",
//   11: "#E8C0EB",
//   12: "#d0d8d9",
//   13: "#a8d1d5",
//   14: "#F2BF9D",
//   15: "#b9c4c7",
// };

// export default function Calendar() {
//   const [events, setEvents] = useState<CalendarEvent[]>([]);

//   // 📌 Reference to the calendar container
//   const calendarRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const getEvents = async () => {
//       const fetchedEvents = await fetchCalendarEvents();
//       setEvents(fetchedEvents);
//     };

//     //Looking for changes in the calendar every 30 seconds
//     const intervalId = setInterval(getEvents, 30000);

//     getEvents();

//     // 📌 Scroll to the calendar element on component mount
//     // This helps the presentation jump straight to the calendar without manual scroll
//     if (calendarRef.current) {
//       calendarRef.current.scrollIntoView({ behavior: "smooth" });
//     }

//     // Cleanup function to clear the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);

//   return renderCalendarUI(events, calendarRef);
// }

// // 🔹 Hämta events från Google Calendar API
// async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     console.warn("⚠️ Inget accessToken hittades i localStorage");
//     return [];
//   }

//   try {
//     const response = await fetch(
//       "http://localhost:5231/api/google/fetchCalendar",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       console.error("Felstatus:", response.status, await response.text());
//       throw new Error("Kunde inte hämta kalenderdata");
//     }

//     const calendarData = await response.json();

//     const items =
//       typeof calendarData.items === "string"
//         ? JSON.parse(calendarData.items)
//         : calendarData.items;

//     return items.map((event: any) => ({
//       title: event.summary || "Ingen titel",
//       start: new Date(event.start?.dateTime || event.start?.date),
//       end: new Date(event.end?.dateTime || event.end?.date),
//       colorId: event.colorId ? colorMap[event.colorId] : undefined,
//     }));
//   } catch (err) {
//     console.error("❌ Fel vid hämtning av kalenderdata:", err);
//     return [];
//   }
// }

// // 🔁 Render calendar UI with events and calendar ref
// function renderCalendarUI(events: CalendarEvent[],
//   calendarRef: React.RefObject<HTMLDivElement | null>) {
//   return (
//     // 📌 Attach the calendarRef to the container to enable scroll on mount
//     <div
//       ref={calendarRef}
//       className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4 h-[80vh]"
//     >
//       <BigCalendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         defaultView="month"
//         views={["month"]}
//         style={{
//           height: "100%",
//           fontSize: "14px",
//         }}
//         eventPropGetter={(event) => ({
//           className: "event-item",
//           style: {
//             backgroundColor: event.colorId || "#EBDCC0",
//             color: "black",
//             border: "none",
//             textAlign: "center",
//             position: "relative",
//             fontSize: "0.8em",
//             overflow: "hidden",
//             whiteSpace: "nowrap",
//             textOverflow: "ellipsis",
//             lineHeight: "1.2",
//             marginTop: "-0.2em",
//           },
//         })}
//         components={{
//           toolbar: CustomToolbar,
//           event: ({ event }) => (
//             <div>
//               <span>{event.title}</span>
//               <div className="rbc-event-time">
//                 {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
//               </div>
//             </div>
//           ),
//         }}
//         messages={{
//           allDay: "Heldag",
//           previous: "Föregående",
//           next: "Nästa",
//           today: "Idag",
//           month: "Månad",
//           week: "Vecka",
//           day: "Dag",
//           agenda: "Agenda",
//           date: "Datum",
//           time: "Tid",
//         }}
//         culture="sv"
//         formats={{
//           dateFormat: "dd",
//           dayFormat: "eeee",
//           weekdayFormat: "EEEE",
//           monthHeaderFormat: "MMMM yyyy",
//         }}
//       />
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
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
  1: "#FFE3D1",
  2: "#F0FFD1",
  3: "#C4CFB0",
  4: "#C2B0CF",
  5: "#BA95A3",
  6: "#D2D6FA",
  7: "#CCDCDE",
  8: "#C98BA3",
  9: "#c7d2d3",
  10: "#d1c5c5",
  11: "#E8C0EB",
  12: "#d0d8d9",
  13: "#a8d1d5",
  14: "#F2BF9D",
  15: "#b9c4c7",
};

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 📌 Reference to the calendar container
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    };

    //Looking for changes in the calendar every 30 seconds
    const intervalId = setInterval(getEvents, 30000);

    getEvents();

    // 📌 Scroll to the calendar element on component mount
    // This helps the presentation jump straight to the calendar without manual scroll
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return renderCalendarUI(events, calendarRef);
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
      console.error("Felstatus:", response.status, await response.text());
      throw new Error("Kunde inte hämta kalenderdata");
    }

    const calendarData = await response.json();

    const items =
      typeof calendarData.items === "string"
        ? JSON.parse(calendarData.items)
        : calendarData.items;

    return items.map((event: any) => ({
      title: event.summary || "Ingen titel",
      start: new Date(event.start?.dateTime || event.start?.date),
      end: new Date(event.end?.dateTime || event.end?.date),
      colorId: event.colorId ? colorMap[event.colorId] : undefined,
    }));
  } catch (err) {
    console.error("❌ Fel vid hämtning av kalenderdata:", err);
    return [];
  }
}

// 🔁 Render calendar UI with events and calendar ref
function renderCalendarUI(events: CalendarEvent[],
  calendarRef: React.RefObject<HTMLDivElement | null>) {
  return (
    // 📌 Attach the calendarRef to the container to enable scroll on mount
    <div
      ref={calendarRef}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4 h-[80vh]"
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        style={{
          height: "100%",
          fontSize: "14px",
        }}
        eventPropGetter={(event) => ({
          className: "event-item",
          style: {
            backgroundColor: event.colorId || "#EBDCC0",
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
