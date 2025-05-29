import React from "react";
import { useUser } from "../context/userContext";
import UserMenu from "./userMenu";

const UserProfile: React.FC = () => {
  const { userData } = useUser();

  if (!userData) {
    return (
      <div className="text-center mt-0 text-lg text-red-600">
        Du måste vara inloggad för att se din profil.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Meny med välkomstkort */}
        <UserMenu />

        {/* Profilinfo */}
        <div className="flex-1 bg-white shadow-lg rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profilbild */}
            <img
              src={userData.picture}
              alt="Profilbild"
              className="rounded-full w-24 h-24 shadow-md object-cover ring-2 ring-[#bd7d8d]"
            />

            {/* Användardata */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#562f39] mb-2">
                Användarprofil 👤
              </h1>
              <div className="space-y-2 text-md text-gray-700">
                <p>
                  <span className="font-semibold text-[#562f39]">Förnamn:</span>{" "}
                  {userData.givenName}
                </p>
                <p>
                  <span className="font-semibold text-[#562f39]">Efternamn:</span>{" "}
                  {userData.familyName}
                </p>
                <p>
                  <span className="font-semibold text-[#562f39]">E-post:</span>{" "}
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
