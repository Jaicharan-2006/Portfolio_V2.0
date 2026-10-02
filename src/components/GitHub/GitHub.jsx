import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { animateCounter } from "../../animations/gsapUtils";
import { githubStats } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const GitHub = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const statRefs = useRef({});
  const languageRefs = useRef([]);
  const repoCardRefs = useRef([]);
  const animatedRef = useRef(false); // use ref not state so useGSAP deps stay stable

  useGSAP((gsapInstance) => {
    const section = sectionRef.current;
    if (!section) return;

    // Header
    if (labelRef.current && titleRef.current) {
      gsapInstance.set([labelRef.current, titleRef.current], { y: 25, opacity: 0 });
      gsapInstance.to([labelRef.current, titleRef.current], {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }

    // Stat cards
    const statCards = Object.values(statRefs.current).filter(Boolean);
    if (statCards.length > 0) {
      gsapInstance.set(statCards, { y: 30, opacity: 0, scale: 0.95 });
      gsapInstance.to(statCards, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
        scrollTrigger: {
          trigger: statCards[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            if (animatedRef.current) return;
            animatedRef.current = true;

            // Animate counters
            Object.entries(githubStats.stats).forEach(([key, value], index) => {
              const ref = statRefs.current[key]?.querySelector(".stat-value");
              if (ref) {
                setTimeout(() => {
                  animateCounter(ref, value, { duration: 1.8, suffix: key === "stars" ? " ★" : "" });
                }, index * 150);
              }
            });

            // Animate language bars
            githubStats.topLanguages.forEach((lang, index) => {
              const barRef = languageRefs.current[index]?.querySelector(".lang-bar");
              if (barRef) {
                setTimeout(() => {
                  gsapInstance.to(barRef, { width: `${lang.percentage}%`, duration: 1.2, ease: "power3.out" });
                }, 300 + index * 100);
              }
            });
          },
        },
      });
    }

    // Repo cards
    const repos = repoCardRefs.current.filter(Boolean);
    if (repos.length > 0) {
      gsapInstance.set(repos, { y: 25, opacity: 0 });
      gsapInstance.to(repos, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: repos[0], start: "top 90%", toggleActions: "play none none reverse" },
      });
    }
  }, []); // stable deps — no animated state

  return (
    <section
      ref={sectionRef}
      id="github"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p ref={labelRef} className="section-label mb-4">06 / GITHUB</p>
            <h2 ref={titleRef} className="section-title text-primary-50">GITHUB</h2>
          </div>
          <a
            href={githubStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary self-end lg:self-auto flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View Profile
          </a>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {Object.entries(githubStats.stats).map(([key, value]) => (
            <div
              key={key}
              ref={(el) => { statRefs.current[key] = el; }}
              className="glass p-6 card-hover text-center group relative overflow-hidden"
            >
              <div className="stat-value font-display text-4xl md:text-5xl font-bold text-primary-50 mb-2" data-value={value}>0</div>
              <div className="font-mono text-xs text-primary-500/60 tracking-widest uppercase">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Languages */}
          <div className="glass p-8 rounded-2xl">
            <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase mb-6">Top Languages</p>
            <div className="space-y-4">
              {githubStats.topLanguages.map((lang, index) => (
                <div key={lang.name} ref={(el) => { languageRefs.current[index] = el; }} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="font-medium text-primary-50 text-sm">{lang.name}</span>
                    </div>
                    <span className="font-mono text-xs text-primary-500/60">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-primary-900 rounded-full overflow-hidden">
                    <div
                      className="lang-bar h-full rounded-full"
                      style={{ width: "0%", background: `linear-gradient(90deg, ${lang.color}, ${lang.color}dd)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Repositories */}
          <div className="glass p-8 rounded-2xl">
            <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase mb-6">Top Repositories</p>
            <div className="space-y-3">
              {githubStats.topRepositories.map((repo, index) => (
                <a
                  key={repo.name}
                  href={`${githubStats.profileUrl}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => { repoCardRefs.current[index] = el; }}
                  className="group flex items-start justify-between gap-4 p-4 rounded-xl bg-primary-900/30 border border-primary-800/30 hover:border-primary-600/50 hover:bg-primary-900/50 transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-primary-50 text-sm mb-1 truncate group-hover:text-accent-cyan transition-colors">{repo.name}</h4>
                    <p className="text-xs text-primary-400/60 truncate">{repo.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-xs text-primary-500/60">{repo.language}</span>
                    <div className="flex items-center gap-1 text-primary-500/50">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="font-mono text-xs">{repo.stars}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHub;
