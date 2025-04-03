import React from "react";

class Idea extends React.Component {
  render() {
    return (
      <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
        <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md">
          Affärsidé
        </h1>
        <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
        <p className="text-lg text-[#562f39] leading-relaxed">
        FrienDate är tänkt att underlätta för människor att skapa och vårda sina 
        relationer genom att identifiera gemensamma luckor i gruppens kalendrar 
        och skicka förslag på väderbaserade aktiviteter när ledig tid för alla finns.
        <br></br>
        <br></br>
        Tid är ju något av det mest värdefulla vi har, och med FrienDate vill vi ge 
        människor möjlighet till mer tid för det som verkligen betyder något – vänner, familj och gemenskap.
        Vår förhoppning är att tjänsten inte bara ska göra det enklare att planera 
        och prioritera dessa värdefulla möten, utan också hjälpa människor att skapa 
        en bättre balans i livet genom att stärka de relationer som verkligen berikar oss. 
        <br></br>
        <br></br>
        Vi vill att våra användare ska kunna fokusera på det roliga – att umgås och skapa minnen 
        – utan att fastna i den tidskrävande planeringen.
        Så, genom att synkronisera kalendrar, föreslå aktiviteter baserat på väder och 
        tillhandahålla en enkel kommunikationsplattform, gör FrienDate det enklare för 
        människor att hitta tid för varandra. Vi ser det som att ta tillbaka de sociala 
        banden som lätt går förlorade i vardagens stress. FrienDate ska också vara en 
        påminnelse om att vi inte bara ska överleva vår hektiska vardag, utan även leva den.
        </p>
      </div>
    );
  }
}

export default Idea;
