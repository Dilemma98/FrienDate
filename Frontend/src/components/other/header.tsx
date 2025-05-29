import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const destination = isLoggedIn ? "/userDashboard" : "/";
    navigate(destination);
  };

  useEffect(() => {
    const handleLogout = () => {
      navigate("/"); // när användaren loggar ut, gå hem
    };

    window.addEventListener("userLogout", handleLogout);

    return () => {
      window.removeEventListener("userLogout", handleLogout);
    };
  }, [navigate]);

  return (
  <header className="bg-gradient-to-b from-[#E0CAD199] to-[#EDE1E599]">
  <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center md:justify-start">

    <button
      onClick={handleClick}
      className="text-6xl font-bold text-[#562f39] drop-shadow-sm transition duration-300 hover:cursor-pointer hover:text-[#bd7d8d] font-[Studydesk]"
    >
      FrienDate
    </button>
  </div>
</header>
  );
};

export default Header;
