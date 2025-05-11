import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("Konto skapas... snart klar");

    /*
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      Password is being saved i localStorage
      ONLY to simulate real login
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    */
    localStorage.setItem("registeredUser", JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    }));
    
     /*IsLoggedIn to be able to make headerLogo
      render the page I want depending och logged
      in or not*/
    localStorage.setItem("isLoggedIn", "true");

    setTimeout(() => {
      setSuccessMessage("");

      //Hook to navigate to logged in page
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 mt-4 mb-15 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-4 mt-0">
        Registrera dig här
      </h1>
      <hr className="w-3/4 border-[#562f39] mb-6 m-auto" />
      
      <form
        className="flex flex-col items-center w-full max-w-md p-6 bg-[#fcefef] rounded-2xl shadow-xl m-auto"
        onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="Förnamn"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 text-[#562f39] border-2 border-[#b66c6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66c6d]"/>
        <input
          name="lastName"
          placeholder="Efternamn"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 text-[#562f39] border-2 border-[#b66c6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66c6d]"/>
        <input
          name="email"
          placeholder="Mail-adress"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 text-[#562f39] border-2 border-[#b66c6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66c6d]"/>
        <input
          name="password"
          placeholder="Lösenord"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 text-[#562f39] border-2 border-[#b66c6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66c6d]"/>
        <button
          type="submit"
          className="w-full py-3 text-lg font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] hover:bg-[#8f5060] hover:scale-105 transition-all">
          Registrera
        </button>
      </form>

      <h4 className="mt-6 text-lg text-[#562f39]">Har du redan ett konto? Logga in nedan:</h4>
      <Link to="/login">
        <button className="mt-4 px-6 py-3 text-lg font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] hover:bg-[#8f5060] hover:scale-105 transition-all">
          Logga in
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

export default RegisterPage;
