import React from "react";
import { UserData } from "../declarations/declarations.d";

const UserProfile: React.FC<{ userData: UserData | null }> = ({ userData }) => {
  if (!userData) {
    return <div>Ingen användardata tillgänglig.</div>;
  }
  // console.log("User birthday in profile:", userData);

  return (
  <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
    <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-4">
      Användarprofil
    </h1>
    <div className="flex flex-col items-center gap-4">
      <img
        src={userData.picture}
        alt="Profilbild"
        className="rounded-full w-20 h-20"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold">{userData.givenName}</h2>
        <p><b>E-post: </b>{userData.email}</p>
      </div>
    </div>
  </div>
);

};

export default UserProfile;