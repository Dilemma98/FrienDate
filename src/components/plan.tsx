import React from "react";

class Plan extends React.Component {
  render() {
    return (
      <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
        <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md">
          Affärsplan
        </h1>
        <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
        <p className="text-lg text-[#562f39] leading-relaxed">
          FrienDate är en app som gör det lättare för vuxna med hektiska liv att
          hitta tid att träffas. Genom att synkronisera kalendrar och föreslå
          aktiviteter baserat på tillgänglighet och väder, hjälper vi användare
          att hitta gemensamma tider för att umgås. 
          <br></br>
          <br></br>
          Tjänsten riktar sig till vuxna mellan 25 och 45 år som har svårt att få ihop
          sina sociala träffar. Appen kommer i en gratisversion och en premiumversion
          för 69 kr/mån med fler funktioner.
          <br></br>
          <br></br>
          Vi siktar på att få 250 betalande användare under det första året och kommer
          marknadsföra FrienDate på sociala medier som Instagram och Facebook. <br />
          FrienDate kommer att utvecklas vidare med fler plattformsintegrationer och nya
          funktioner för att göra användarupplevelsen ännu bättre.
        </p>
      </div>
    );
  }
}

export default Plan;
