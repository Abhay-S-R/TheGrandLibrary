const LowStockAlert = ({ inventory }) => {
  const lowStockThreshold = 3;
  const lowStockGenres = Object.entries(inventory).filter(
    ([_, books]) => books.length < lowStockThreshold
  );

  if (lowStockGenres.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {lowStockGenres.map(([genre, books]) => (
        <div
          key={genre}
          className="bg-paper border-l-4 border-crimson text-oak-dark px-5 py-3 rounded shadow-md flex items-center gap-3 animate-pulse-slow"
        >
          <div className="text-crimson font-serif text-2xl font-bold">!</div>
          <div>
            <p className="text-sm font-bold font-serif uppercase tracking-wider text-crimson">
              Low Stock: {genre}
            </p>
            <p className="text-xs font-serif italic opacity-80">
              Only {books.length} volumes remaining.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LowStockAlert;
