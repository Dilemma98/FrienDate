import React from "react";
import GoogleLoginButton from "../login/googleLoginButton";
import UserDashboard from "../user/userDashboard";
import { useUser } from "../context/userContext";

const HomePage: React.FC = () => {
  const { userData, isLoggedIn } = useUser();

  if (!isLoggedIn || !userData) {
    return (
      <div className="min-h-screen py-4 px-0">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-[#562f39] mb-4 text-center">
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
      </div>
    );
  }

  return <UserDashboard />;
};

export default HomePage;
