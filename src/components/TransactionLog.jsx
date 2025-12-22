import React, { useEffect, useRef } from "react";

const TransactionLog = ({ logs }) => {
  const scrollRef = useRef(null);

  return (
    <div className="h-full flex flex-col bg-paper">
      <h2 className="text-xl font-bold text-oak-dark p-6 border-b-2 border-oak/20 bg-parchment flex items-center gap-2 font-serif sticky top-0 z-10 shrink-0">
        <span className="text-2xl">📜</span> Archive Log
      </h2>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-oak scrollbar-track-transparent min-h-0"
      >
        {logs.length === 0 ? (
          <div className="text-oak/40 text-sm text-center mt-10 italic font-serif">
            The dusty pages are empty...
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`flex items-center gap-3 p-3 rounded-lg border-b border-oak/10 animate-fade-in hover:bg-parchment transition-colors group`}
            >
              <div className="w-10 h-14 bg-oak/10 rounded-sm overflow-hidden flex-shrink-0 relative shadow-sm border border-oak/20">
                <img
                  src={log.book.cover}
                  className="w-full h-full object-cover opacity-90 sepia-[.3]"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0 font-serif">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm border ${
                      log.type === "restock"
                        ? "bg-oak/5 text-oak border-oak/20"
                        : "bg-crimson/5 text-crimson border-crimson/20"
                    }`}
                  >
                    {log.type === "restock" ? "ACQUIRED" : "DEPARTED"}
                  </span>
                </div>
                <p className="font-bold text-sm text-oak-dark truncate group-hover:text-black">
                  {log.book.title}
                </p>
                <p className="text-xs text-oak/60 italic">{log.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionLog;
