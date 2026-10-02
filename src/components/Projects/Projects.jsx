import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { projects } from "../../data/portfolioData";
import { useLenis } from "../../App";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeProject, setActiveProject] = useState(0);
  const lenis = useLenis();

  useGSAP((gsapInstance, ctx) => {
    if (prefersReducedMotion()) return;

    const stage = stageRef.current;
    if (!stage) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial visibility: first card visible, others hidden
    cards.forEach((card, i) => {
      if (i === 0) {
        gsapInstance.set(card, { autoAlpha: 1, scale: 1, y: 0, zIndex: 10 });
      } else {
        gsapInstance.set(card, { autoAlpha: 0, scale: 0.92, y: 40, zIndex: 5 });
      }
    });

    const totalSteps = projects.length;
    const tl = gsapInstance.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => `+=${totalSteps * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const step = Math.min(
            Math.floor(self.progress * totalSteps),
            totalSteps - 1
          );
          setActiveProject(step);
        },
      },
    });

    // Create sequential transitions between cards
    for (let i = 0; i < cards.length - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];

      tl.to(currentCard, {
        autoAlpha: 0,
        scale: 0.92,
        y: -40,
        duration: 1,
        ease: "power2.inOut",
      }, i + 0.2);

      tl.to(nextCard, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      }, i + 0.3);
    }

    if (labelRef.current) {
      gsapInstance.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }

    if (titleRef.current) {
      gsapInstance.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative pt-28 pb-20 overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
        <p 
          ref={labelRef}
          className="section-label mb-3"
        >
          04 / PROJECTS
        </p>
        <h2 
          ref={titleRef}
          className="section-title text-primary-50"
        >
          FEATURED WORK
        </h2>
        <p className="text-primary-400/60 max-w-xl mx-auto mt-4 text-base">
          A showcase of intelligent AI assistants, computer vision pipelines, and full-stack software.
        </p>
      </div>

      {/* Pinned Showcase Stage */}
      <div 
        ref={stageRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-6"
      >
        <div className="relative w-full max-w-5xl h-[620px] sm:h-[650px] md:h-[600px] flex items-center justify-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="absolute inset-0 w-full h-full flex flex-col pointer-events-auto"
              style={{
                willChange: "transform, opacity",
              }}
            >
              <div className="w-full h-full glass-strong rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between border border-primary-700/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-cyan/5 pointer-events-none" />
                
                {/* Left details */}
                <div className="flex-1 flex flex-col justify-between h-full z-10 w-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 rounded-full uppercase tracking-wider">
                        Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-mono text-primary-400/60 uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 tracking-tight mb-4">
                      {project.title}
                    </h3>

                    <p className="text-primary-300/80 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {project.longDescription || project.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <p className="font-mono text-xs text-primary-400/60 tracking-wider uppercase">Key Capabilities</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.slice(0, 4).map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-primary-300/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 6).map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 text-xs font-mono text-primary-400/90 bg-primary-900/60 border border-primary-800/60 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm py-2.5 px-5 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Source Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right visual preview */}
                <div className="w-full lg:w-[45%] h-56 lg:h-full rounded-2xl overflow-hidden relative flex-shrink-0 bg-dark-300/80 border border-primary-800/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-primary-950/40" />
                  
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary-500/40 font-mono text-sm">
                      {project.shortTitle}
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-dark-500/80 backdrop-blur-md border border-primary-700/40 text-[10px] font-mono text-primary-400">
                    {project.technologies[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Step Navigator */}
        <div className="mt-8 flex items-center gap-3">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                const stage = stageRef.current;
                if (!stage) return;
                const targetScroll = stage.offsetTop + (idx / (projects.length - 1)) * (projects.length * window.innerHeight);
                if (lenis) {
                  lenis.scrollTo(targetScroll, { duration: 1 });
                } else {
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeProject
                  ? "w-8 bg-gradient-to-r from-primary-400 to-accent-cyan"
                  : "w-2 bg-primary-800/60 hover:bg-primary-600/60"
              }`}
              aria-label={`Jump to project ${idx + 1}: ${proj.shortTitle}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;