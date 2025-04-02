import React from "react";
import { Link } from "react-router-dom";

interface RegisterPageState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  successMessage: string;
}

class RegisterPage extends React.Component<{}, RegisterPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      successMessage: "",
    };
  }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ successMessage: "Registreringen lyckades!" });
  };

  render() {
    return (
      <div>
        <h1>Registrera dig här</h1>
        <hr />
        <form className="inputForms" onSubmit={this.handleSubmit}>
          <input
            name="firstName"
            placeholder="Förnamn"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Efternamn"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />
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
          <button type="submit" className="formActionButtons">
            Registrera
          </button>
        </form>
        <h4>Har du redan ett konto? Logga in nedan:</h4>
        <Link to="/loginPage">
          <button className="login-btn">Logga in</button>
        </Link>
      </div>
    );
  }
}
export default RegisterPage;
