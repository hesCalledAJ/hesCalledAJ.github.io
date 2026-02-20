const { useEffect, useRef, useState } = React;
const { motion, useScroll, useTransform, useSpring } = window.framerMotion;

function App() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const logoUrl =
    "https://raw.githubusercontent.com/hesCalledAJ/hesCalledAJ/main/logo-rd.png";

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 350, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 120;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-stone-200 font-sans">
      {/* Sticky Hero */}
      <div className="sticky top-0 z-50 max-w-6xl mx-auto px-4 pt-6">
        <motion.div
          className="relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#242424] via-[#121212] to-[#080808] border border-white/10 shadow-2xl"
          style={{
            height: scrollProgress > 0.9 ? "80px" : `${85 - scrollProgress * 65}vh`,
            minHeight: "80px",
            borderRadius: "1.5rem",
          }}
        >
          <PatternBackground
            logoUrl={logoUrl}
            opacity={Math.max(0.4 - scrollProgress * 0.5, 0)}
            scrollProgress={scrollProgress}
          />

          <div className="absolute inset-0 bg-black/20" />

          {/* Expanded */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
            style={{
              opacity: 1 - scrollProgress * 1.5,
              pointerEvents: scrollProgress < 0.5 ? "auto" : "none",
              transform: `translateY(${-scrollProgress * 50}px)`,
            }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-b from-amber-400 to-amber-700 p-1">
              <img
                src="https://avatars.githubusercontent.com/u/112819193"
                className="w-full h-full rounded-full object-cover bg-stone-900 p-1"
              />
            </div>

            <h1 className="mt-6 text-5xl font-bold bg-gradient-to-b from-stone-50 to-stone-400 bg-clip-text text-transparent">
              Ali Jafari
            </h1>

            <p className="mt-3 text-lg text-stone-300">
              Android & Mobile Developer
            </p>

            <div className="mt-10 flex gap-4">
              <HeroButton onClick={() => scrollTo("about")}>About</HeroButton>
              <HeroButton onClick={() => scrollTo("projects")}>Projects</HeroButton>
              <HeroButton onClick={() => scrollTo("contact")}>Contact</HeroButton>
            </div>
          </div>

          {/* Navbar */}
          <div
            className="relative z-20 w-full px-6 flex items-center justify-between h-20"
            style={{
              opacity: (scrollProgress - 0.7) * 3.3,
              pointerEvents: scrollProgress > 0.8 ? "auto" : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src="https://avatars.githubusercontent.com/u/112819193"
                className="w-11 h-11 rounded-full"
              />
              <div>
                <div className="font-bold">Ali Jafari</div>
                <div className="text-xs text-amber-500">Android Developer</div>
              </div>
            </div>

            <div className="flex gap-2">
              <NavButton onClick={() => scrollTo("about")}>About</NavButton>
              <NavButton onClick={() => scrollTo("projects")}>Projects</NavButton>
              <NavButton onClick={() => scrollTo("contact")}>Contact</NavButton>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ height: 450 }} />

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-32">
        <Section id="about" title="About">
          Solo Android dev. Kotlin. Shipping apps.
        </Section>
        <Section id="projects" title="Projects">
          Projects here.
        </Section>
        <Section id="contact" title="Contact">
          Links here.
        </Section>
      </main>
    </div>
  );
}

function HeroButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20">
      {children}
    </button>
  );
}

function NavButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-lg bg-stone-800">
      {children}
    </button>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id}>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      {children}
    </section>
  );
}

function PatternBackground({ logoUrl, opacity, scrollProgress }) {
  const scale = 1 - scrollProgress * 0.3;
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity, transform: `scale(${scale})` }}
    />
  );
}

/* React 18 mount */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
