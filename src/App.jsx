import { useState } from "react";
import { INITIAL_INVENTORY } from "./data/initialData";
import GenreStack from "./components/GenreStack";
import Controls from "./components/Controls";
import TransactionLog from "./components/TransactionLog";
import ErrorLog from "./components/ErrorLog";
import Footer from "./components/Footer";

import { BOOK_COVERS } from "./data/bookCovers";

function App() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [logs, setLogs] = useState([]);
  const [errorLogs, setErrorLogs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const generateNewBook = (genre) => {
    const id = Date.now();
    const titles = {
      Fiction: [
        "Sherlock Holmes",
        "The Great Gatsby",
        "Moby Dick",
        "Pride & Prejudice",
        "1984",
      ],
      "Non-Fiction": [
        "Sapiens",
        "Cosmos",
        "Thinking, Fast and Slow",
        "Silent Spring",
        "Educated",
      ],
      Adventure: [
        "Into Thin Air",
        "The Call of the Wild",
        "Treasure Island",
        "Life of Pi",
        "The Hobbit",
      ],
      "Children Story Books": [
        "Green Eggs and Ham",
        "Harry Potter",
        "The Giving Tree",
        "Goodnight Moon",
        "Corduroy",
      ],
      "Romance Drama": [
        "The Choice",
        "A Walk to Remember",
        "Twilight",
        "Bridgerton",
        "Safe Haven",
      ],
      "Crime Thriller": [
        "Sherlock Holmes",
        "The Silent Patient",
        "In Cold Blood",
        "The Snowman",
        "Dark Places",
      ],
    };
    const randomTitle =
      titles[genre][Math.floor(Math.random() * titles[genre].length)];

    // Use real cover if available, otherwise fallback to placeholder
    const cover =
      BOOK_COVERS[randomTitle] ||
      `https://placehold.co/150x220/333/FFF?text=${encodeURIComponent(
        randomTitle
      )}`;

    return {
      id,
      title: randomTitle,
      author: "Classic Author",
      price: (Math.random() * 15 + 10).toFixed(2) * 1,
      genre,
      cover,
    };
  };

  const handleRestock = (genre) => {
    const newBook = generateNewBook(genre);

    // Log Restock
    const newLog = {
      id: Date.now(),
      type: "restock",
      book: newBook,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [newLog, ...prev]);

    setInventory((prev) => {
      const updatedStack = [newBook, ...prev[genre]];
      const newCount = updatedStack.length;

      // Update Error Logs
      setErrorLogs((prevLogs) => {
        // If healthy, remove warning
        if (newCount >= 5) {
          return prevLogs.filter(
            (log) => !log.message.includes(`Low Stock Warning: ${genre}`)
          );
        }

        // If still low, update the number in the existing warning
        const existingLogIndex = prevLogs.findIndex((log) =>
          log.message.includes(`Low Stock Warning: ${genre}`)
        );

        if (existingLogIndex !== -1) {
          const updatedLogs = [...prevLogs];
          updatedLogs[existingLogIndex] = {
            ...updatedLogs[existingLogIndex],
            message: `Low Stock Warning: ${genre} (${newCount} remaining)`,
            timestamp: new Date().toLocaleTimeString(),
          };
          return updatedLogs;
        }

        return prevLogs;
      });

      return {
        ...prev,
        [genre]: updatedStack,
      };
    });
  };

  const handleSell = (genre) => {
    const currentStack = inventory[genre];
    if (currentStack.length === 0) return;

    const [soldBook] = currentStack;

    // Log Sale
    const newLog = {
      id: Date.now(),
      type: "sell",
      book: soldBook,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [newLog, ...prev]);

    // Update Inventory
    const newStack = currentStack.slice(1);

    // Check for Low Stock Error
    if (newStack.length < 5) {
      const errorMessage = `Low Stock Warning: ${genre} (${newStack.length} remaining)`;
      const timestamp = new Date().toLocaleTimeString();

      setErrorLogs((prev) => {
        // Check if a low stock warning for this genre already exists
        const existingLogIndex = prev.findIndex((log) =>
          log.message.includes(`Low Stock Warning: ${genre}`)
        );

        if (existingLogIndex !== -1) {
          // Update the existing log's message and timestamp
          const updatedLogs = [...prev];
          updatedLogs[existingLogIndex] = {
            ...updatedLogs[existingLogIndex],
            message: errorMessage,
            timestamp: timestamp,
          };
          return updatedLogs;
        } else {
          // Create new log if none exists
          return [
            {
              id: Date.now() + 1,
              message: errorMessage,
              timestamp: timestamp,
            },
            ...prev,
          ];
        }
      });
    }

    setInventory((prev) => ({
      ...prev,
      [genre]: newStack,
    }));
  };

  return (
    <div className="min-h-screen font-serif p-4 md:p-8 bg-parchment text-amber-950 flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
        {/* Header & Navigation */}
        <header className="mb-6 flex-shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-oak-dark drop-shadow-sm">
                The Grand <span className="text-crimson italic">Library</span>
              </h1>
              <p className="mt-2 font-medium text-oak italic">
                "A room without books is like a body without a soul."
              </p>
            </div>
          </div>

          {/* Genre Tabs */}
          <nav className="flex items-end gap-3 border-b-4 border-dark-brown pb-0 px-2 flex-wrap">
            {Object.keys(inventory).map((genre) => {
              const isActive = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`
                      relative px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2
                      ${
                        isActive
                          ? "bg-paper text-dark-brown border-dark-brown shadow-[2px_-2px_6px_rgba(0,0,0,0.1)] z-10 translate-y-[4px]"
                          : "bg-[#5d4037] text-[#e8d5b5] hover:bg-[#3e2723] hover:text-white mb-0.5 shadow-md hover:shadow-lg border-transparent"
                      }
                    `}
                  style={{
                    textShadow: isActive
                      ? "none"
                      : "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  {genre}
                  <span
                    className={`ml-3 text-xs px-2 py-0.5 rounded-full font-serif border ${
                      isActive
                        ? "bg-crimson/10 text-crimson border-crimson/20"
                        : "bg-black/30 text-amber-50 border-white/10"
                    }`}
                  >
                    {inventory[genre].length}
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Main Content Areas - Infinite Scroll Layout */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Inventory Area */}
          <div className="xl:col-span-3 bg-paper border-2 border-dark-brown rounded-3xl shadow-2xl flex flex-col relative min-h-[500px] overflow-hidden">
            {/* Decorative Binding */}
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-dark-brown/20 to-transparent z-0 border-l border-dark-brown/10"></div>

            {!selectedGenre ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 p-10">
                <div className="text-9xl mb-6 text-oak/30 grayscale">📖</div>
                <h2 className="text-3xl font-bold text-dark-brown">
                  Select a Component
                </h2>
                <p className="text-oak/70 text-lg mt-2 italic font-serif">
                  Choose a genre tab to open the collection.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full animate-fade-in relative z-10">
                <div className="flex-shrink-0 flex justify-between items-center p-6 border-b-2 border-dark-brown/10 bg-amber-50/30 sticky top-0 z-20 backdrop-blur-sm">
                  <div>
                    <h2 className="text-3xl font-bold text-dark-brown font-serif decoration-crimson underline underline-offset-4 decoration-2 tracking-wide">
                      {selectedGenre} Collection
                    </h2>
                  </div>
                  <div className="h-1 w-24 bg-crimson/20 rounded-full"></div>
                </div>

                {/* List Container - Infinite Scroll */}
                <div className="flex-1 p-0">
                  <GenreStack
                    genre={selectedGenre}
                    books={inventory[selectedGenre]}
                  />
                </div>

                {/* Controls */}
                <div className="flex-shrink-0 p-6 bg-parchment/30 border-t-2 border-dark-brown/20 backdrop-blur-sm">
                  <Controls
                    genre={selectedGenre}
                    onAdd={handleRestock}
                    onSell={handleSell}
                    disabledSell={inventory[selectedGenre].length === 0}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Log & Errors (Sticky) */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 flex flex-col gap-6 h-[calc(100vh-100px)]">
              {/* Activity Log - 60% height */}
              <div className="flex-1 bg-paper border-2 border-dark-brown rounded-lg shadow-xl overflow-hidden flex flex-col min-h-0">
                <TransactionLog logs={logs} />
              </div>

              {/* Error Log - 40% height */}
              <div className="h-[35%] bg-paper border-2 border-crimson rounded-lg shadow-xl overflow-hidden flex flex-col min-h-[200px]">
                <ErrorLog logs={errorLogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
