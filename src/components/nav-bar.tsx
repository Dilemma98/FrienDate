import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="bg-gradient-to-b from-[#f3ece7] to[#ffffff] shadow-md py-4 rounded-b-2xl">
        <ul className="flex justify-center space-x-8 text-[#562f39] text-lg font-bold">
          <li>
            <Link
              to="/contact"
              className="transition-colors duration-300 hover:text-[#b66c6d] hover:underline"
            >
              Kontakt
            </Link>
          </li>
          <li>
            <Link
              to="/idea"
              className="transition-colors duration-300 hover:text-[#b66c6d] hover:underline"
            >
              Affärsidé
            </Link>
          </li>
          <li>
            <Link
              to="/plan"
              className="transition-colors duration-300 hover:text-[#b66c6d] hover:underline"
            >
              Affärsplan
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
