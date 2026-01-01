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

## Grading Criteria Checklist

Below is a checklist of the **G** (Pass) and **VG** (Pass with Distinction) requirements for the thesis project.  
Mark the items you have fulfilled with `[x]` and almost fulfilled with `[-]`.

### (G) Requirements

#### 1. Planning and Research
- [X] Performed a thorough target group analysis.
- [X] Used a project management tool: Jira

#### 2. Design and Prototyping
- [X] Created wireframes and a prototype in Figma following UX/UI principles.
- [X] Ensured the design is responsive for at least two screen sizes.
- [X] Followed WCAG 2.1 standards in the design.

#### 3. Application Development
- [X] Developed the application using a modern JavaScript framework: NextJS
- [X] Used a database to store and retrieve data: Supabase
- [X] Implemented state management and dynamic, interactive components.
- [X] Followed WCAG 2.1 standards and used semantic HTML.
- [X] Web app is responsive and works correctly on at least two screen sizes
- [X] The interface adapts for a user-friendly experience on both small and large screens.
- README file includes:
  - [X] Information on how to run the project.
  - [X] Public link to the deployed app.
  - [X] Checklist of grading criteria that are fulfilled.

#### 4. Version Control
- [X] Used Git for version control.
- [X] Hosted the project in a GitHub repository.

#### 5. Final Report (2–3 pages)
- [X] Includes an abstract in English.
- [X] Describes the tech stack and motivates the choices.
- [X] Documents the work process, planning and research.

#### 6. Deploy
- [X] The project is hosted and publicly accessible: Vercel

#### 7. Overall Experience (G)
- [X] The application is free from major technical errors (no dead links, no crashing pages).
- [X] The design is consistent.
- [X] Navigation works smoothly through the entire application.


### (VG) Requirements

#### 1. Design and Prototyping
- [X] The prototype includes interactivity that demonstrates how users interact with the product.
- [X] The prototype is very close to the final product.
- [X] The design follows WCAG 2.1 level A and AA without exceptions.

#### 2. Application Development
- [X] A state management solution is used for global state: Zustand
- [-] The code follows WCAG 2.1 level A and AA without exceptions.
  - [-] Tested in WebAIM WAVE with no errors or warnings.
- [X] The product is optimized (e.g. reasonable file sizes, reused components, performance optimizations where needed).
- [X] CRUD (Create, Read, Update, Delete) is fully implemented with secure handling of user data.
- [X] A secure authentication solution is implemented for the database: Supabase Auth with email and oauth.
- [X] Only authorised users can access and manage protected data.
- [X] For web app: the product is fully responsive and adapts dynamically to various screen sizes and devices (from mobile to large screens).

#### 3. README
- README not only describes the project and how to run it, but also:
  - [X] Explains the technical choices.
  - [X] Describes how key features are implemented.

#### 4. Version Control
- [X] Worked with feature branches.
- [X] Created pull requests before merging into the main codebase.
- [X] Commit messages are clear, informative and document each step.

#### 5. Deploy
- [X] Automated flow for build and deploy:
  - [X] The build process automatically triggers deployment to production.
  - [X] No manual steps are required for publishing new versions.

#### 6. Final Report (3–6 pages)
- [X] Includes a deep analysis of the full work process.
- [X] Reflects on technical and design challenges and how they were solved.
- [X] Describes which tools and technologies were used and why they were chosen over alternatives.
- [X] Explains and motivates UX/UI and accessibility decisions and how they improved the user experience.

#### 7. Overall Experience (VG)
- [X] The application offers a professional and optimized user experience.
- [X] Loading times are minimized.
- [X] The app gives clear feedback on all user interactions.
- [X] The application has been tested for consistent function and design on multiple devices and browsers.
