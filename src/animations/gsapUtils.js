import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const createScrollTrigger = (config) => {
  if (prefersReducedMotion()) {
    return null;
  }
  
  return ScrollTrigger.create(config);
};

export const gsapContext = (scope, callback) => {
  const ctx = gsap.context(callback, scope);
  return () => ctx.revert();
};

export const animateTextReveal = (elements, options = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, rotateX: 0, filter: "none" });
    return gsap.timeline();
  }

  const {
    y = 50,
    opacity = 0,
    rotateX = 0,
    filter = "blur(10px)",
    duration = 1,
    stagger = 0.05,
    ease = "power3.out",
    delay = 0,
  } = options;

  return gsap.fromTo(
    elements,
    { y, opacity, rotateX, filter },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      duration,
      stagger,
      ease,
      delay,
    }
  );
};

export const animateScaleReveal = (elements, options = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, scale: 1 });
    return gsap.timeline();
  }

  const {
    scale = 0.8,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = "power2.out",
    delay = 0,
  } = options;

  return gsap.fromTo(
    elements,
    { scale, opacity },
    {
      scale: 1,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
    }
  );
};

export const animateParallax = (element, speed = 0.5, options = {}) => {
  if (prefersReducedMotion()) return null;

  const { trigger = element, start = "top bottom", end = "bottom top", scrub = true } = options;

  return gsap.to(element, {
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
};

export const animatePin = (element, options = {}) => {
  if (prefersReducedMotion()) return null;

  const { start = "top top", end = "bottom top", pinSpacing = true } = options;

  return ScrollTrigger.create({
    trigger: element,
    start,
    end,
    pin: true,
    pinSpacing,
    anticipatePin: 1,
    ...options,
  });
};

export const animateHorizontalScroll = (container, items, options = {}) => {
  if (prefersReducedMotion()) return null;

  const { speed = 1, start = "top bottom", end = "bottom top", scrub = 1 } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start,
      end,
      scrub,
      ...options.scrollTrigger,
    },
  });

  timeline.to(items, {
    xPercent: -100 * (items.length - 1) * speed,
    ease: "none",
  });

  return timeline;
};

export const animateCounter = (element, endValue, options = {}) => {
  if (prefersReducedMotion()) {
    element.textContent = endValue;
    return;
  }

  const { duration = 2, ease = "power2.out", decimals = 0, suffix = "" } = options;

  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    onUpdate: () => {
      element.textContent = obj.value.toFixed(decimals) + suffix;
    },
  });
};

export const splitTextLines = (element) => {
  const text = element.textContent;
  const lines = text.split("\n").filter(line => line.trim());
  
  element.innerHTML = lines.map(line => 
    `<div class="overflow-hidden"><span style="display: inline-block;">${line}</span></div>`
  ).join("");
  
  return element.querySelectorAll("span");
};

export const splitTextWords = (element) => {
  const text = element.textContent;
  const words = text.split(" ").filter(word => word.trim());
  
  element.innerHTML = words.map(word => 
    `<span style="display: inline-block; margin-right: 0.25em;">${word}</span>`
  ).join("");
  
  return element.querySelectorAll("span");
};

export const splitTextChars = (element) => {
  const text = element.textContent;
  const chars = text.split("");
  
  element.innerHTML = chars.map(char => 
    `<span style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`
  ).join("");
  
  return element.querySelectorAll("span");
};

export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export const matchMedia = (queries, callbacks) => {
  if (prefersReducedMotion()) return () => {};
  
  return gsap.matchMedia(queries, callbacks);
};