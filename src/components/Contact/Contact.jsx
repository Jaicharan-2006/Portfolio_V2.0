import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, prefersReducedMotion } from "../../hooks/useAnimations";
import { personalInfo, socialLinks, navigation } from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const formRef = useRef(null);
  const socialCardsRef = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  useGSAP((gsapInstance) => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsapInstance.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    if (headerRef.current) {
      tl.from(headerRef.current.children, {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }

    if (leftColRef.current) {
      tl.from(
        leftColRef.current.children,
        {
          y: 25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    if (formRef.current) {
      tl.from(
        formRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.98,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setFormStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setFormStatus("idle"), 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const renderIcon = (iconName) => {
    if (iconName === "github") {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    }
    if (iconName === "instagram") {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    }
    if (iconName === "mail") {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
      </svg>
    );
  };

  const getDisplayHandle = (social) => {
    if (social.name === "Email") return personalInfo.email;
    if (social.name === "GitHub") return "Jaicharan-2006";
    if (social.name === "Instagram") return "@jaicharan_2006";
    return social.url.replace("https://", "").replace("mailto:", "");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen pt-32 pb-32 px-6 overflow-hidden"
      style={{ background: "#05050a" }}
    >
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" style={{ opacity: 0.5 }} />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ backgroundSize: "100px 100px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <p className="section-label mb-4">
            07 / CONTACT
          </p>
          <h2 className="section-title text-primary-50 mb-8">
            CONTACT
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div ref={leftColRef} className="flex flex-col justify-start">
            <div className="mb-8">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-50 tracking-tighter leading-[1.05] mb-6">
                <span className="block">LET&apos;S BUILD</span>
                <span className="block text-primary-400/80">SOMETHING</span>
                <span className="block text-accent-cyan">INTELLIGENT.</span>
              </h3>
              <p className="text-base md:text-lg text-primary-300/80 leading-relaxed max-w-lg">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something meaningful. Whether it&apos;s AI automation, full-stack development, or something entirely new — let&apos;s connect.
              </p>
            </div>

            {/* Social & Contact Links */}
            <div className="space-y-4 pt-2">
              <p className="font-mono text-xs uppercase tracking-widest text-primary-400/60 font-semibold mb-3">
                Direct Channels
              </p>
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.icon !== "mail" ? "_blank" : undefined}
                  rel={social.icon !== "mail" ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between p-4 rounded-xl bg-primary-950/60 border border-primary-800/60 hover:border-primary-500/60 hover:bg-primary-900/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-900/40 border border-primary-700/60 flex items-center justify-center text-accent-cyan group-hover:scale-110 group-hover:border-accent-cyan/60 group-hover:text-primary-50 transition-all duration-300">
                      {renderIcon(social.icon)}
                    </div>
                    <div>
                      <p className="font-mono text-xs text-primary-400 tracking-wider uppercase font-semibold">
                        {social.name}
                      </p>
                      <p className="text-primary-50 font-medium text-sm md:text-base group-hover:text-accent-cyan transition-colors">
                        {getDisplayHandle(social)}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-primary-900/40 border border-primary-800/50 flex items-center justify-center text-primary-400 group-hover:text-accent-cyan group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div
            ref={formRef}
            className="p-8 md:p-10 rounded-2xl bg-primary-950/70 border border-primary-800/70 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-50 mb-2">SEND A MESSAGE</h3>
            <p className="text-sm text-primary-400/70 mb-8 font-mono">Fill out the form and I&apos;ll respond promptly.</p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-primary-400/80 tracking-widest uppercase mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-900/40 border border-primary-800/60 rounded-xl text-primary-50 placeholder-primary-500/40 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-primary-400/80 tracking-widest uppercase mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-900/40 border border-primary-800/60 rounded-xl text-primary-50 placeholder-primary-500/40 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-xs text-primary-400/80 tracking-widest uppercase mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-900/40 border border-primary-800/60 rounded-xl text-primary-50 placeholder-primary-500/40 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300"
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-primary-400/80 tracking-widest uppercase mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-primary-900/40 border border-primary-800/60 rounded-xl text-primary-50 placeholder-primary-500/40 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className={`w-full py-4 px-8 rounded-xl font-medium text-primary-50 transition-all duration-300 ${
                  formStatus === "submitting"
                    ? "bg-primary-900/50 border border-primary-800/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] cursor-pointer"
                }`}
              >
                {formStatus === "submitting" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : formStatus === "success" ? (
                  <span className="flex items-center justify-center gap-2 text-accent-cyan font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent Successfully!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                )}
              </button>
            </form>

            {formStatus === "success" && (
              <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl text-primary-300 text-sm">
                Thank you for reaching out! I&apos;ll get back to you as soon as possible.
              </div>
            )}
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-primary-800/30 text-center">
          <p className="font-mono text-xs text-primary-500/60 tracking-widest uppercase mb-4">
            JAICHARAN M &copy; {new Date().getFullYear()}
          </p>
          <p className="text-primary-400/50 text-sm">
            Built with React, Vite, Tailwind CSS & GSAP
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            {navigation.filter(nav => nav.id !== "home").map((nav) => (
              <a
                key={nav.id}
                href={nav.href}
                className="text-primary-400/50 hover:text-primary-300 transition-colors duration-300 text-sm font-mono"
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;