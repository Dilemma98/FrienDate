import React from "react";
import { Link } from "react-router-dom";

// Definiera state-typ
interface LoginPageState {
  email: string;
  password: string;
  successMessage: string;
}

class LoginPage extends React.Component<{}, LoginPageState> {
  constructor(props: {}) {
    super(props);
    // Initialisera state med värden
    this.state = {
      email: "",
      password: "",
      successMessage: "",
    };
  }

  // Hantera förändring i formulärfälten
  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hantera formulärets submit
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ successMessage: "Inloggad!" });
  };

  render() {
    return (
      <div>
        <h1>Logga in</h1>
        <hr />
        <form className="inputForms" onSubmit={this.handleSubmit}>
          <input
            name="email"
            placeholder="Mail-adress"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Logga in</button>
        </form>
        <h4>Har du inget konto? Skapa ett nedan:</h4>
        <Link to="/registerPage">
          <button className="register-btn">Registrera</button>
        </Link>
        {this.state.successMessage && <p>{this.state.successMessage}</p>}
      </div>
    );
  }
}

export default LoginPage;
