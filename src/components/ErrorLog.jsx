import { useRef, useEffect } from "react";

const ErrorLog = ({ logs }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div className="h-full flex flex-col bg-paper">
      <h2 className="text-xl font-bold text-crimson p-6 border-b-2 border-oak/20 bg-parchment flex items-center gap-2 font-serif sticky top-0 z-10 shrink-0">
        <span className="text-2xl">⚠️</span> Error Logs
      </h2>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-crimson/50 scrollbar-track-transparent min-h-0"
      >
        {logs.length === 0 ? (
          <div className="text-oak/40 text-sm text-center mt-10 italic font-serif">
            System is stable. No alerts.
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-crimson/20 bg-crimson/5 animate-fade-in"
            >
              <div className="text-xl">🚨</div>
              <div className="flex-1 min-w-0 font-serif">
                <p className="font-bold text-sm text-crimson break-words whitespace-normal">
                  {log.message}
                </p>
                <p className="text-xs text-crimson/60 italic">
                  {log.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ErrorLog;
