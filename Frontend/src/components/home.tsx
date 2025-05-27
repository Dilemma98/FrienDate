import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./googleLoginButton";
import UserDashboard from "./user/userDashboard";
import type { UserData } from "../declarations/declarations.d";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("frienDateUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Fetch user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("frienDateUser");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedUser && loggedIn) {
      setUserData(JSON.parse(storedUser));
      setIsLoggedIn(true);
    } else {
      setUserData(null);
      setIsLoggedIn(false);
    }
  }, []);

  // Listen for login/logout events to update user data and login status
  useEffect(() => {
    const handleLogin = () => {
      const storedUser = localStorage.getItem("frienDateUser");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };

    const handleLogout = () => {
      setUserData(null);
      setIsLoggedIn(false);
    };

    window.addEventListener("userLogin", handleLogin);
    window.addEventListener("userLogout", handleLogout);

    return () => {
      window.removeEventListener("userLogin", handleLogin);
      window.removeEventListener("userLogout", handleLogout);
    };
  }, []);

  return (
  <div className="mt-10 flex items-center justify-center px-4">
     {/* If not logged in, show login button */}
    {!isLoggedIn || !userData ? (
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-[#333333] mb-4 text-center">
          Välkommen till FrienDate
        </h1>
        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          Synka dina kalendrar och hitta nya sätt att umgås – enkelt, smart och kul.
        </p>
        <div className="flex justify-center">
          <GoogleLoginButton setUserData={setUserData} />
        </div>
      </div>
    ) : (
      // If logged in, show user dashboard
      <UserDashboard userData={userData} />
    )}
  </div>
);
};

export default HomePage;
