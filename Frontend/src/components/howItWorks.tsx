import React from "react";

class HowItWorks extends React.Component {
  render() {
    return (
      <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
        <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md">
          Så funkar det
        </h1>
        <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
        <p className="text-lg text-[#562f39] leading-relaxed">
          FrienDate hjälper dig och dina vänner att hitta tid för varandra, även när
          livet är som mest hektiskt. Genom att synkronisera era kalendrar kan appen
          automatiskt hitta gemensamma lediga tider utan att ni behöver skicka
          oändliga meddelanden fram och tillbaka. 
          <br /><br />
          När en gemensam lucka hittas föreslår FrienDate aktiviteter baserade på
          vädret och era preferenser, vilket gör det enkelt att välja något som passar
          för tillfället. Appen erbjuder också en smidig kommunikationsplattform där ni
          kan diskutera och bestämma detaljer.
          <br /><br />
          Målet är att göra det enklare för dig att vårda dina relationer och skapa
          fler minnen tillsammans – utan stress och krångel.
        </p>
      </div>
    );
  }
}

export default HowItWorks;
