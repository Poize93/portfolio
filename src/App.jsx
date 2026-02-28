import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects , motionGraphics, graphicDesigns} from "./data/projects";
import {
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

// Video popup modal – overlay + iframe + close
function VideoModal({ isOpen, videoUrl, title, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="video-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video"}
    >
      <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>
        <div className="video-modal-player">
          <iframe
            src={videoUrl}
            title={title || "Video"}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        {title && <p className="video-modal-title">{title}</p>}
      </div>
    </div>
  );
}

// Reusable section: title + auto-scrolling carousel (no scrollbar)
function CarouselSection({ id, title, subtitle, items, type = "card", onVideoCardClick }) {
  const isCard = type === "card";
  const isSkill = type === "skill";
  // Duplicate items for seamless infinite scroll
  const duplicated = [...items, ...items];

  const handleCardClick = (item, e) => {
    if (item.video && onVideoCardClick) {
      e.preventDefault();
      onVideoCardClick(item);
    }
  };

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
                className="project-card project-card--video-wrap"
                style={{ "--card-color": item.color }}
                onClick={(e) => handleCardClick(item, e)}
              >
                <div className={`project-card-image ${item.video ? "project-card-image--video" : ""}`}>
                  {item.video ? (
                    <>
                      <iframe
                        src={item.video}
                        title={item.title}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="project-card-video"
                      />
                      <span className="project-card-play-hint">Click to watch</span>
                    </>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                  )}
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
  const [videoModal, setVideoModal] = useState({ open: false, url: null, title: "" });
  const mainRef = useRef(null);
  const heroScrollRef = useRef(null);

  const openVideoModal = (item) => {
    if (item?.video) setVideoModal({ open: true, url: item.video, title: item.title || "" });
  };
  const closeVideoModal = () => setVideoModal((m) => ({ ...m, open: false }));

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
      <VideoModal
        isOpen={videoModal.open}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={closeVideoModal}
      />
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
          onVideoCardClick={openVideoModal}
        />

        <CarouselSection
          id="motion-graphics"
          title="Motion Graphics"
          subtitle="Motion and animation work."
          items={motionGraphics.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
        />

        <CarouselSection
          id="graphic-design"
          title="Graphic Design"
          subtitle="Branding, editorial, and print."
          items={graphicDesigns.map((p) => ({
            ...p,
            link: p.link,
          }))}
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
