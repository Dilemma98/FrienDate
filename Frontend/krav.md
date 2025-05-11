- [x] **När `app` besöks i webbläsaren ska din prototyp renderas med React**
      Detta krav har jag löst genom att se till så App är "föräldrakomponenten" i mitt
      react-träd. Mina andra komponenter som contact, plan, idea osv är "barnkomponenter"
      till app. Dessa komponenter finns under Routes i App och ser till att de syns vid
      önskat tillfälle
  
- [x]  **React-*trädet* som renderas som ska bestå av minst 5st komponenter som du skrivit själv och som finns med i källkoden. (*alla komponenter behöver inte renderas samtidigt*)**
       Jag har 11st komponenter, varav 8 är "nya sidor", som visas antingen hela tiden så som header
       och footer, eller endast vid specifika tillfällen som när man navigerar runt på sidan.
       
- [x]  **Dina React komponenter är skrivna med JSX syntaxen.**
       Då jag använder TSX i mina komponenter får jag automatisk tillgång till JSX-syntaxen
       bara det att jag i.o.m TSX får extra stöttning i typning av variabler med också med
       felhantering.
       
- [x]  **Minst två av dina komponenter ska hantera ett "event" i Javascript, exempelvis från användaren.**
       I både login och register-komponenten hanterar jag event från användaren i mina handleChange-
       funktioner. Eventet i detta fall är objektet som skickas efter att användaren har
       interagerat med ett input-fält.
       HandleSubmit-funktionen är den del av koden som hanterar vad som händer när användaren klickar på
       Logga in. Då kontrolleras inloggningsuppgifterna och skickas sedan till LocalStorage
       i form av ett objekt.
       
- [x]  **Minst två av dina komponenter ska använda sig av “state” för att rendera tillståndsbaserad information. (i.e. "*conditional rendering"*)**
       I både login och register-komponenten har jag olika states, en av de är successMessage.
       Till en början har den ett tomt state, för att sedan ändras beroende på om registreringen
       / inloggningen lyckats eller ej. Lyckas det har jag ändrat state på den så den bekräftar
       framgången, lyckas det inte ändrar jag statet så den förklarar att något blek tokigt.
       
- [x]  **En av dina komponenter använder sig av en *Lifecycle metod* eller *hook* för att påverka en annan komponents tillstånd. Render räknas inte som en *lifecycle* metod.**
       Jag använder mig av hooken useNavigate från ReactRouter i min Header-komponent.
       Där kallar jag på navigate-funktionen i min handleClick funktion. HandleClick är
       också den funktion som kollar om användaren är inloggad eller inte, för att se till
       så trycket på FrienDate-loggan visar rätt komponent. Antingen Dashboard eller Home.
          Även i min Register och Login definierar och använder jag mig av navigate för att skicka
       användaren till sin Dashboard direkt vid registrering/inloggning.
       
- [x]  **Via en av komponenterna ska användaren kunna spara information i LocalStorage.**
       När en användare registrerar sig sparas deras uppgifter i LocalStorage.
       I detta fall sparas även lösenordet, trots att man inte ska göra så, men dettta görs
       bara för att simulera en riktig inloggning. Innan jag sparade det kunde man logga in
       med vilket lösenord som helst, så länge bara e-posten stämde överens med den registrerade e-posten.
       
- [x]  **Informationen i LocalStorage används vid renderingen av React-*trädet.***
       Vid rendering av sidan Dashboard hämtar jag namnet, från LS,
       på den inloggaden användaren, för att sedan kunna visa det i välkomst-texten.
       
- [x] **I `app` används egen css, eller ett bibliotek för att ge dina komponenter stil och form**
       Jag har använt mig av Tailwind-biblioteket för att styla min sida.
       
- [x]  **I `app` används egen css för att ge dina komponenter rörelser**
       Jag har gjort en enkel liten animation för att illustrera att hemsidan jobbar.
       Detta är vid registrering och inloggning som en snurrande cirkel dyker upp som för
       att visa att "ditt innehåll dyker upp alldeles snart, låt mig bara jobba lite".
