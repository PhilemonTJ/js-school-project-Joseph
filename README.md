# 🕒 Timeline App

## 🚀 Project Goal

The Timeline App is a multi-stage web development project aimed at building an interactive, accessible, and visually structured application to showcase chronological events. This app will evolve from a semantic HTML skeleton into a fully interactive, accessible React-based single-page application.

---

## ✅ Task 1: HTML (Semantic Skeleton)

### 🎯 Outcome

Create a semantic and accessible static skeleton for the timeline app using HTML.

### 🔨 Deliverables

- Semantic HTML structure using:
  - `<header>`, `<nav>`, `<main>`, `<section id="timeline">`, `<article>`, `<figure>`
- **Header** includes:
  - Project logo (`TimelineApp`)
  - A placeholder theme toggle control (🌙)
- **Nav**: Placeholder for future filters.
- **Main/Timeline Section**: Contains article placeholders for timeline event entries.
- **Modal Placeholder**: Empty `<div id="modal">` reserved for future pop-ups.
- **Accessibility**:
  - Proper landmark roles (`role="dialog"`, `aria-hidden`, etc.)
  - `alt` text on placeholder images
  - Logical content structure using semantic elements

---

## ✅ Task 2: CSS (Responsive Layout) – Completed

### 🎯 Outcome

A responsive, visually structured layout using Flexbox and CSS Grid. Styled according to design reference.

### 🔨 Deliverables

- **Color Palette**: Dark blue header/footer, white/light card backgrounds
- **Header**: Flex layout with logo/title on the left and theme toggle on the right
- **Filter Bar**: Pill-shaped dropdown selectors with spacing
- **Timeline Grid**: 
  - Responsive card layout (1–3 columns depending on screen size)
  - Event cards with images, headings, date text, and descriptions
- **Footer**: Copyright, License Info.
- **Responsiveness**: Breakpoints at 768px and 1024px
- **Variables**: CSS variables for colors and themes for easy dark mode support later

---
## ✅ Task 3: JavaScript (Dynamic Rendering & Interactivity) – Completed

### 🎯 Outcome

The timeline is now fully interactive: events are loaded from a JSON file, rendered dynamically as cards, and detailed information is shown in a modal popup when an event is clicked.

### 🔨 Deliverables

- **Data Source**:  
  - `events.json` in the project root contains at least 8 events, each with `year`, `title`, `description`, `imageURL`, and `category`.

- **Dynamic Rendering**:
  - `script.js` fetches and parses `events.json` asynchronously.
  - The `#timeline` section is populated with event cards generated in JavaScript, each displaying the event’s image, title, year, and a short description.

- **Interactivity**:
  - Clicking an event card opens a modal (`#modal`) with full event details, including image, year, title, category, and description.
  - Modal can be closed via a close button or by clicking outside the modal content.
  - Accessibility features: modal uses `role="dialog"`, `aria-hidden`, and focus management for keyboard navigation.

- **Code Placement**:
  - All JavaScript logic is in `script.js`.
  - The script is loaded at the end of `<body>` in `index.html` for optimal performance.

**Result:**  
Timeline events are now loaded dynamically and displayed as interactive cards. Users can view detailed event information in an accessible

---

 ## ✅ Task 4: TypeScript (Static Typing & Modular Code) – Completed

### 🎯 Outcome

Introduce static typing, modular structure, and a TypeScript build process to improve code maintainability and scalability.

### 🔨 Deliverables

#### **Setup**
- Initialize TypeScript with `tsconfig.json` set to **strict** mode.
- Organize source files under a new `src/` directory.

#### **Code Conversion**
- Convert `script.js` → `src/index.ts`.
- Define interfaces/types for event data structure (`Event`, `Category`, etc.).
- Use ES modules by separating logic into:
  - **`fetcher.ts`** – Responsible for loading event data.
  - **`renderer.ts`** – Handles DOM creation for event cards.
  - **`modal.ts`** – Manages modal open/close logic.

#### **Build Process**
- Add build scripts to `package.json` using:
  - `tsc` (TypeScript compiler) **or**
  - A bundler (e.g., **Vite**, **Webpack**, **Parcel**).
- Output compiled JS files into a `dist/` folder.

#### **Verification**
- Test the compiled app in the browser to ensure functionality matches the JavaScript version.

### ✅ Result
The project is now **type-safe**, **modular**, and ready for scaling into a **React application**.


---
## ✅ Task 5: React (Component-Based Architecture) – Completed

### 🎯 Outcome

Migrate the Timeline App to a modern React single-page application (SPA) with reusable components, state management, and improved developer experience.

### 🔨 Deliverables

- **Project Setup**:
  - Initialize a new React project using [Vite](https://vitejs.dev/) or [Create React App](https://create-react-app.dev/).
  - Organize source files under `src/` with clear separation of components, assets, and styles.

- **Component Structure**:
  - **App**: Root component managing global state and layout.
  - **Header**: Logo, theme toggle, and navigation.
  - **FilterBar**: Dropdowns or pills for filtering events by category/year.
  - **Timeline**: Renders a grid/list of `EventCard` components.
  - **EventCard**: Displays summary info for each event.
  - **Modal**: Shows detailed event info when an event is selected.
  - **Footer**: Copyright.

- **Data Handling**:
  - Load events from a local JSON file or via fetch.
  - Use React state/hooks for managing events, filters, and modal visibility.

- **Interactivity & Accessibility**:
  - Clicking an event card opens the modal with full details.
  - Modal supports keyboard navigation and ARIA roles.
  - Filters update the timeline in real time.

- **Styling**:
  - Reuse and adapt existing CSS, or use CSS Modules or styled-components for scoped styles.
  - Maintain responsiveness and dark mode support.

- **Build & Test**:
  - Ensure the app builds and runs locally.
  - Test all interactive features and accessibility.

**Result:**  
The Timeline App is now a modular, maintainable React SPA with reusable components, dynamic rendering,

---

## 📅 Roadmap

| Task # | Stage | Outcome |
|--------|-------|---------|
| ✅ 1    | **HTML** | Semantic, accessible skeleton |
| ✅ 2    | **CSS** | Responsive static layout with Flexbox/Grid |
| ✅ 3    | **JavaScript** | DOM interaction, events, dynamic timeline |
| ✅ 4    | **TypeScript** | Strongly typed version of logic and models |
| ✅ 5    | **React** | Component-based architecture with dynamic rendering |
| ⏳ 6    | **Accessibility** | Audit and improvements for full usability |

---

## 📁 Project Structure (Current)
```
js-school-project-Joseph/
├── index.html          # Semantic HTML layout (Task 1)
├── styles.css          # Responsive styling (Task 2)
├── script.js           # Vanilla JavaScript logic for dynamic timeline (Task 3)
├── data/               # JSON dataset for events (Task 3)
├── src/                # Source TypeScript files (Task 4)
├── tsconfig.json       # TypeScript configuration in strict mode (Task 4)
├── package.json        # Project metadata and scripts
├── package-lock.json   # Locked dependency tree
├── build.js            # Build script (perhaps for bundling/compiling TS)
└── README.md           # Project overview, roadmap, and task status
```

---

## 🧑‍💻 Tech Stack (Planned)

- **HTML5** – Semantic structure ✔️
- **CSS3 (Flexbox/Grid)** – Responsive layout ✔️
- **JavaScript (ES6+)** – Interactivity ✔️
- **TypeScript** – Strong typing and tooling ✔️
- **React + Vite** – SPA with reusable components ✔️
- **ARIA & WCAG Guidelines** – Accessibility compliance

---

## 📌 Status

**Current Task:** ✅ Task 5 – React migration.

Next: **Task 6 – Accessibility audit and improvements.**

---

## 📝 Author

Developed as part of the school project submission: `js-school-project-Joseph`

> ✨ Stay tuned for updates in future branches!
