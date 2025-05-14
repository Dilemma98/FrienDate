# FrienDate
FrienDate är tänkt att underlätta för människor att skapa och vårda sina relationer genom att identifiera gemensamma luckor i gruppens kalendrar och skicka förslag på väderbaserade aktiviteter när ledig tid för alla finns.

## Sammanfattning
### Just nu kan du:

✅ Logga in med ditt Google-konto

✅ Se din personliga Google-kalender med dina kommande händelser

✅ Få aktivitetsförslag baserat på väder och vald stad

---

### Struktur
Projektet är uppdelat i två mappar:
- Frontend/ -React-appen

Frontend hämtar data från backend för att sedan rendera ut rätt innehåll allt efter de val man gör på sidan

https://github.com/Dilemma98/FrienDate/tree/Deploy/Frontend

- Backend/ -API och serverlogik

Backendens viktigaste delar är de enpoints jag har. En POST för att kunna logga in en användare via google.
En GET för att hämta en inloggade användarens kalenderhändelser. En GET för att hämta väder, för att sedan kunna ge förslag på aktiviteter utifrån det.

https://github.com/Dilemma98/FrienDate/tree/Deploy/Backend

---

### Förberedelser
Innan du kan starta applikationen behöver du:

- #### Google API - OAuth client ID

och

- #### OpenWeatherMap API-nyckel

#### Google API - OAuth client ID
För att möjliggöra inloggning med Google och åtkomst till kalendern behöver du skapa ett eget OAuth 2.0 Client ID via Google Cloud Console.

1. Gå till Google Cloud Console.

2. Skapa ett nytt projekt eller välj ett befintligt projekt.

3. Gå till API & Services > Credentials.

4. Klicka på Create Credentials och välj OAuth 2.0 Client IDs.

5. Välj en lämplig applikationstyp (vanligtvis "Web application").

6. När du skapar ditt Client ID, kommer du behöva ange en redirect URI. Där klistrar du in http://localhost:5175

7. När du har skapat din OAuth 2.0 Client ID, kopiera client_id och lägg till den i frontendens .env-fil som:

```bash
VITE_GOOGLE_CLIENT_ID="din-client-id"
```
Och byt ut "din-client-id" mot den du fick från Google Cloud Console


#### OpenWeatherMap API.nyckel

För att hämta väderdata krävs en API-nyckel från OpenWeatherMap.

1. Gå till OpenWeatherMap och skapa ett gratis konto.

2. När du är inloggad, gå till API och skapa en ny nyckel.

3. Kopiera din API-nyckel och lägg till den i backendens .env-fil:

```bash
OPENWEATHER_API_KEY="din-api-nyckel"
```
Och byt ut "din-api-nyckel" mot den du fick från Google Cloud Console

---

### Starta
För att köra applikationen lokalt på din maskin, följ dessa steg:

#### Starta backend

1. Navigera till backend-mappen 
```bash
cd Backend
```
2. Installera beroenden
```bash
dotnet restore
```
3. Starta applikationen 
```bash
dotnet run
```
Backend-applikationen kommer nu att vara tillgänglig på http://localhost:5231


#### Starta frontend

1. Navigera till frontend-mappen
```bash
cd Frontend
```

2. Installera beroenden 
```bash
npm install
```

3. Starta applikationen
```bash
npm run dev
```

Frontend-applikationen kommer nu att vara tillgänglig på http://localhost:5175

När både frontend och backend körs kan du navigera till http://localhost:5175 i din webbläsare för att testa applikationen. Om allt är korrekt uppsatt, bör du kunna logga in med ditt Google-konto, se din Google-kalender och få väderbaserade aktivitetsförslag.
