import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "../../hooks/useAnimations";
import { useLenis } from "../../App";
import { navigation, socialLinks } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const progress = useScrollProgress();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Robust active-section detection using IntersectionObserver
  // rootMargin "-40% 0px -55% 0px" hits the element when it occupies
  // the band between 40% and 45% of the viewport — reliable centre-ish detection
  useEffect(() => {
    const sectionIds = navigation.map((n) => n.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (href) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileOpen(false);
  };

  const instagramIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const githubIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const getSocialIcon = (icon) => {
    if (icon === "github") return githubIcon;
    if (icon === "instagram") return instagramIcon;
    if (icon === "mail") return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
    return null;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong py-4 px-6 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-6 px-6"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            className="font-display text-xl font-bold text-primary-50 tracking-tight flex items-center gap-1.5"
            aria-label="JAICHARAN M - Home"
          >
            JAICHARAN <span className="text-primary-400">M</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((nav) => (
              <a
                key={nav.id}
                href={nav.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(nav.href); }}
                className={`relative font-mono text-sm tracking-widest transition-colors duration-300 ${
                  activeSection === nav.id
                    ? "text-primary-50"
                    : "text-primary-400/60 hover:text-primary-50"
                }`}
                aria-current={activeSection === nav.id ? "page" : undefined}
              >
                {nav.label}
                {activeSection === nav.id && (
                  <span className="absolute bottom-[-6px] left-0 right-0 h-px bg-gradient-to-r from-primary-500 to-accent-cyan" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {socialLinks.slice(0, 2).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-900/50 border border-primary-800/50 flex items-center justify-center text-primary-400/70 hover:text-primary-50 hover:border-primary-600/50 hover:bg-primary-900/70 transition-all duration-300"
                aria-label={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>

          <button
            className="lg:hidden p-2 rounded-xl bg-primary-900/50 border border-primary-800/50 text-primary-50 hover:bg-primary-900/70 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          role="dialog"
          aria-modal={isMobileOpen}
          aria-label="Mobile menu"
        >
          <div className="py-6 space-y-4 border-t border-primary-800/30 pt-6">
            {navigation.map((nav) => (
              <a
                key={nav.id}
                href={nav.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(nav.href); }}
                className={`block px-4 py-3 rounded-xl font-mono text-sm tracking-widest transition-all duration-300 ${
                  activeSection === nav.id
                    ? "bg-primary-900/50 text-primary-50 border border-primary-800/50"
                    : "text-primary-400/60 hover:text-primary-50 hover:bg-primary-900/30"
                }`}
                aria-current={activeSection === nav.id ? "page" : undefined}
              >
                {nav.label}
              </a>
            ))}
            <div className="pt-4 border-t border-primary-800/30 flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.icon !== "mail" ? "_blank" : undefined}
                  rel={social.icon !== "mail" ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl bg-primary-900/50 border border-primary-800/50 flex items-center justify-center text-primary-400/70 hover:text-primary-50 hover:border-primary-600/50 transition-all duration-300"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll progress indicator */}
      <div
        className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative w-px h-32 bg-primary-900 rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary-500 to-accent-cyan"
            style={{ height: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
        <div className="text-primary-500/40 font-mono text-xs tracking-widest uppercase">SCROLL</div>
      </div>
    </>
  );
};

export default Navigation;
