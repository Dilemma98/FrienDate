import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div className="text-center mb-20 mt-10">
        <h1 className="text-4xl font-bold text-[#562f39] drop-shadow-md">
          Välkommen till FrienDate!
        </h1>
        <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
        <p className="text-xl text-[#562f39] max-w-2xl mx-auto leading-relaxed">
          Vi är glada att ha dig här! Hitta nya sätt att umgås och få hjälp att
          planera din nästa träff med vänner eller familj.
        </p>
        <div className="flex flex-col items-center gap-4 mt-8">
          <Link to="/login">
            <button className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060]">
              Logga in
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060]">
              Registrera
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
