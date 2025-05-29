import React from "react";

class AboutUs extends React.Component {
  render() {
    return (
      <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
        <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md">
          Om oss
        </h1>
        <hr className="w-3/4 mx-auto my-4 border-[#562f39]" />
        <p className="text-lg text-[#562f39] leading-relaxed">
          Vår förhoppning med FrienDate är att den inte bara ska hjälpa
          människor att hitta tid för varandra, utan också bidra till en bättre
          balans i livet. I en vardag där kalendern ofta styr, vill jag att
          FrienDate ska påminna oss om att det viktigaste inte är att hinna med
          allt – utan att hinna med varandra. <br/><br/>
          
          Genom att synkronisera kalendrar,
          föreslå aktiviteter utifrån väder och erbjuda en smidig
          kommunikationsplattform vill vi göra det enklare att ses – utan
          krångel. Målet är att stärka de relationer som verkligen betyder
          något, och att hjälpa oss att ta tillvara på de små luckorna som
          annars går förlorade i vardagens stress. Vi tror att FrienDate kan
          göra verklig skillnad. För när vi får mer tid tillsammans, blir livet
          inte bara mer organiserat – det blir också rikare. Det här är inte
          bara en app för planering, utan en tjänst för gemenskap.
        </p>
      </div>
    );
  }
}

export default AboutUs;
