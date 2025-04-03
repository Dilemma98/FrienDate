import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="bg-gradient-to-b from-[#b97989] to-[#f3ece7] p-7 text-center shadow-xl">
        <h1 className="text-7xl font-bold tracking-wide text-[#562f39] drop-shadow-lg font-[Studydesk]">
          <Link
            to="/"
            className="transition-colors duration-300 hover:text-[#8f5060] hover:scale-105"
          >
            FrienDate
          </Link>
        </h1>
      </header>
    );
  }
}

export default Header;
