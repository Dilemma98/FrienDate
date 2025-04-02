import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1 className="componentHeader">Välkommen till FrienDate!</h1>
        <hr></hr>
        <p>
          Vi är glada att ha dig här! Hitta nya sätt att umgås och få hjälp att
          planera din nästa träff med vänner eller familj.
        </p>
        <div className="buttons">
          <Link to="/loginPage">
            <button className="login-btn">Logga in</button>
          </Link>
          <Link to="/registerPage">
            <button className="register-btn">Registrera</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default HomePage;
