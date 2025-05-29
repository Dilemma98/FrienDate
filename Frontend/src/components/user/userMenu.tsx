import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

const fallbackImage = "https://ui-avatars.com/api/?name=User&background=DED6DA&color=562f39";

const UserMenu = () => {
  const { userData } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!userData) return null;

  return (
   <div className="bg-white shadow-lg rounded-3xl p-4 w-full flex flex-col items-center text-center md:text-left md:items-start lg:mb-10 md:w-1/4 dark:bg-[#1e1e1e]">
  {/* Profil och namn */}
  <img
    src={userData.picture || fallbackImage}
    alt="Profilbild"
    className="rounded-full w-16 h-16 shadow-sm object-cover ring-2 ring-[#bd7d8d] mb-3"
  />
      <h1 className="text-2xl font-bold text-[#562f39] dark:text-[#e2cfd4] leading-snug mb-2">
        Välkommen, {userData.givenName}!
      </h1>

      {/* Toggle-knapp – endast mobil */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-sm text-[#562f39] dark:text-[#e2cfd4] underline mt-1 mb-2"
      >
        {menuOpen ? "Dölj meny ▲" : "Visa meny ▼"}
      </button>

      {/* Menyn – alltid synlig på md+, togglad på mobil */}
      <div
        className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0 md:max-h-full"
        } md:max-h-full md:mt-2`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/userProfile"
              className="block text-md font-medium text-[#562f39] dark:text-[#e2cfd4] hover:text-[#bd7d8d] hover:bg-[#f3edf0] dark:hover:bg-[#2a2a2a] px-3 py-2 rounded-lg transition-all"
            >
              ➤ Profil
            </Link>
          </li>
          <li>
            <Link
              to="/userDashboard"
              className="block text-md font-medium text-[#562f39] dark:text-[#e2cfd4] hover:text-[#bd7d8d] hover:bg-[#f3edf0] dark:hover:bg-[#2a2a2a] px-3 py-2 rounded-lg transition-all"
            >
              ➤ Min kalender
            </Link>
          </li>
          <li>
            <Link
              to="/groupPage"
              className="block text-md font-medium text-[#562f39] dark:text-[#e2cfd4] hover:text-[#bd7d8d] hover:bg-[#f3edf0] dark:hover:bg-[#2a2a2a] px-3 py-2 rounded-lg transition-all"
            >
              ➤ Grupper
            </Link>
          </li>
          <li>
            <Link
              to="*"
              className="block text-md font-medium text-[#562f39] dark:text-[#e2cfd4] hover:text-[#bd7d8d] hover:bg-[#f3edf0] dark:hover:bg-[#2a2a2a] px-3 py-2 rounded-lg transition-all"
            >
              ➤ Inställningar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
