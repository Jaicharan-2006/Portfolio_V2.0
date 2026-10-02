import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useAnimations";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState("default");

  const isTouch = useMediaQuery("(pointer: coarse)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMouseDown = false;
    let isHoveringText = false;
    let isHoveringInteractive = false;
    let animationFrameId = null;
    let isVisible = false;

    // Directly mutate DOM opacity — avoids re-rendering and re-registering listeners
    const setVisible = (v) => {
      if (isVisible === v) return;
      isVisible = v;
      const op = v ? "1" : "0";
      if (dotRef.current) dotRef.current.style.opacity = op;
      if (ringRef.current) ringRef.current.style.opacity = op;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
      }

      const target = e.target;
      if (!target) return;

      const newInteractive = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, label, .card-hover, .btn-primary, .btn-secondary, .timeline-dot")
      );
      const newText = !newInteractive && Boolean(
        target.closest("h1, h2, h3, h4, h5, p, span, li, .section-title, .section-label, blockquote, [data-cursor='text']")
      );

      if (newInteractive !== isHoveringInteractive || newText !== isHoveringText) {
        isHoveringInteractive = newInteractive;
        isHoveringText = newText;
        if (isMouseDown) setCursorState("clicking");
        else if (newInteractive) setCursorState("interactive");
        else if (newText) setCursorState("text");
        else setCursorState("default");
      }
    };

    const handleMouseDown = () => { isMouseDown = true; setCursorState("clicking"); };
    const handleMouseUp = () => {
      isMouseDown = false;
      if (isHoveringInteractive) setCursorState("interactive");
      else if (isHoveringText) setCursorState("text");
      else setCursorState("default");
    };
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch, prefersReduced]); // Only re-run if device type changes

  if (isTouch || prefersReduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full ${
          cursorState === "text" ? "w-1 h-1 bg-white"
          : cursorState === "interactive" ? "w-3 h-3 bg-accent-cyan"
          : cursorState === "clicking" ? "w-2 h-2 bg-primary-300"
          : "w-2 h-2 bg-primary-400"
        }`}
        style={{
          opacity: 0,
          willChange: "transform",
          transition: "width 0.12s, height 0.12s, background-color 0.12s ease",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] rounded-full ${
          cursorState === "text" ? "w-14 h-14 bg-white mix-blend-difference border-none"
          : cursorState === "interactive" ? "w-11 h-11 border-2 border-accent-cyan bg-accent-cyan/10"
          : cursorState === "clicking" ? "w-7 h-7 border border-primary-400 bg-primary-500/20"
          : "w-9 h-9 border border-primary-500/40 bg-primary-500/10"
        }`}
        style={{
          opacity: 0,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Cursor;
