import React from "react";

const Controls = ({ onAdd, onSell, genre, disabledSell }) => {
  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={() => onAdd(genre)}
        className="flex-1 px-6 py-3 rounded-lg text-base font-bold font-serif text-white bg-[#3e2723] border-2 border-[#3e2723] hover:bg-[#2d1b18] hover:border-[#2d1b18] transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      >
        <span>➕</span> Restock {genre}
      </button>
      <button
        onClick={() => onSell(genre)}
        disabled={disabledSell}
        className={`flex-1 px-6 py-3 rounded-lg text-base font-bold font-serif transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border-2 ${
          disabledSell
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 shadow-none"
            : "bg-paper text-crimson border-crimson/30 hover:bg-crimson/20 hover:border-crimson hover:shadow-lg"
        }`}
      >
        <span>💸</span> Sell Top Book
      </button>
    </div>
  );
};

export default Controls;
