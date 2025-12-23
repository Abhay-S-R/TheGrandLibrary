const Book = ({ book }) => {
  return (
    <div className="flex items-start gap-6 p-6 bg-paper border border-oak/20 rounded-lg shadow-sm mb-4 hover:shadow-md hover:border-oak/40 transition-all group">
      {/* Large Thumbnail */}
      <div className="h-32 w-24 flex-shrink-0 bg-oak/10 rounded-sm shadow-inner overflow-hidden relative border border-oak/10">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 sepia-[.2]"
        />
        <div className="absolute inset-0 bg-oak/5 group-hover:bg-transparent transition-colors"></div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-center h-32">
        <h3
          className="text-xl font-bold text-oak-dark font-serif leading-tight mb-2 group-hover:text-crimson transition-colors"
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="text-base text-oak/70 font-serif italic mb-1">
          {book.author}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="bg-oak/10 text-oak text-xs font-bold px-2.5 py-1 rounded uppercase tracking-widest font-sans">
            In Stock
          </span>
          <span className="text-oak/30">|</span>
          <div className="text-xl font-bold text-crimson font-serif">
            ${book.price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
