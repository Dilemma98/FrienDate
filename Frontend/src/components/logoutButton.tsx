import React from "react";

const LogoutButton: React.FC = () => {

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("userLogout"));
};

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060] flex items-center justify-center gap-3">
      Logga ut
    </button>
  );
};

export default LogoutButton;
