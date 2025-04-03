import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="bg-[#fcefef60] shadow-md py-3 mb-15 rounded-2xl">
        <ul className="flex justify-center space-x-8 text-[#562f39] text-lg font-bold">
          <li>
            <Link to="/contact" className="hover:text-[#b66c6d] transition-all">
              Kontakt
            </Link>
          </li>
          <li>
            <Link to="/idea" className="hover:text-[#b66c6d] transition-all">
              Affärsidé
            </Link>
          </li>
          <li>
            <Link to="/plan" className="hover:text-[#b66c6d] transition-all">
              Affärsplan
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
