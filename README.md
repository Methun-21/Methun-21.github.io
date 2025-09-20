# Task Flow ✨

## Modern Task Management Application

Task Flow is a sleek and intuitive task management application designed to boost your productivity. It provides a clean interface for organizing your daily tasks, tracking your progress, and staying focused on what matters most. Built with modern web technologies, Task Flow offers a responsive and engaging user experience.

## Features

-   **Task Creation:** Easily add new tasks with titles and descriptions.
-   **Task Management:** Mark tasks as complete, delete tasks, and edit existing tasks.
-   **Progress Tracking:** Visualize your progress with a dynamic progress circle and detailed statistics on completed and total tasks.
-   **Task Filtering:** View tasks filtered by "Today", "Completed", or "All Tasks".
-   **Persistent Storage:** Tasks are saved locally in your browser, so your data persists across sessions.
-   **Responsive Design:** Optimized for various screen sizes, from desktop to mobile.
-   **Modern UI:** Built with Shadcn UI and Tailwind CSS for a beautiful and accessible user interface.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool that provides an instant development server.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
-   **Shadcn UI:** A collection of re-usable components built with Radix UI and Tailwind CSS.
-   **React Router DOM:** For declarative routing in React applications.
-   **React Query (TanStack Query):** For data fetching, caching, and state management.
-   **ESLint:** For identifying and reporting on patterns found in JavaScript code.
-   **Local Storage:** For client-side data persistence.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/en/) (LTS version recommended)
-   npm (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd achievigo-tasks
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or bun install
    ```

### Running the Development Server

To start the development server and view the application in your browser:

```bash
npm run dev
# or yarn dev
# or bun dev
```

The application will typically be available at `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
npm run build
# or yarn build
# or bun build
```

This will create a `dist` directory with the production-ready files.

## Project Structure

```
achievigo-tasks/
├── public/                 # Static assets (e.g., logo.svg, robots.txt)
├── src/
│   ├── App.jsx             # Main application component, sets up routing
│   ├── main.jsx            # Entry point for the React application
│   ├── index.css           # Global styles
│   ├── pages/              # Top-level page components
│   │   ├── Index.jsx       # Main dashboard page
│   │   └── NotFound.jsx    # 404 error page
│   ├── components/         # Reusable UI components
│   │   ├── TaskManager.jsx # Core task management logic and UI
│   │   ├── Navigation.jsx  # Navigation links/filters
│   │   ├── AddTaskForm.jsx # Form for adding new tasks
│   │   ├── TaskItem.jsx    # Individual task display
│   │   ├── ProgressTracker.jsx # Displays task progress and statistics
│   │   └── ui/             # Shadcn UI components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── .gitignore
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite build tool configuration
└── ...other config files
```

## Usage

-   **Add Tasks:** Use the "Add Task" form to create new tasks.
-   **Filter Tasks:** Use the navigation buttons ("Today", "Completed", "All Tasks") to filter your task list.
-   **Mark Complete:** Click the checkbox next to a task to mark it as complete or incomplete.
-   **Edit/Delete:** Each task item provides options to edit its details or delete it.
-   **Progress Overview:** The sidebar displays your overall progress and task statistics.

## Linting

To run the linter and check for code quality issues:

```bash
npm run lint
# or yarn lint
# or bun lint
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.