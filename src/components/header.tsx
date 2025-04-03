import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="bg-gradient-to-b from-[#b97989] to-white p-12 text-center shadow-md rounded-b-2xl">
        <h1 className="text-6xl font-bold tracking-wide text-[#562f39] drop-shadow-md font-[Studydesk]">
          <Link
            to="/"
            className="transition-colors duration-300 hover:text-[#8f5060]"
          >
            FrienDate
          </Link>
        </h1>
      </header>
    );
  }
}

export default Header;
