import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./googleLoginButton";
import UserDashboard from "./userDashboard";
import type { UserData } from "../declarations/declarations.d";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("frienDateUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Hämta användardata vid mount
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

  // Lyssna på inloggning/utloggning
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

  // Visa endast en vy baserat på inloggningsstatus
  if (isLoggedIn && userData) {
    return <UserDashboard userData={userData} />;
  }

  return (
    <div className="text-center mb-20 mt-10">
      {!isLoggedIn || !userData ? (
        <div>
          <h1 className="text-4xl font-bold text-[#562f39] drop-shadow-md">
            Välkommen till FrienDate!
          </h1>
          <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
          <p className="text-xl text-[#562f39] max-w-2xl mx-auto leading-relaxed">
            Vi är glada att ha dig här! Hitta nya sätt att umgås och få hjälp
            att planera din nästa träff med vänner eller familj.
          </p>
          <div className="flex flex-col items-center gap-4 mt-8">
            <GoogleLoginButton setUserData={setUserData} />
          </div>
        </div>
      ) : (
        <UserDashboard userData={userData} />
      )}
    </div>
  );
};

export default HomePage;
