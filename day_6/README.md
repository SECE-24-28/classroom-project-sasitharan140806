# Day 6: React + Vite - Mobile Recharge App

## Setup Instructions

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## Core React Concepts (Notes)

### JSX
JSX is a syntax extension for JavaScript that looks like HTML but allows you to write markup inside JavaScript files. It gets transpiled to `React.createElement()` calls. JSX makes component structure more readable and intuitive. You can embed JavaScript expressions inside curly braces `{}`. JSX elements must have one parent wrapper (or use fragments `<>`).

### Virtual DOM
The Virtual DOM is an in-memory representation of the real DOM. React uses it to optimize rendering by comparing the new virtual tree with the previous one (diffing). Only the changed elements are updated in the actual DOM, improving performance. This reconciliation process makes React apps fast and efficient. Virtual DOM enables declarative UI updates without manual DOM manipulation.

### Functional Components
Functional components are JavaScript functions that return JSX. They are the modern, recommended way to write React components. They can accept props as parameters and use hooks like `useState` and `useEffect` for state and lifecycle. Functional components are simpler, easier to test, and more performant than class components. They promote cleaner, more modular code architecture.

### Props & State
Props (properties) are read-only data passed from parent to child components, enabling component reusability and communication. State is mutable data managed within a component using hooks like `useState`. Props flow downward (unidirectional data flow), while state is local to the component. Changes to state trigger re-renders, updating the UI reactively. Together, props and state enable dynamic, interactive applications.

### Component Hierarchy
Component hierarchy refers to the parent-child relationship structure in React applications. Parent components can render child components and pass data via props. This creates a tree-like structure where data flows from top to bottom. Proper hierarchy design promotes reusability, separation of concerns, and maintainability. Breaking UI into smaller components makes the codebase scalable and easier to debug.

### Folder Structuring
Organizing code into logical folders (like `components/`, `pages/`, `utils/`, `assets/`) improves maintainability and scalability. The `src/components/` folder typically holds reusable UI components. Grouping related files together (component + styles + tests) is a common pattern. Clear structure helps teams collaborate effectively and locate code quickly. Good folder organization follows separation of concerns and single responsibility principles.

## Project Structure

```
day_6/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Components Created

- **Navbar.jsx**: Reusable navigation bar with logo and menu links
- **Footer.jsx**: Reusable footer with copyright and links
- **Sidebar.jsx**: Reusable sidebar for navigation or quick actions

All components are functional components that accept props and can be reused across multiple pages.
