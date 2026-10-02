import { useRef } from "react";
import { useGSAP } from "../../hooks/useAnimations";
import { animateTextReveal, animateParallax, animateScaleReveal } from "../../animations/gsapUtils";
import { personalInfo } from "../../data/portfolioData";

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const labelRef = useRef(null);
  const statementRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP((gsap, ctx) => {
    const section = sectionRef.current;
    if (!section) return;

    // Snappy entrance for text content
    const textElements = [
      labelRef.current,
      titleRef.current,
      statementRef.current,
      descriptionRef.current,
    ].filter(Boolean);

    gsap.from(textElements, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    if (imageRef.current) {
      gsap.from(imageRef.current, {
        y: 45,
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".info-card");
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 lg:gap-24">
          <div className="lg:w-2/5 flex-shrink-0">
            <div 
              ref={labelRef}
              className="section-label mb-4"
            >
              01 / ABOUT
            </div>
            <h2 
              ref={titleRef}
              className="section-title mb-8 text-primary-50"
            >
              ABOUT
            </h2>
            <p 
              ref={statementRef}
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary-300/90 leading-snug tracking-tight mb-8 text-balance"
            >
              Building intelligent systems that bridge human intent with machine execution.
            </p>
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-primary-400/70 leading-relaxed tracking-wide text-balance max-w-xl"
            >
              {personalInfo.description} I specialize in creating AI-powered desktop assistants, automation workflows, and full-stack applications that solve real-world problems through elegant code and intuitive interfaces.
            </p>
          </div>

          <div className="lg:w-3/5 flex flex-col gap-8">
            <div 
              ref={imageRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden glass card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-primary-950/30" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-900/20 border border-primary-800/50 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary-50 mb-2">AI & Automation</h3>
                  <p className="text-primary-400/60">Specialized in intelligent systems</p>
                </div>
              </div>
            </div>

            <div 
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="info-card glass p-6 card-hover group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-900/20 border border-primary-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase">Specialization</p>
                    <p className="font-medium text-primary-50">AI & Automation Engineering</p>
                  </div>
                </div>
                <p className="text-sm text-primary-400/60 leading-relaxed">
                  Voice-enabled AI assistants, computer vision systems, and intelligent automation workflows.
                </p>
              </div>

              <div className="info-card glass p-6 card-hover group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-violet/20 to-primary-900/20 border border-primary-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase">Stack</p>
                    <p className="font-medium text-primary-50">Python · React · FastAPI</p>
                  </div>
                </div>
                <p className="text-sm text-primary-400/60 leading-relaxed">
                  Full-stack development with modern frameworks and cloud-native architectures.
                </p>
              </div>

              <div className="info-card glass p-6 card-hover group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-primary-900/20 border border-primary-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase">Focus</p>
                    <p className="font-medium text-primary-50">Human-Computer Interaction</p>
                  </div>
                </div>
                <p className="text-sm text-primary-400/60 leading-relaxed">
                  Creating intuitive interfaces that make complex AI systems accessible and delightful.
                </p>
              </div>

              <div className="info-card glass p-6 card-hover group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-900/20 border border-primary-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase">Philosophy</p>
                    <p className="font-medium text-primary-50">Code as Craft</p>
                  </div>
                </div>
                <p className="text-sm text-primary-400/60 leading-relaxed">
                  Writing maintainable, performant code with attention to detail and developer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;