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

// Fetch events from Google Calendar API
async function fetchCalendarEvents(): Promise<any[]> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Ingen accessToken hittades i localStorage");
  }

  const response = await fetch(
    "http://localhost:5231/api/google/fetchCalendar",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Kunde inte hämta kalenderdata: " + errorText);
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
}

export default fetchCalendarEvents;

// Add new calendar event
export async function addCalendarEvent(
  accessToken: string,
  eventTitle: string,
  startDateTime: string,
  endDateTime: string
) {
  const response = await fetch("http://localhost:5231/api/google/addEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      summary: eventTitle,
      start: { dateTime: new Date(startDateTime).toISOString() },
      end: { dateTime: new Date(endDateTime).toISOString() },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}