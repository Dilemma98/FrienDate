import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
        <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-4">
          Kontakta oss
        </h1>
        <hr className="w-3/4 mx-auto border-[#5a3c48]" />
        <p className="mt-4 text-center text-lg text-[#5a3c48] mb-6">
          Vi är alltid glada att höra från dig! Fyll i formuläret nedan så hör vi av oss så snart vi kan.
        </p>
        <form className="flex flex-col items-center w-full max-w-md p-6 bg-[#f5e7ea] rounded-2xl shadow-xl m-auto">
          <input
            type="text"
            name="name"
            placeholder="Ditt namn"
            required
            className="w-full p-3 mb-4 text-[#5a3c48] border-2 border-[#c89aa8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c89aa8]"
          />
          <input
            type="email"
            name="email"
            placeholder="Din e-post"
            required
            className="w-full p-3 mb-4 text-[#5a3c48] border-2 border-[#c89aa8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c89aa8]"
          />
          <textarea
            name="message"
            placeholder="Ditt meddelande"
            required
            className="w-full p-3 mb-6 text-[#5a3c48] border-2 border-[#c89aa8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c89aa8] resize-none min-h-[150px]"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-b from-[#c89aa8] to-[#a6768a] hover:scale-105 transition-all"
          >
            Skicka
          </button>
        </form>
      </div>
    );
  }
}

export default Contact;
