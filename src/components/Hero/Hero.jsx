import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { personalInfo } from "../../data/portfolioData";
import { useLenis } from "../../App";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const bgGridRef = useRef(null);
  const bgGlowRef = useRef(null);
  const particlesRef = useRef(null);
  const lenis = useLenis();

  useGSAP((gsapInstance) => {
    if (prefersReducedMotion()) return;

    const hero = heroRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const bgGrid = bgGridRef.current;
    const bgGlow = bgGlowRef.current;
    const particles = particlesRef.current;

    if (!hero || !content) return;

    const tl = gsapInstance.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom 30%",
        scrub: 0.4,
      },
    });

    tl.to(content, { y: -80, opacity: 0, scale: 0.96, ease: "power1.inOut" }, 0);
    if (scrollIndicator) tl.to(scrollIndicator, { opacity: 0, y: -30, ease: "power1.in" }, 0);
    if (bgGrid) tl.to(bgGrid, { y: 60, opacity: 0.1, ease: "none" }, 0);
    if (bgGlow) tl.to(bgGlow, { scale: 1.2, opacity: 0, ease: "none" }, 0);
    if (particles) tl.to(particles, { y: 100, opacity: 0, ease: "none" }, 0);
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      if (lenis) lenis.scrollTo(aboutSection, { offset: -60, duration: 1.2 });
      else aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-6"
      style={{ background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08) 0%, transparent 60%), #05050a" }}
    >
      <div ref={bgGridRef} className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" style={{ backgroundSize: "80px 80px" }} />
      <div ref={bgGlowRef} className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-primary-400/30"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${10 + (i * 8) % 90}%`,
              top: `${15 + (i * 12) % 70}%`,
              animation: `float ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-400/40 to-dark-500 pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full my-auto">
        <div className="mb-4">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary-50 leading-[0.95] select-none">
            <span>JAICHARAN</span>{" "}
            <span className="text-primary-400/80">M</span>
          </h1>
        </div>

        <div className="mb-6 max-w-2xl">
          <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-primary-300/90 tracking-tight leading-snug text-balance">
            AI &amp; Automation Engineer
          </p>
        </div>

        <div className="mb-8 max-w-xl">
          <p className="text-base sm:text-lg text-primary-400/75 leading-relaxed tracking-normal text-balance">
            {personalInfo.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-primary-500/70 mb-10">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-950/60 border border-primary-800/40">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse-slow"></span>
            <span>PYTHON</span>
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-950/60 border border-primary-800/40">
            <span className="w-2 h-2 rounded-full bg-accent-violet animate-pulse-slow" style={{ animationDelay: "0.5s" }}></span>
            <span>REACT</span>
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-950/60 border border-primary-800/40">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-slow" style={{ animationDelay: "1s" }}></span>
            <span>FASTAPI</span>
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-950/60 border border-primary-800/40">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse-slow" style={{ animationDelay: "1.5s" }}></span>
            <span>AI/ML</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={personalInfo.resume}
            download="Jaicharan_M_Resume.pdf"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-primary-50 font-medium text-sm tracking-wide hover:from-primary-500 hover:to-primary-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-95 transition-all duration-300"
            aria-label="Download Resume"
          >
            <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
          <button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) lenis ? lenis.scrollTo(el, { offset: -70, duration: 1.2 }) : el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary-700/50 text-primary-300 font-medium text-sm tracking-wide hover:bg-primary-900/40 hover:border-primary-500/50 hover:text-primary-50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            View Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="relative z-10 flex flex-col items-center gap-2 text-primary-500/60 hover:text-primary-400 font-mono text-xs tracking-widest cursor-pointer transition-colors duration-300 mt-auto pt-4"
        role="button"
        tabIndex={0}
        aria-label="Scroll to About section"
        onKeyDown={(e) => e.key === "Enter" && handleScrollClick()}
      >
        <div className="flex items-center gap-2">
          <span className="text-primary-400/80">01</span>
          <span>SCROLL TO EXPLORE</span>
        </div>
        <div className="relative w-px h-10 bg-gradient-to-b from-primary-400/50 to-transparent">
          <div className="absolute left-0 top-0 w-full h-2 bg-primary-400 animate-pulse-slow" style={{ transformOrigin: "top center" }} />
        </div>
        <div className="flex items-center gap-0.5 animate-float">
          <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
