import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { animateTextReveal, animateScaleReveal } from "../../animations/gsapUtils";
import { skills } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const skillIcons = {
  python: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  java: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  algorithm: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  react: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3-13h-2v2h2v-2zm0 4h-2v4h2v-4z"/>
    </svg>
  ),
  tailwind: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  html: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v12h16V7H4z" />
    </svg>
  ),
  javascript: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  nodejs: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  fastapi: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  mongodb: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3-13h-2v2h2v-2zm0 4h-2v4h2v-4z"/>
    </svg>
  ),
  ai: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  automation: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  "ai-app": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

const Skills = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const categoryRefs = useRef({});

  useGSAP((gsap, ctx) => {
    const section = sectionRef.current;
    if (!section) return;

    // Header reveal
    if (labelRef.current && titleRef.current) {
      gsap.fromTo(
        [labelRef.current, titleRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Per-category: staggered card reveal + animated skill bars
    skills.forEach((category) => {
      const catRef = categoryRefs.current[category.category];
      if (!catRef) return;

      const cards = catRef.querySelectorAll(".skill-card");
      if (!cards.length) return;

      // Set initial invisible state immediately so no flash
      gsap.set(cards, { opacity: 0, y: 30, scale: 0.95 });

      // Staggered card entrance
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: catRef,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Animate skill bars when cards arrive
            cards.forEach((card, idx) => {
              const bar = card.querySelector(".skill-bar-fill");
              if (!bar) return;
              const level = parseFloat(bar.dataset.level || "0");
              gsap.fromTo(
                bar,
                { scaleX: 0 },
                {
                  scaleX: level / 100,
                  duration: 1.1,
                  delay: 0.3 + idx * 0.08,
                  ease: "power3.out",
                  transformOrigin: "left center",
                }
              );
            });
          },
        },
      });
    });
  }, []);


  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p 
            ref={labelRef}
            className="section-label mb-4"
          >
            02 / SKILLS
          </p>
          <h2 
            ref={titleRef}
            className="section-title text-primary-50"
          >
            SKILLS
          </h2>
        </div>

        <div className="space-y-16">
          {skills.map((category, catIndex) => (
            <div 
              key={category.category}
              ref={(el) => { categoryRefs.current[category.category] = el; }}
              className="skill-category"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-50 mb-8 tracking-tight flex items-center gap-4">
                <span className="font-mono text-primary-400/60 text-sm">{String(catIndex + 1).padStart(2, '0')}</span>
                <span>{category.category}</span>
                <span className="w-full h-px bg-gradient-to-r from-primary-800 to-transparent" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-card glass p-6 card-hover group relative overflow-hidden"
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      transformOrigin: "center center"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-900/10 border border-primary-800/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary-600/50 transition-all duration-300 text-primary-400">
                        {skillIcons[skill.icon] || skillIcons.ai}
                      </div>
                      
                      <h4 className="font-medium text-primary-50 mb-2 text-lg">{skill.name}</h4>
                      
                      <div className="w-full h-2 bg-primary-900/80 rounded-full overflow-hidden">
                        <div 
                          className="skill-bar-fill h-full bg-gradient-to-r from-primary-500 to-accent-cyan rounded-full"
                          data-level={skill.level}
                          style={{ 
                            transform: "scaleX(0)",
                            transformOrigin: "left center",
                          }}
                        />
                      </div>
                      
                      <span className="font-mono text-xs text-primary-500/60 mt-2 block">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;