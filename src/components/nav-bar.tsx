import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
}

const Navbar: React.FC = () => {
  const [, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

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

    return () => {
      window.removeEventListener("userLogin", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-b from-[#f3ece7] to-[#ffffff] shadow-md py-4 rounded-b-2xl">
      <div className="flex items-center relative max-w-7xl mx-auto px-4">
        {/* Centrerade länkar */}
        <ul className="flex space-x-8 text-[#562f39] text-lg font-bold mx-auto">
          <li>
            <Link to="/contact" className="hover:text-[#b66c6d] hover:underline transition-colors duration-300">
              Kontakt
            </Link>
          </li>
          {/* If user NOT logged in, show this */}
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/idea" className="hover:text-[#b66c6d] hover:underline transition-colors duration-300">
                  Affärsidé
                </Link>
              </li>
              <li>
                <Link to="/plan" className="hover:text-[#b66c6d] hover:underline transition-colors duration-300">
                  Affärsplan
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* If user IS logged in, show this */}
              <li>
                <Link to="/profile" className="hover:text-[#b66c6d] hover:underline transition-colors duration-300">
                  Profil
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-[#b66c6d] hover:underline transition-colors duration-300">
                  Inställningar
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logga ut-knappen längst till höger */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="absolute right-4 px-6 py-2 bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060]"
          >
            Logga ut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
