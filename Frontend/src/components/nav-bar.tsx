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

    // Init check
    checkLoginStatus();

    // Lyssna på custom events
    window.addEventListener("userLogin", checkLoginStatus);
    window.addEventListener("userLogout", checkLoginStatus);

    // Clean up
    return () => {
      window.removeEventListener("userLogin", checkLoginStatus);
      window.removeEventListener("userLogout", checkLoginStatus);
    };
  }, []);

  return (
   <nav className="bg-gradient-to-b from-[#fdfbfa] to-[#f3e7eb] shadow-md py-4 rounded-b-4xl">
  <div className="relative flex items-center max-w-7xl mx-auto px-6">
    {/* Centrerade länkar */}
    <ul className="flex space-x-8 text-[#562f39] text-lg font-semibold mx-auto">
      <li>
        <Link
          to="/contact"
          className="hover:text-[#bd7d8d] hover:underline transition-colors duration-300"
        >
          Kontakt
        </Link>
      </li>
      {!isLoggedIn ? (
        <>
          <li>
            <Link
              to="/idea"
              className="hover:text-[#bd7d8d] hover:underline transition-colors duration-300"
            >
              Affärsidé
            </Link>
          </li>
          <li>
            <Link
              to="/plan"
              className="hover:text-[#bd7d8d] hover:underline transition-colors duration-300"
            >
              Affärsplan
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/userProfile"
              className="hover:text-[#bd7d8d] hover:underline transition-colors duration-300"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="hover:text-[#bd7d8d] hover:underline transition-colors duration-300"
            >
              Inställningar
            </Link>
          </li>
          <li>
            <Link
              to="/groups"
              className="hover:text-[#bd7d8d] hover:underline transition-colors duration-300"
            >
              Grupper
            </Link>
          </li>
        </>
      )}
    </ul>

    {isLoggedIn && (
      <div className="md:absolute md:top-0 md:right-6">
        <LogoutButton />
      </div>
    )}
  </div>
</nav>
  );
};

export default Navbar;
