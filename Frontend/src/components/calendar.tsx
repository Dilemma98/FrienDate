import { useEffect, useState } from "react";

declare global {
  interface Window {
    gapi: any;
  }
}

export function Calendar() {
  const [googleEvents, setGoogleEvents] = useState<{ [date: string]: string[] }>({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const CLIENT_ID = "655768995238-5m1d0d3arskq73qms4pl96ff6dlde0l9.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAZ00XILtPL7dHHMJHFQ6j0jhQwe7e_uYQ";

  const loadGoogleApi = () => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      });

      const authInstance = window.gapi.auth2.getAuthInstance();

      if (authInstance.isSignedIn.get()) {
        fetchGoogleEvents();
      } else {
        authInstance.signIn().then(fetchGoogleEvents);
      }
    });
  };

  const fetchGoogleEvents = () => {
    const start = new Date(new Date().getFullYear(), currentMonthIndex, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response: any) => {
        const events = response.result.items;
        const eventsByDate: { [date: string]: string[] } = {};

        events.forEach((event: any) => {
          const eventDate = event.start.date || event.start.dateTime?.slice(0, 10);
          if (!eventDate) return;
          if (!eventsByDate[eventDate]) {
            eventsByDate[eventDate] = [];
          }
          eventsByDate[eventDate].push(event.summary);
        });

        setGoogleEvents(eventsByDate);
      });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => loadGoogleApi();
    document.body.appendChild(script);
  }, []);

  // Refetch events if month changes
  useEffect(() => {
    if (window.gapi?.client?.calendar?.events) {
      fetchGoogleEvents();
    }
  }, [currentMonthIndex]);

  const handleMonthChange = (direction: "next" | "prev") => {
    setCurrentMonthIndex((prevIndex) => {
      const newIndex = direction === "next" ? prevIndex + 1 : prevIndex - 1;
      return (newIndex + 12) % 12;
    });
  };

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const renderCalendarDays = () => {
    const currentYear = new Date().getFullYear();
    const startOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const endOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);
  console.log("Google Events:", googleEvents);
    const daysInMonth = [];
    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      daysInMonth.push(new Date(d));
    }

    return (
      <div className="mt-2 grid grid-cols-7 gap-3 p-4 rounded-md shadow bg-[#c3c2d850] text-center">
        {/* Tomma rutor för att justera startdag */}
        {(() => {
          const offset = (startOfMonth.getDay() + 6) % 7;
          return Array.from({ length: offset }).map((_, i) => <div key={`empty-${i}`} />);
        })()}
        {/* Faktiska dagar */}
        {daysInMonth.map((date) => {
          const dateString = date.toISOString().slice(0, 10);
          const hasEvents = !!googleEvents[dateString];

          return (
            <div
              key={dateString}
              onClick={() => handleDateClick(dateString)}
              className={`relative p-2 cursor-pointer rounded-md border transition-all duration-200 ${
                selectedDate === dateString
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <div>{date.getDate()}</div>
              {hasEvents && (
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#5b616a]">Kalender</h1>
        <p className="text-gray-600 mt-2">Välj ett datum för din aktivitet</p>
      </header>

      <div className="lg:w-3/4">
        <div className="lg:w-[30vw] m-auto flex flex-row items-center justify-between mt-10 gap-4">
          <button
            onClick={() => handleMonthChange("prev")}
            className="bg-[#aba9c3] text-white py-2 px-4 rounded shadow hover:bg-[#5b616a] transition"
          >
            ←
          </button>

          <h2 className="text-lg font-bold text-center border-b w-full sm:w-auto">
            {new Date(new Date().setMonth(currentMonthIndex)).toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "long",
            })}
          </h2>

          <button
            onClick={() => handleMonthChange("next")}
            className="bg-[#aba9c3] text-white py-2 px-4 rounded shadow hover:bg-[#5b616a] transition"
          >
            →
          </button>
        </div>

        {renderCalendarDays()}
      </div>
    </div>
  );
}

export default Calendar;
