import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
        <h1 className="text-center text-3xl font-bold text-[#562f39] mb-4 drop-shadow-md">Kontakta oss</h1>
        <hr className="w-3/4 mx-auto my-4 border-[#562f39]"></hr>
        <p className="text-center text-lg text-gray-700 mb-6">
          Vi är alltid glada att höra från dig! Fyll i formuläret nedan så hör vi av oss så snart vi kan.
        </p>
        <form className="flex flex-col items-center space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Ditt namn"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#b66c6d] focus:ring-1 focus:ring-[#b66c6d] outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Din e-post"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#b66c6d] focus:ring-1 focus:ring-[#b66c6d] outline-none"
          />
          <textarea
            name="message"
            placeholder="Ditt meddelande"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[150px] resize-none focus:border-[#b66c6d] focus:ring-1 focus:ring-[#b66c6d] outline-none"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] hover:bg-[#8f5060] text-white font-bold rounded-full text-lg transition-transform transform hover:scale-105 shadow-md"
          >
            Skicka
          </button>
        </form>
      </div>
    );
  }
}

export default Contact;
