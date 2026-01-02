# BookHive 📚

BookHive is a full-stack web application for digital book clubs. It allows users to discover books, create and join book clubs, manage memberships, and participate in discussions linked to specific books.

## Live Demo

https://book-hive-navy.vercel.app/

---

### Tech Stack – Summary

- **Next.js (with TypeScript)**  
  The main framework used for building the application. Next.js is built on React and provides features such as file-based routing and server-side rendering. TypeScript is used together with Next.js to add type safety, reduce bugs and make the code easier to maintain.

- **Supabase (database and authentication)**  
  Supabase is used as both the database and the authentication system. It stores all application data such as users, clubs, clubmembers and posts, and also handles login, registration and security rules so that only authorised users can access protected data.

- **MUI (Material UI component library)**  
  MUI is used to build the user interface. It provides ready-made, responsive and accessible components like buttons, cards, forms and layouts. This helps keep the design consistent and speeds up development.

- **Zustand (global state management)**  
  Zustand is used to manage global state in the application, mainly the list of favourite books. This allows favourite books to be accessed and displayed across multiple pages and used when creating posts.

- **Open Library API (book data)**  
  The application uses the Open Library API to fetch book information such as titles, authors and cover images. The API is free to use and does not require an API key.

- **Vercel (deployment)**  
  The application is deployed on Vercel. Vercel has great support for Next.js and automatically builds and hosts the application, making it easy to publish and update the project.

---

## Getting Started

### Installation ⚙️

1. Clone the repository:

   ```bash
   git clone https://github.com/Rebecka94/BookHive.git
   ```

2. Clone the repository:

   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a .env.local file in the project root and add required environment variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   ```
4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open the application in your browser:

   ```bash
   http://localhost:3000
   ```

### Build for production 🛠️
   ```bash
   npm run build
   npm run start
   ```
---

# Project Overview

#### - BookHive focuses on:

- Helping users discover books through search and browsing.

- Enabling users to register and log in securely.

- Allowing users to create and join book clubs.

- Managing memberships within clubs.

- Creating discussion topics and posts related to specific books.

- Providing an accessible, responsive interface that works on both mobile and desktop.


## Features and Implementation

#### 1. Authentication and User Management

- Authentication is implemented using **Supabase Auth**.
- Authentication logic is fully integrated with **Next.js pages, components, and server-side functionality**.
- Users can:
  - Register an account
  - Log in and out
  - Maintain an active session
- Protected routes ensure that only authenticated users can access certain parts of the application.
- **Row-Level Security (RLS)** and **custom Supabase policies** are configured to ensure:
  - Users can only access their own data
  - Only members of a book club can view or interact with restricted club content
  - Unauthorized users cannot read or modify protected records

#### 2. Book Clubs and Memberships

- Each book club contains basic information about the club.
- Any user can create a book club and automatically becomes the admin of that club.
- Each book club can have multiple discussion posts.
- Each post can optionally be connected to a specific book.
- Users can create posts within book clubs they are members or admins of.
- Users can request membership in existing book clubs.
- Admins of a book club can see a list of members and remove members from the club.
- Members can choose to leave a book club at any time.

#### 3. Topics and Posts

- A topic can optionally be linked to a specific book.
- Users and admins can create posts inside book clubs they are members of.
- All members of a book club can read all posts in that club.
- Users can update and delete their own posts.

#### 4. Books (Open Library API)

- Book data is fetched from the Open Library API.
- Users can search for books and view basic information such as title, author and cover image.
- Books can be linked to discussion topics inside a book club.
- No API key is required to use the Open Library API.

#### 5. Global State Management

- Global state in the application is handled using Zustand.
- Favourite books can be displayed across different pages in the application.
- When creating a topic, users can choose from their favourite books.

#### 6. UI and Styling (MUI)

- The user interface is built using MUI (Material UI).
- MUI provides ready-made and accessible components such as buttons, forms and navigation elements.
- The layout is responsive and works on both mobile and desktop.
- A consistent design is achieved through the MUI theming system.
- Using MUI helped reduce development time, since many components did not need to be built from scratch.


---

## Checklista för betygskriterier

Nedan finns en checklista över kraven för **G** (Godkänt) och **VG** (Väl godkänd) i examensarbetet.  
Markera det du har uppfyllt med `[X]` och det som nästan är uppfyllt med `[-]`.

### (G) Krav

#### 1. Planering och research
- [X] Utföra en noggrann målgruppsanalys.
- [X] Använt ett projekthanteringsverktyg: Jira

#### 2. Design och prototyping
- [X] Skapa wireframes och prototyp i Figma som följer UX/UI-principer.
- [X] Se till att designen är responsiv för minst två skärmstorlekar.
- [X] Följt WCAG 2.1-standarder i designen.

#### 3. Applikationsutveckling
- [X] Utvecklat applikationen med ett modernt JavaScript-ramverk: NextJS
- [X] Använt en databas för lagring och hämtning av data: Supabase
- [X] Implementerat state-hantering samt dynamiska, interaktiva komponenter.
- [X] Följt WCAG 2.1-standarder och använt semantisk HTML.
- [X] Webbappen är responsiv och fungerar korrekt på minst två skärmstorlekar.
- [X] Gränssnittet anpassar sig för en användarvänlig upplevelse både på små och stora skärmar.
- README-filen innehåller:
  - [X] Information om hur projektet körs.
  - [X] Publik länk till den deployade applikationen.
  - [X] Checklista över betygskriterier som är uppfyllda.

#### 4. Versionshantering
- [X] Använt Git för versionshantering.
- [X] Hostat projektet i ett GitHub-repo.

#### 5. Slutrapport (2–3 sidor)
- [X] Innehåller abstract på engelska.
- [X] Beskriver tech stack och motiverar valen.
- [X] Dokumenterar arbetsprocess, planering och research.

#### 6. Deploy
- [X] Projektet är hostat och publikt tillgängligt: Vercel

#### 7. Helhetsupplevelse (G)
- [X] Applikationen är fri från större tekniska fel (inga döda länkar, inga kraschande sidor).
- [X] Designen är konsekvent.
- [X] Navigeringen fungerar smidigt genom hela applikationen.


### (VG) Krav

#### 1. Design och prototyping
- [X] Prototypen innehåller interaktivitet som visar hur användaren interagerar med produkten.
- [X] Prototypen ligger väldigt nära den färdiga produkten.
- [X] Designen följer WCAG 2.1 nivå A och AA utan undantag.

#### 2. Applikationsutveckling
- [X] En state management-lösning används för global state: Zustand
- [-] Koden följer WCAG 2.1 nivå A och AA utan undantag.
- [X] Testad i WebAIM WAVE utan fel eller varningar.
- [X] Produkten är optimerad (t.ex. rimliga filstorlekar, återanvända komponenter, prestandaoptimeringar där det behövs).
- [X] CRUD (Create, Read, Update, Delete) är fullt implementerat med säker hantering av användardata.
- [X] En säker autentiseringslösning för databasen är implementerad: Supabase Auth med e-post och OAuth.
- [X] Endast behöriga användare kan komma åt och hantera skyddad data.
- [X] För webbapp: Produkten är fullt responsiv och anpassar sig dynamiskt till olika skärmstorlekar och enheter (från mobil till större skärmar).

#### 3. README
- README beskriver inte bara projektet och hur det körs, utan:
  - [X] Förklarar de tekniska valen.
  - [X] Beskriver hur centrala funktioner är implementerade.

#### 4. Versionshantering
- [X] Arbetat med feature branches.
- [X] Skapat pull requests innan merge till huvudbranchen.
- [X] Commit-meddelanden är tydliga, informativa och dokumenterar varje steg.

#### 5. Deploy
- [X] Automatiserat flöde för build och deploy:
  - [X] Byggprocessen triggar automatiskt deploy till produktion.
  - [X] Inga manuella steg krävs för att publicera nya versioner.

#### 6. Slutrapport (3–6 sidor)
- [X] Innehåller en fördjupad analys av hela arbetsprocessen.
- [X] Reflekterar över tekniska och designmässiga utmaningar och hur de löstes.
- [X] Beskriver vilka verktyg och tekniker som använts och varför de valts framför alternativ.
- [X] Förklarar och motiverar UX/UI- och tillgänglighetsbeslut samt hur de förbättrat användarupplevelsen.

#### 7. Helhetsupplevelse (VG)
- [X] Applikationen erbjuder en professionell och optimerad användarupplevelse.
- [X] Laddningstider är minimerade.
- [X] Appen ger tydlig återkoppling vid alla användarinteraktioner.
- [X] Applikationen är testad för enhetlig funktion och design på flera enheter och webbläsare.

