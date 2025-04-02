import React from "react";
import { Link } from "react-router-dom";

class LoginPage extends React.Component{
    render(){
        return(
            <nav>
            <ul>
              <li>
                <Link to="/contact">Kontakt</Link>
              </li>
              <li>
                <Link to="/idea">Affärsidé</Link>
              </li>
              <li>
                <Link to="/plan">Affärsplan</Link>
              </li>
            </ul>
          </nav>
        );
    }
}
export default LoginPage;