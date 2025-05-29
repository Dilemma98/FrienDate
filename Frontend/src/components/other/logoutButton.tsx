import React from "react";

const LogoutButton: React.FC = () => {

  const handleLogout = () => {
    // Set 'isLoggedIn' in localStorage to 'false' to indicate the user is logged out
    localStorage.setItem("isLoggedIn", "false");
    
    // Dispatch a custom event 'userLogout' to notify other parts of the application about the logout
    window.dispatchEvent(new Event("userLogout"));
};

  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-b from-[#7a4c5a] to-[#89656f] px-4 text-lg text-white font-bold rounded-full shadow-md transition-transform transform hover:cursor-pointer hover:scale-110 hover:bg-[#bd7d8d] flex items-center justify-center gap-3">
      Logga ut
    </button>
  );
};

export default LogoutButton;
