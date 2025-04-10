import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
}

//Functional component to easier use useNavigate
const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  /*
      Fetch localStorage information
      and change state for "user"
      within useEffect-hook
    */
  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("registeredUser") || "{}"
    );
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  return (
    <div className="text-center mb-20 mt-10">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#562f39] mb-6 drop-shadow-md">
          Välkommen {user?.firstName}!
        </h1>
        <p className="text-xl text-[#562f39] mb-5">
            Så roligt att du har blivit en del av vår 
            gemenskap! Här kan du hålla koll på både din
            och dina vänners kalendrar och få tips på 
            aktiviteter ni kan göra tillsammans.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060]"
        >
          Logga ut
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
