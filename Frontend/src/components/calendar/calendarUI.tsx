import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { sv } from "date-fns/locale/sv";
import CustomToolbar from "./customToolBar";
import ActivitySuggestionsButton from "../activitySuggestions/buttonActivitySuggestions";

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
// Render calendar UI with events
function renderCalendarUI(events: any[], onDayClick: (slotInfo: {start:Date}) => void) {
  return (
    <div
      className="mx-auto rounded-lg h-[105vh]"
    >
      <div className="flex gap-4 mb-4 justify-end">
        <ActivitySuggestionsButton />
      </div>
      <BigCalendar
        localizer={localizer}
        events={events}
        showAllEvents
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={onDayClick}
        defaultView="month"
        views={["month"]}
        style={{
          height: "43em",
          fontSize: "14px",
          marginTop: "-30px"
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