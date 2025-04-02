import React from "react";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Logga in</h1>
        <hr></hr>
        <form className="inputForms">
          <input placeholder="Mail-adress" type="text"></input>
          <input placeholder="Lösenord" type="password"></input>
          <button className="formActionButtons">Logga in</button>
        </form>
        <h4>Har du inget konto? Skapa ett nedan:</h4>
        <Link to="/registerPage">
          <button className="register-btn">Registrera</button>
        </Link>
      </div>
    );
  }
}
export default LoginPage;
