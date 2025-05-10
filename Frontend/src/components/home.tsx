import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./googleLoginButton";
import UserProfile from "./userProfile";

export interface UserData {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

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
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Lyssna på inloggning/utloggning
  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem("frienDateUser");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      setUserData(null);
    };

    window.addEventListener("userLogin", handleLogin);
    window.addEventListener("userLogout", handleLogout);

    return () => {
      window.removeEventListener("userLogin", handleLogin);
      window.removeEventListener("userLogout", handleLogout);
    };
  }, []);

  return (
    <div className="text-center mb-20 mt-10">
      {isLoggedIn && userData ? (
        <UserProfile userData={userData} />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-[#562f39] drop-shadow-md">
            Välkommen till FrienDate!
          </h1>
          <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
          <p className="text-xl text-[#562f39] max-w-2xl mx-auto leading-relaxed">
            Vi är glada att ha dig här! Hitta nya sätt att umgås och få hjälp att
            planera din nästa träff med vänner eller familj.
          </p>
          <div className="flex flex-col items-center gap-4 mt-8">
            <GoogleLoginButton setUserData={setUserData} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
