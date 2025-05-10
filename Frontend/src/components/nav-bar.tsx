import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./logoutButton";

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
  window.addEventListener("userLogout", checkLoginStatus); // 👈 lägg till denna

  return () => {
    window.removeEventListener("userLogin", checkLoginStatus);
    window.removeEventListener("userLogout", checkLoginStatus); // 👈 och denna
  };
}, []);


  // const handleLogout = () => {
  //   localStorage.setItem("isLoggedIn", "false");
  //   setIsLoggedIn(false);
  //   setUser(null);
  //   navigate("/");
  // };

  return (
   <nav className="bg-gradient-to-b from-[#f3ece7] to-[#ffffff] shadow-md py-4 rounded-b-2xl">
  <div className="relative flex items-center max-w-7xl mx-auto px-4">
    {/* Centrerade länkar */}
    <ul className="flex space-x-8 text-[#562f39] text-lg font-bold mx-auto">
      <li>
        <Link to="/contact" className="hover:text-[#b66c6d] hover:underline transition-colors duration-300">
          Kontakt
        </Link>
      </li>
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

    {/* Absolut placerad Logout-knapp */}
    {isLoggedIn && (
      <div className="absolute top-0 right-4">
        <LogoutButton />
      </div>
    )}
  </div>
</nav>


  );
};

export default Navbar;
