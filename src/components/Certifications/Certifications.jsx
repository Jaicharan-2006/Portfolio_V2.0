import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { certifications } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const trackRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP((gsapInstance, ctx) => {
    if (prefersReducedMotion()) return;

    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    // Header reveal
    if (labelRef.current && titleRef.current) {
      gsapInstance.from([labelRef.current, titleRef.current], {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
        },
      });
    }

    // Calculate total scroll amount needed
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 120);
    };

    // Smooth horizontal pin scroll
    gsapInstance.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 300, 600)}`,
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="certifications" 
      className="relative overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div 
        ref={triggerRef}
        className="min-h-screen flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="text-center mb-12">
          <p 
            ref={labelRef}
            className="section-label mb-3"
          >
            05 / CERTIFICATIONS
          </p>
          <h2 
            ref={titleRef}
            className="section-title text-primary-50"
          >
            CERTIFICATIONS
          </h2>
          <p className="text-primary-400/60 max-w-xl mx-auto mt-4 text-sm sm:text-base">
            Verified credentials in Artificial Intelligence, Machine Learning, and Full-Stack Engineering.
          </p>
        </div>

        {/* Horizontal Track Container */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={trackRef}
            className="flex items-stretch gap-6 sm:gap-8 w-max pl-4 pr-16 py-4"
            style={{ willChange: "transform" }}
          >
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="w-[320px] sm:w-[380px] flex-shrink-0 flex flex-col glass-strong rounded-2xl overflow-hidden card-hover border border-primary-800/40 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Visual Header / Certificate preview */}
                <div className="relative h-48 sm:h-52 bg-gradient-to-br from-primary-950 via-dark-400 to-primary-900/40 flex items-center justify-center p-6 overflow-hidden border-b border-primary-800/40">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-primary-900/50 border border-primary-700/50 flex items-center justify-center text-accent-cyan">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-dark-500/80 backdrop-blur-md border border-primary-700/40 text-[10px] font-mono text-accent-cyan tracking-wider">
                    CERT 0{index + 1}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-dark-400/30">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary-50 mb-2 leading-snug group-hover:text-primary-200 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-primary-400/80 mb-1">
                      {cert.issuer}
                    </p>
                    <p className="font-mono text-xs text-primary-500/60 mb-4">
                      Issued: {cert.date}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-primary-800/40 mt-auto">
                    <span className="font-mono text-[11px] text-primary-500/60">
                      ID: {cert.credentialId}
                    </span>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-accent-cyan hover:text-primary-300 transition-colors duration-300 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/25 hover:bg-accent-cyan/20"
                      >
                        Verify
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;