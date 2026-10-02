# MeetingAi

MeetingAi är en AI-driven mötesassistent som hjälper dig att:

- **Skapa mötesinbjudningar** – fyll i titel, datum, längd och en kort beskrivning, så skriver AI:n en professionell inbjudningstext.
- **Skapa agendor** – ange vad mötet ska handla om och få tillbaka en strukturerad agenda med punkter.
- **Sammanfatta möten** – klistra in dina mötesanteckningar och få en sammanfattning, en titel och en lista över deltagarna som nämns.

Fält som lämnas tomma fylls i av AI:n med rimliga värden baserat på sammanhanget.

Projektet består av en **React-frontend** (Vite) och en **ASP.NET Core Web API-backend** som pratar med **Google Gemini**.

---

## Teknikstack

| Del | Teknik |
|---|---|
| Frontend | React 19, React Router 7, Vite 8, CSS Modules |
| Backend | ASP.NET Core Web API (.NET 10), Swagger/Swashbuckle |
| AI | Google Gemini via `Google.GenAI` (modell: `gemini-3.5-flash`) |

---

## Projektstruktur

```
MeetingAi/
├── MeetingAi/                      # Frontend (React + Vite)
│   └── src/
│       ├── api/prompts.js          # Anrop till backend (createAgenda, createInvite, createSummary)
│       ├── components/
│       │   ├── forms/              # AgendaForm, InviteForm, SummarizeForm
│       │   ├── results/            # Popup-vyer som visar AI-svaret
│       │   └── navButtons/         # Navigeringsmeny
│       ├── pages/                  # HomePage, InvitePage, AgendaPage, SumPage
│       └── route/Router.jsx        # Routes: /, /invite, /agenda, /sum
│
└── MeetingAi_Backend/              # Backend (ASP.NET Core)
    └── MeetingAi_Backend/
        ├── Controllers/AiController.cs   # Endpoints /agenda, /invite, /summarize
        ├── Services/
        │   ├── AiService.cs              # Skickar prompts till Gemini
        │   └── PromptLoader.cs           # Läser prompts från JSON
        ├── DTOs/                         # Svarsmodeller för respektive endpoint
        └── Prompts/MeetingPrompts.json   # System- och uppgiftsprompts
```

---

## Kom igång

### Förutsättningar

- [Node.js](https://nodejs.org/) (LTS)
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- En API-nyckel till Google Gemini – skapa en i [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Starta backend

Backend läser API-nyckeln från konfigurationsvärdet `GEMINI_API_KEY`. Det enklaste sättet att sätta den lokalt utan att råka checka in den är med User Secrets:

```bash
cd MeetingAi_Backend/MeetingAi_Backend
dotnet user-secrets init
dotnet user-secrets set "GEMINI_API_KEY" "din-api-nyckel"
```

> Alternativt kan du ersätta `API_KEY_HERE` i `Properties/launchSettings.json` (profilen `https`) eller sätta en miljövariabel med samma namn. Checka aldrig in en riktig nyckel.

Starta sedan API:t med **https**-profilen (frontend anropar `https://localhost:7248`):

```bash
dotnet dev-certs https --trust   # första gången, för att lita på utvecklingscertifikatet
dotnet run --launch-profile https
```

API:t körs nu på `https://localhost:7248` och Swagger UI finns på `https://localhost:7248/swagger`.

### 2. Starta frontend

```bash
cd MeetingAi
npm install
npm run dev
```

Öppna `http://localhost:5173` i webbläsaren.

> Backend tillåter via CORS endast anrop från `http://localhost:5173`. Kör du frontend på en annan port behöver du uppdatera CORS-policyn i `Program.cs`.

---

## API

Alla endpoints tar emot samma request-body:

```json
{ "userPrompt": "Text som beskriver mötet eller mötesanteckningarna" }
```

| Metod | Endpoint | Beskrivning | Svar |
|---|---|---|---|
| `POST` | `/agenda` | Skapar en mötesagenda | `{ "title", "date", "duration", "agendaPoints": [] }` |
| `POST` | `/invite` | Skapar en mötesinbjudan | `{ "title", "date", "duration", "text" }` |
| `POST` | `/summarize` | Sammanfattar mötesanteckningar | `{ "title", "summerize", "participants": [] }` |

Exempel:

```bash
curl -k -X POST https://localhost:7248/agenda \
  -H "Content-Type: application/json" \
  -d '{"userPrompt": "Titel: Sprintplanering\nLängd: 60 minuter\nAgenda: gå igenom backlog och fördela uppgifter"}'
```

Om texten inte handlar om möten är AI:n instruerad att svara med ett tomt objekt `{}`.

---

## Prompts

Alla instruktioner till AI:n ligger i `MeetingAi_Backend/MeetingAi_Backend/Prompts/MeetingPrompts.json`:

| Nyckel | Används till |
|---|---|
| `system` | Systemprompt – begränsar AI:n till mötesrelaterade uppgifter och kräver ren JSON som svar |
| `agenda` | Instruktioner och JSON-format för agendor |
| `invite` | Instruktioner och JSON-format för inbjudningar |
| `sum` | Instruktioner och JSON-format för sammanfattningar |

Vill du ändra hur AI:n svarar räcker det oftast att redigera den här filen. Om du ändrar JSON-strukturen i en prompt måste motsvarande DTO i `DTOs/` och resultatkomponenten i frontend uppdateras också.

---

## Kända begränsningar

- **Filnamnets skiftläge:** `PromptLoader` läser `Prompts/meetingPrompts.json` medan filen heter `MeetingPrompts.json`. Det fungerar på Windows men inte på macOS/Linux (skiftlägeskänsliga filsystem) – byt namn på filen eller ändra sökvägen i koden om du kör där.
- **Arbetskatalog:** prompt-filen läses relativt till aktuell katalog, så starta backend från projektmappen (`MeetingAi_Backend/MeetingAi_Backend`).
- **Felhantering:** om Gemini svarar med något som inte är giltig JSON (t.ex. inslaget i ett markdown-kodblock) kastar backend ett undantag och frontend visar ett felmeddelande.
- **Hårdkodad API-adress:** frontendens backend-URL är satt i `src/api/prompts.js` (`API_URL`).

---

## Skript (frontend)

| Kommando | Beskrivning |
|---|---|
| `npm run dev` | Startar utvecklingsservern |
| `npm run build` | Bygger en produktionsversion till `dist/` |
| `npm run preview` | Förhandsgranskar produktionsbygget |
| `npm run lint` | Kör ESLint |
