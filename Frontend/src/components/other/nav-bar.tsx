import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";

interface User {
  firstName: string;
  lastName: string;
}

const Navbar: React.FC = () => {
  const [, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);

      if (loggedInStatus) {
        const storedUser = JSON.parse(
          localStorage.getItem("registeredUser") || "{}"
        );
        setUser(storedUser);
      } else {
        setUser(null);
      }
    };

    checkLoginStatus();

    window.addEventListener("userLogin", checkLoginStatus);
    window.addEventListener("userLogout", checkLoginStatus);

    return () => {
      window.removeEventListener("userLogin", checkLoginStatus);
      window.removeEventListener("userLogout", checkLoginStatus);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-b from-[#EDE1E599] to-[#E0CAD199] shadow-md py-4 rounded-b-4xl">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center md:justify-between gap-4">
        {/* Länkar */}
        <ul className="flex flex-wrap justify-center gap-6 text-[#562f39] text-lg font-semibold">
          <li>
            <Link
              to="/contactUs"
              className="hover:text-[#bd7d8d] transition-colors duration-300"
            >
              Kontakta oss
            </Link>
          </li>
          <li>
            <Link
              to="/aboutUs"
              className="hover:text-[#bd7d8d] transition-colors duration-300"
            >
              Om oss
            </Link>
          </li>
          <li>
            <Link
              to="/howItWorks"
              className="hover:text-[#bd7d8d] transition-colors duration-300"
            >
              Så funkar det
            </Link>
          </li>
        </ul>

        {/* Logout-knapp */}
        {isLoggedIn && (
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
