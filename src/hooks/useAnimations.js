import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  prefersReducedMotion, 
  gsapContext, 
  killAllScrollTriggers, 
  refreshScrollTrigger 
} from "../animations/gsapUtils";

export { prefersReducedMotion };

export const useGSAP = (callback, dependencies = []) => {
  const contextRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (callback) callback(gsap, null);
      return;
    }

    // Create GSAP context scoped to scopeRef if available, or global if not
    contextRef.current = gsap.context((ctx) => {
      callback(gsap, ctx);
    }, scopeRef.current || undefined);

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, dependencies);

  return scopeRef;
};

export const useScrollTrigger = (config, dependencies = []) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      ...config,
      trigger: config.trigger || triggerRef.current,
    });

    triggerRef.current = trigger;

    return () => {
      if (trigger) trigger.kill();
    };
  }, dependencies);

  return triggerRef;
};

export const useParallax = (speed = 0.5, options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return;

    const element = elementRef.current;
    const { trigger = element, start = "top bottom", end = "bottom top", scrub = true } = options;

    const animation = gsap.to(element, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        ...options.scrollTrigger,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [speed, options]);

  return elementRef;
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export const useReducedMotion = () => {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
};

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0, progress: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const updatePosition = () => {
      const y = window.scrollY;
      const x = window.scrollX;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? y / maxScroll : 0;
      
      setScrollPosition({ x, y, progress });
    };

    window.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
};

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting];
};

export const useAnimationFrame = (callback) => {
  const frameRef = useRef(0);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const animate = () => {
      callbackRef.current();
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

export const useLeninSmoothScroll = () => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    import("lenis").then(({ default: Lenis }) => {
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisInstance.on("scroll", ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);

      setLenis(lenisInstance);

      return () => {
        lenisInstance.destroy();
        gsap.ticker.remove(() => {});
      };
    });
  }, []);

  return lenis;
};