import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

interface UserData {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

interface GoogleLoginButtonProps {
  setUserData: (user: UserData | null) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  setUserData,
}) => {
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const token = response.access_token;

        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userInfo: UserData = await res.json();

        setUserData(userInfo);
        localStorage.setItem("frienDateUser", JSON.stringify(userInfo));
        localStorage.setItem("accessToken", token);
        localStorage.setItem("isLoggedIn", "true");

        window.dispatchEvent(new Event("userLogin"));
        setIsLoggedIn(true);

        const calendarRes = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!calendarRes.ok) throw new Error("Kunde inte hämta kalenderdata");

        const calendarData = await calendarRes.json();
        console.log("📅 Kalenderhändelser:", calendarData);

        const events = calendarData.items.map((event: any) => ({
          summary: event.summary || "Ingen titel",
          start:
            event.start?.dateTime || event.start?.date || "Okänt startdatum",
          end: event.end?.dateTime || event.end?.date || "Okänt slutdatum",
        }));

        console.log("Mappade händelser:", events);

        setGoogleEvents(events);
        console.log("State för googleEvents:", events);
      } catch (err) {
        console.error("Error during login and fetch:", err);
      }
    },
    onError: (error) => console.log("Inloggning misslyckades", error),
    scope:
      "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });

  return (
    <div className="p-6">
      {!isLoggedIn ? (
        <button
          onClick={() => login()}
          className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060] flex items-center justify-center gap-3"
        >
          Logga in med Google
          <FcGoogle className="text-2xl bg-white rounded-full" />
        </button>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Välkommen!</h1>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Din Kalender:</h2>
            {googleEvents.length > 0 ? (
              <div className="mt-4">
                {googleEvents.map((event, index) => (
                  <div key={index} className="mb-4 border-b pb-2">
                    <h3 className="font-medium text-lg">{event.summary}</h3>
                    <p>
                      Start:{" "}
                      {event.start
                        ? new Date(event.start).toLocaleString()
                        : "Okänt startdatum"}
                    </p>
                    <p>
                      Slut:{" "}
                      {event.end
                        ? new Date(event.end).toLocaleString()
                        : "Okänt slutdatum"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Inga händelser tillgängliga för visning.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
