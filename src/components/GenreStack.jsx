import React from "react";
import Book from "./Book";

const GenreStack = ({ genre, books }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6">
        {books.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-oak/40 text-sm italic border-2 border-dashed border-oak/20 rounded-lg bg-parchment font-serif">
            The shelf sits empty...
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Stacking logic: LIFO means top of stack is start of array. 
                 If we want to visualize a physical stack from top to bottom, 
                 we can just map the array. */}
            {books.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreStack;
