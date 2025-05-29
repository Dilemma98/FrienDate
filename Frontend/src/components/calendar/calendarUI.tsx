import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { sv } from "date-fns/locale/sv";
import CustomToolbar from "./customToolBar";
import AddEventButton from "./buttonAddEvent";

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
// 🔁 Render calendar UI with events and calendar ref
function renderCalendarUI(events: any[]) {
  return (
    // 📌 Attach the calendarRef to the container to enable scroll on mount
    <div
      className="mx-auto bg-white rounded-lg h-[105vh]"
    >
      <AddEventButton />
      <BigCalendar
        localizer={localizer}
        events={events}
        showAllEvents
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        style={{
          height: "43em",
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
            fontSize: "1em",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            lineHeight: "1.2",
            marginTop: "-0.1em",
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
export default renderCalendarUI;