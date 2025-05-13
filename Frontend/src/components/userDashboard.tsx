import React from "react";
import Calendar from "./calendar"; // Om du vill använda Calendar-komponenten senare
import { UserData } from "../declarations/declarations.d"; // Importera UserData från declarations

export interface UserProps {
  userData: UserData | null; // Tillåt att userData kan vara null
}

const UserDashboard: React.FC<UserProps> = ({ userData }) => {
  if (!userData) {
    return <div>Du måste logga in för att se din dashboard.</div>;
  }
  console.log("User data in dashboard:", userData.givenName);

  return (
    <div className="text-center mb-20 mt-2">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-0">
            Välkommen {userData.givenName}!
          </h1>
          <img
            src={userData.picture}
            alt="Profilbild"
            className="rounded-full w-10 h-10"
          />
        </div>
        <div className="mt-4">
          {/* Lägg till här för att visa en kalender eller annan komponent */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
