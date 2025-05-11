# FrienDate

**Länk till lanserad app/sida:**  
[https://friendate-pn5e9.ondigitalocean.app/](https://friendate-pn5e9.ondigitalocean.app/)

FrienDate är en React-applikation skapad för kursen *Klientprogrammering*.

## Vyer i applikationen

- **Homepage**  
  Här hittar du valen att registrera dig eller logga in, tillsammans med en välkomsttext.

- **Affärsplan**  
  Beskriver kort affärsplanen som skapades i kursen *Affärsmannaskap för IT*.

- **Affärsidé**  
  Här presenteras affärsidén i korthet.

- **Kontakt**  
  I framtiden ska man kunna skicka frågor eller meddelanden via denna vy.

## Så här startar du applikationen

1. Klona ner projektet via terminalen:  
   `git clone https://github.com/Dilemma98/FrienDate`

2. Gå till projektmappen:  
   `cd FrienDate`

3. Installera beroenden:  
   `npm install`

4. Starta applikationen:  
   `npm run dev`

5. Gå till länken som visas i terminalen (vanligtvis `http://localhost:5173`)
---------------------------------------------------------------------------------------

**Vald metod och teknik för källkodshantering**
Jag har valt att arbeta med Github för versionshantering av projektet. Detta för att det är ett utbrett arbetssätt bland utvecklare. I detta projekt använder jag mig av github för att lagra det i molnet, men också för att bjuda in läraren för bedömning. Under kursens gång kommer repot ligga som privat.

**Arbetssätt med källkod**
Jag kommer att arbeta med branches, där nya funktioner utvecklas i en egen branch, som sedan slås ihop med main (Setup i detta fall) när funktionen fungerar utefter önskemål.
Vid varje push kommer ett commit-meddelande bifogas där det beskrivs vad som gjorts i denna ändring. Mitt mål är också att pusha min kod ofta, för att se till så eventuellt bortfall av kod inte blir allt för stor. Men även för att förenkla eventuella buggar som pushats upp.

**JavaScripts-ramverkets påverkan på användningen av kodens struktur**
Genom att använda sig av ett ramverk som React delas koden upp i mindre och mer återanvändbara komponenter. Detta gör att det blir mycket enklare att underhålla sin applikation.
I och med React får man tillgång till State, vilket gör att hanteringen av dynamisk data och uppdateringen av UX/UI blir enklare.
React Router, som jag använder mig av, gör även navigeringen smidigare, då den hanterar navigering mellan olika vyer utan att rendera om sidan. Detta får applikationen mycket snabbare.
Det finns även en virtuell DOM som ser till att endast rendera de delar av sidan som faktiskt har ändrats, och även detta gör applikationen snabbare.

**Byggsystem**
Det byggsystem som används är Vite, vilket hanterar både transpilation och utvecklingsserver
