import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//Changed this to a functional component
// to be able to use useNavigate
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storedUser = JSON.parse(
      localStorage.getItem("registeredUser") || "{}"
    );
    if (email === storedUser.email && password === storedUser.password) {
      /*IsLoggedIn to be able to make headerLogo
      render the page I want depending och logged
      in or not*/
      localStorage.setItem("isLoggedIn", "true");
      setSuccessMessage("Du loggas in...");

      setTimeout(() => {
        //To talk to nav-bar
        window.dispatchEvent(new Event("userLogin"));
        setSuccessMessage("");
        navigate("/dashboard");
      }, 2000);
    } else {
      setSuccessMessage("Oops... Fel e-post eller lösenord!");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    }
  };

  return (
    <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 mt-4 mb-15 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-4">
        Logga in
      </h1>
      <hr className="w-3/4 border-[#562f39] mb-6 m-auto" />

      <form
        className="flex flex-col items-center w-full max-w-md p-6 bg-[#fcefef] rounded-2xl shadow-xl m-auto"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          placeholder="Mail-adress"
          type="email"
          value={email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 text-[#562f39] border-2 border-[#b66c6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66c6d]"
        />
        <input
          name="password"
          placeholder="Lösenord"
          type="password"
          value={password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 text-[#562f39] border-2 border-[#b66c6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66c6d]"
        />
        <button
          type="submit"
          className="w-full py-3 text-lg font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] hover:bg-[#8f5060] hover:scale-105 transition-all"
        >
          Logga in
        </button>
      </form>

      <h4 className="mt-6 text-lg text-[#562f39]">
        Har du inget konto? Skapa ett nedan:
      </h4>
      <Link to="/register">
        <button className="mt-4 px-6 py-3 text-lg font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] hover:bg-[#8f5060] hover:scale-105 transition-all">
          Registrera
        </button>
      </Link>

      {successMessage && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-[#ffffff80] flex-col">
          <p className="px-6 py-4 text-xl font-bold text-white bg-[#b66c6d] rounded-lg shadow-lg">
            {successMessage}
          </p>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
