import { useScrollProgress } from "../../hooks/useAnimations";

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-40 pointer-events-none"
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-cyan to-primary-500 transform origin-left"
        style={{ 
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};

export default ScrollProgress;