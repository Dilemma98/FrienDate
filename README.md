#FrienDate

Detta är en React-applikation skapad för kursen Klientprogrammering. 
De vyer du hittar här:
1.**Homepage** - Här hittar du början på två val, registrering eller logga in, tillsammans med en välkomsttext.
2.**Affärsplan** - Beskriver kort affärsplanen vi skapade i kursen Affärsmannaskap för IT.
3.**Affärsidé** - Här förklaras affärsidén lite kort.
4.**Kontakt** - Här kan man i framtiden skicka in en fråga/ett meddelande till oss.

##Såhär startar du applikationen
1. Klona ner projektet via terminalen:
   git clone https://github.com/Dilemma98/FrienDate

2. Gå till mappen:
   cd FrienDate

3. Installera beroenden:
   npm install

4. Starta sedan applikationen:
   npm run dev
   och gå sedan till länken som dyker upp
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



Länk till lanserad app/sida:
https://friendate-pn5e9.ondigitalocean.app/
