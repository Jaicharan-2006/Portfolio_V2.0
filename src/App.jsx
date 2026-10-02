import { useState, useEffect, createContext, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Certifications from "./components/Certifications/Certifications";
import GitHub from "./components/GitHub/GitHub";
import Contact from "./components/Contact/Contact";
import LoadingScreen from "./components/UI/LoadingScreen";
import ScrollProgress from "./components/UI/ScrollProgress";
import Cursor from "./components/UI/Cursor";

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lenis, setLenis] = useState(null);
  const [enableCursor, setEnableCursor] = useState(true);

  useEffect(() => {
    let lenisInstance = null;
    let tickerCallback = null;

    import("lenis").then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Synchronize ScrollTrigger with Lenis scroll
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Driven by GSAP's ticker for 100% sync
      tickerCallback = (time) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      setLenis(lenisInstance);
    });

    return () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  return (
    <LenisContext.Provider value={lenis}>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <ScrollProgress />
      {enableCursor && <Cursor />}
      <Navigation />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <GitHub />
        <Contact />
      </main>
    </LenisContext.Provider>
  );
}

export default App;