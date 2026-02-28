import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "./data/projects";
import {
  motionGraphics,
  graphicDesign,
  uiCaseStudy,
  digitalDesigns,
  skillsAndTools,
} from "./data/sections";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// Split name for logo-driven intro (like Melvin Winkeler: M / elvin / W / inkeler)
const INTRO_LINES = ["Shweta", "Sharma"];

function IntroLoader({ onComplete }) {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const scrollHintRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete });
      // Start with lines hidden (clip / translate)
      tl.set(linesRef.current, { y: "100%", overflow: "hidden" })
        .set(scrollHintRef.current, { opacity: 0 })
        // Stagger name lines in
        .to(linesRef.current[0], { y: "0%", duration: 0.9, ease: "power3.out" })
        .to(linesRef.current[1], { y: "0%", duration: 0.9, ease: "power3.out" }, "-=0.6")
        .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, "+=0.4")
        .to(containerRef.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=1.2")
        .set(containerRef.current, { pointerEvents: "none", visibility: "hidden" });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div className="intro-loader" ref={containerRef}>
      <div className="intro-inner">
        <div className="intro-name-wrap">
          {INTRO_LINES.map((line, i) => (
            <div
              key={line}
              className="intro-line-wrap"
              ref={(el) => (linesRef.current[i] = el)}
            >
              <h1 className="intro-name">{line}</h1>
            </div>
          ))}
        </div>
        <p className="intro-scroll-hint" ref={scrollHintRef}>
          Scroll
        </p>
      </div>
    </div>
  );
}

function Nav({ scrolled }) {
  const logoRef = useRef(null);

  useGSAP(
    () => {
      if (!logoRef.current) return;
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { dependencies: [] }
  );

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#" className="nav-logo" ref={logoRef}>
        Shweta Sharma
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

// Reusable section: title + auto-scrolling carousel (no scrollbar)
function CarouselSection({ id, title, subtitle, items, type = "card" }) {
  const isCard = type === "card";
  const isSkill = type === "skill";
  // Duplicate items for seamless infinite scroll
  const duplicated = [...items, ...items];

  return (
    <section className="work-section" id={id}>
      <div className="work-section-header">
        <h2 className="section-title section-title--large">{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      <div className="work-carousel work-carousel--auto" aria-label={title}>
        <div className="work-carousel-track work-carousel-track--auto">
          {isCard &&
            duplicated.map((item, i) => (
              <a
                key={`card-${item.id}-${i}`}
                href={item.link || "#"}
                className="project-card"
                style={{ "--card-color": item.color }}
              >
                <div className="project-card-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="project-card-info">
                  {item.category && (
                    <span className="project-card-category">{item.category}</span>
                  )}
                  <h3 className="project-card-title">{item.title}</h3>
                  {item.year && (
                    <span className="project-card-year">{item.year}</span>
                  )}
                </div>
              </a>
            ))}
          {isSkill &&
            duplicated.map((item, i) => (
              <div
                key={`skill-${item.id}-${i}`}
                className="skill-tile"
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const heroScrollRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade out hero scroll hint on scroll
  useGSAP(
    () => {
      if (!heroScrollRef.current) return;
      gsap.to(heroScrollRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "200px top",
          scrub: 0.5,
        },
      });
    },
    { scope: mainRef, dependencies: [introDone] }
  );

  return (
    <div className="app" ref={mainRef}>
      <IntroLoader onComplete={() => setIntroDone(true)} />

      {introDone && (
        <div className="nav-wrap">
          <Nav scrolled={scrolled} />
        </div>
      )}

      <main className="main">
        <section className="hero">
          <h2 className="hero-title">
            <span className="hero-title-line">I'm Shweta Sharma</span>
          </h2>
          <p className="hero-tagline">
           A Motion , Graphic & Ui Designer crafting purposeful visuals that move , connect and communicate.
          </p>
          <a href="#work" className="hero-cta">
            Let's meet
          </a>
          <p className="hero-scroll-hint" ref={heroScrollRef}>
            Scroll
          </p>
        </section>


           {/* About */}
           <section className="section section--mint" id="about">
          <h2 className="section-title section-title--large">About</h2>
          <p className="section-text section-text--large">
            I don't just design visuals - I design experiences.
          </p>
          <p className="section-text">
           With a background in motion graphics, branding and UI designs , I blend storytelling with structure. Whether It's a logo that speaks , a frame that moves , or an interfacethat flows - I design with intension.
          </p>
          <p className="section-text">
          Tools I use to bring ideas to life: After Effects , Illustrator , Photoshop, Premiere Pro , Figma</p>
        </section>

        <CarouselSection
          id="work"
          title="Selected Work"
          subtitle="A selection of recent projects across branding, digital, and motion."
          items={projects.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
        />

        <CarouselSection
          id="motion-graphics"
          title="Motion Graphics"
          subtitle="Motion and animation work."
          items={motionGraphics}
          type="card"
        />

        <CarouselSection
          id="graphic-design"
          title="Graphic Design"
          subtitle="Branding, editorial, and print."
          items={graphicDesign}
          type="card"
        />

        <CarouselSection
          id="ui-case-study"
          title="UI Case Study"
          subtitle="Interface and experience design."
          items={uiCaseStudy}
          type="card"
        />

        <CarouselSection
          id="digital-designs"
          title="Digital Designs"
          subtitle="Web and digital experiences."
          items={digitalDesigns}
          type="card"
        />

        <CarouselSection
          id="skills-tools"
          title="Skills and Tools"
          subtitle="What I use to bring ideas to life."
          items={skillsAndTools}
          type="skill"
        />

     

        <section className="section section--lavender">
          <h2 className="section-title section-title--large">Services</h2>
          <ul className="services-list">
            <li>Brand identity & art direction</li>
            <li>Web design & development</li>
            <li>Motion design & animation</li>
            <li>Editorial & print</li>
          </ul>
        </section>

        <section className="section section--cream" id="contact">
          <h2 className="section-title section-title--large">
            Let's Create
          </h2>
          <p className="section-text">
          have a Project in mind?</p> <p className="section-text">
          Let's build together something meaningful togther</p>
     
          <a href="mailto:hello@shwetasharma.com" className="contact-email">
            hello@shwetasharma.com
          </a>
          <div className="contact-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Shweta Sharma</span>
      </footer>
    </div>
  );
}

export default App;
