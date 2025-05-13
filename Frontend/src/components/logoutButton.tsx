import React from "react";

const LogoutButton: React.FC = () => {

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("userLogout"));
};

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 text-lg bg-[#562f39] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#bd7d8d] flex items-center justify-center gap-3">
      Logga ut
    </button>
  );
};

export default LogoutButton;
