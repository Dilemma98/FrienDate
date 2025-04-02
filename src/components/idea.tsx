import React from "react";

class Idea extends React.Component{
    render(){
        return(
            <div>
                <h1 className="componentHeader">Affärsidé</h1>
                <hr></hr>
                <p>
                    FrienDate är tänkt att underlätta för människor att skapa och vårda sina relationer genom att identifiera 
                    gemensamma luckor i gruppens kalendrar och skicka förslag på väderbaserade aktiviteter när ledig tid 
                    för alla finns. <br></br>Min förhoppning är att tjänsten gör det enklare att planera och prioritera dessa värdefulla 
                    möten, så både jag själv och andra kan få ut mer tid med nära och kära.
                </p>
            </div>
        );
    }
}
export default Idea;