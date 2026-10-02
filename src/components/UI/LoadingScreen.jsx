import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050a]"
      role="status"
      aria-label="Loading portfolio"
      aria-busy="true"
    >
      <div className="text-center">
        <div className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#f0f4ff] mb-4 animate-fade-in">
          <span className="block">JAICHARAN</span>
          <span className="block text-[#818cf8]">M</span>
        </div>
        <p className="font-mono text-sm text-[#818cf8]/60 tracking-widest uppercase animate-slide-up">
          INITIALIZING EXPERIENCE...
        </p>
        <div className="w-full max-w-md mx-auto mt-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="h-1 bg-[#1e1b4b] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#00f3ff] rounded-full animate-load-bar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;