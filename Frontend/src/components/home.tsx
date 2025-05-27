import React from "react";
import GoogleLoginButton from "./googleLoginButton";
import UserDashboard from "./user/userDashboard";
// import type { UserData } from "../declarations/declarations.d";
import { useUser } from "./context/userContext";

const HomePage: React.FC = () => {
  const { userData, isLoggedIn, setUserData } = useUser();

  if (!isLoggedIn || !userData) {
    return (
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-3xl font-semibold text-[#333333] mb-4 text-center">
            Välkommen till FrienDate
          </h1>
          <p className="text-gray-700 text-center mb-6 leading-relaxed">
            Synka dina kalendrar och hitta nya sätt att umgås – enkelt, smart
            och kul.
          </p>
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    );
  }

  return <UserDashboard userData={userData} />;
};

export default HomePage;
