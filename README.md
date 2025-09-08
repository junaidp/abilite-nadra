# Abilite Application (Test Cloud)

Welcome to the **Abilite Application**, a React.js project powered by Vite.js. This application leverages a variety of powerful packages and tools to create a modern and feature-rich experience. This README provides an overview of the project structure, dependencies, and steps to run and build the application.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Previewing the Application](#previewing-the-application)
- [Project Structure](#project-structure)
- [Session Management](#session-management)
- [Dependencies](#dependencies)

---

## Requirements

To run this application, you need the following:

1. **Node.js**: Version 20.0.0 or higher
2. **npm**: Version 10.0.0 or higher (comes with Node.js)

---

## Installation

Follow these steps to set up the project:

1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Application

To start the application in development mode:

```bash
npm run dev
```

This will start a local development server, and you can access the application at `http://localhost:5173`.

---

## Building the Application

To build the application for production:

```bash
npm run build
```

This command creates an optimized version of the application in the `dist` folder.

---

## Previewing the Application

After building, you can preview the production build using:

```bash
npm run preview
```

This will start a local server to serve the built application.

---

## Project Structure

Here is the folder structure of the project:

```
abilite/
├── public/          # Public assets (e.g., images)
├── src/             # Application source code
│   ├── assets/      # Images and static assets
│   ├── components/  # Reusable components
│   ├── config/      # Configuration files
│   │   ├── constants.js  # Constant values used across the app
│   │   └── helper.js    # Utility/helper functions
│   ├── font/        # Fonts used in the app
│   ├── global-redux/ # Redux store and slices
│   ├── pages/       # Page components
│   ├── App.css      # App-wide styles
│   ├── App.jsx      # Main application component
│   ├── index.css    # Global styles
│   └── main.jsx     # Application entry point
├── .gitignore       # Files to ignore in Git
├── index.html       # Main HTML file
├── package.json     # Project configuration
├── package-lock.json# Dependency lock file
├── README.md        # This file
└── vite.config.js   # Vite configuration
```

---

## Session Management

To ensure security and a smooth user experience, the application implements a robust session management system. A user's session can be removed under the following conditions:

1. **User Logs Out:** When the user manually logs out, their session is removed.
2. **Inactivity for 4 Minutes:** If the user remains inactive for 4 minutes, their session will automatically be removed. This is handled using the `react-idle-timer` library with the following configuration:
   ```javascript
   useIdleTimer({
     onIdle,               // Callback function triggered when user is idle
     timeout: 240000,      // 4 minutes in milliseconds
     throttle: 500,        // Frequency to check user activity in milliseconds
   });
   ```
   - **`timeout`:** This defines the duration of inactivity (in milliseconds) after which the user is considered idle. In our case, it’s set to 4 minutes.
   - **`throttle`:** This determines how often the application checks for user activity. A lower value results in more frequent checks.
3. **Session Duration of 8 Hours:** Sessions are designed to automatically expire after 8 hours. This is because the authentication token used to maintain the session expires after this duration. Once expired, the session will be removed.

**Note:** In all these scenarios, the application ensures the user's session is securely removed, and they are redirected to the login page.

---

## Dependencies

The application uses the following dependencies:

1. **@fortawesome/free-solid-svg-icons**: A collection of free Font Awesome icons for use in the application.
2. **@fortawesome/react-fontawesome**: React components for using Font Awesome icons.
3. **@mui/material**: Material-UI library for building accessible and customizable components.
4. **@react-pdf/renderer**: A library to generate PDF documents in React applications.
5. **@reduxjs/toolkit**: Simplified state management for React applications.
6. **axios**: A promise-based HTTP client for making API requests.
7. **bootstrap**: A popular CSS framework for responsive and modern web design.
8. **bootstrap-icons**: Icon library designed for Bootstrap but usable anywhere.
9. **font-awesome**: Another icon library with a wide range of icons for UI design.
10. **formik**: Form handling and validation in React applications.
11. **jodit-react**: A React wrapper for the Jodit WYSIWYG editor.
12. **jwt-decode**: A library to decode JSON Web Tokens (JWTs).
13. **moment**: A library for parsing, validating, and formatting dates.
14. **react**: Core library for building user interfaces in JavaScript.
15. **react-detect-click-outside**: A library to handle click-outside events in React components.
16. **react-dom**: DOM-specific methods for React.
17. **react-idle-timer**: Tracks user inactivity and triggers actions based on it.
18. **react-pdf-html**: Generate PDFs from HTML content in React.
19. **react-redux**: Official bindings for using Redux with React.
20. **react-router-dom**: Routing library for React to handle navigation and routing.
21. **react-toastify**: Add customizable toast notifications to React applications.
22. **recharts**: A chart library built with React and D3.
23. **uuid**: Generates unique IDs for use in the application.
24. **yup**: Schema validation library for form inputs.
```