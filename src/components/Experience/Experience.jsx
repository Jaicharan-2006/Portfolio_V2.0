import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { experience } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "01": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
    </svg>
  ),
  "02": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  "03": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
  ),
  "04": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
    </svg>
  ),
  "05": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  ),
};

const Experience = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  useGSAP((gsapInstance) => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    if (labelRef.current && titleRef.current) {
      gsapInstance.fromTo(
        [labelRef.current, titleRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } }
      );
    }

    if (timelineRef.current) {
      gsapInstance.fromTo(timelineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 80%", scrub: 0.5 } }
      );
    }

    itemRefs.current.forEach((itemRef, index) => {
      if (!itemRef) return;
      const isEven = index % 2 === 0;
      gsapInstance.set(itemRef, { x: isEven ? -40 : 40, opacity: 0 });
      gsapInstance.to(itemRef, {
        x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: itemRef, start: "top 85%", toggleActions: "play none none reverse" }
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p ref={labelRef} className="section-label mb-3">03 / EXPERIENCE</p>
          <h2 ref={titleRef} className="section-title text-primary-50">EXPERIENCE</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline vertical line */}
          <div
            ref={timelineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary-600 via-accent-cyan/60 to-primary-900"
          />

          <div className="relative space-y-10">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`relative pl-14 md:pl-0 ${
                    isEven
                      ? "md:pl-[calc(50%+2.5rem)] md:pr-0"
                      : "md:pr-[calc(50%+2.5rem)] md:pl-0"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-dark-500 z-10 shadow-[0_0_14px_rgba(0,243,255,0.5)] flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)` }}
                  />

                  <div className="glass-strong rounded-2xl border border-primary-800/40 hover:border-primary-600/50 transition-all duration-300 group overflow-hidden">
                    {/* Card top accent bar */}
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

                    <div className="p-6 sm:p-8">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary-800/40"
                            style={{ background: `${exp.color}18`, color: exp.color }}
                          >
                            {iconMap[exp.number]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: exp.color }}>
                                {exp.number}
                              </span>
                              <span className="text-primary-600/40 text-xs">•</span>
                              <span className="font-mono text-xs text-primary-500/60 tracking-wide">{exp.period}</span>
                            </div>
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-primary-50 leading-tight">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-medium mt-0.5" style={{ color: `${exp.color}cc` }}>
                              {exp.project}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-primary-500/50 sm:mt-1 flex-shrink-0 ml-16 sm:ml-0">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-primary-300/75 leading-relaxed text-sm sm:text-base mb-6">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-primary-800/30">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs font-mono rounded-full border transition-colors duration-300"
                            style={{
                              borderColor: `${exp.color}30`,
                              color: `${exp.color}bb`,
                              background: `${exp.color}0d`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
