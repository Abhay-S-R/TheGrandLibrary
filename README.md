# The Grand Library Inventory System 📚

A "Cozy Library" themed inventory management application built with **React**, **Vite**, and **Tailwind CSS**. This application uses a Stack data structure logic (LIFO) for managing book stocks and sales.

## ✨ Features

- **Genre Management**: Organize books into stacks for Fiction, Non-Fiction, Adventure, Children's, Romance, and Crime.
- **Stack Operations**:
  - **Restock**: Push new books onto the stack (with real-time cover fetching).
  - **Sell**: Pop books from the stack (Last-In-First-Out).
- **Real-Time Logs**:
  - **Transaction Log**: Tracks every sale and restock event.
  - **Error Log**: Dynamically tracks low stock warnings. Alerts appear when stock < 5 and automatically resolve when restocked.
- **Persistence**: Uses `localStorage` to save your inventory, transaction history, and error logs across page reloads.
- **Visuals**:
  - "Cozy Library" aesthetic with Parchment, Oak, and Crimson color palette.
  - Infinite scroll inventory display.
  - Responsive design with rounded UI elements and hover effects.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **Data**: Open Library Covers API (for book images)

## 🚀 Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start the development server**:

    ```bash
    npm run dev
    ```

3.  **Open the app**:
    Navigate to `http://localhost:5173` in your browser.

## 📂 Project Structure

- `src/components`: UI components (Book, GenreStack, Controls, etc.)
- `src/data`: Initial inventory data and ISBN cover mappings.
- `src/App.jsx`: Main application logic and state management.
