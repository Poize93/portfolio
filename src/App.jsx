import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects , UIDesigns, motionGraphics, graphicDesigns, digitalDesigns, digitalIllustrations} from "./data/projects";
import {
  // graphicDesign,
  uiCaseStudy,
  // digitalDesigns,
  skillsAndTools,
  aiWorkFlow
} from "./data/sections";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function scrollToId(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  const nextHash = `#${id}`;
  if (window.location.hash !== nextHash) history.pushState(null, "", nextHash);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Remove hash so nav links don't get "stuck" on same fragment.
  const nextUrl = `${window.location.pathname}${window.location.search}`;
  if (window.location.hash) history.pushState(null, "", nextUrl);
}

// Get Google Drive thumbnail from preview URL (carousel shows thumbnail; full video loads in popup)
function getDriveThumbnailUrl(previewUrl, size = "w400") {
  const m = previewUrl && previewUrl.match(/\/d\/([^/]+)/);
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=${size}` : previewUrl;
}

// Split name for logo-driven intro (like Melvin Winkeler: M / elvin / W / inkeler)
const INTRO_LINES = ["Shweta", "Dwivedi"];

function IntroLoader({ onComplete }) {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const scrollHintRef = useRef(null);
  const completedRef = useRef(false);

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

  // Fallback: dismiss on touch/scroll (fixes iOS where GSAP may not complete)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dismiss = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.style.visibility = "hidden";
      el.style.transition = "opacity 0.3s ease";
      onComplete();
    };

    el.addEventListener("touchstart", dismiss, { passive: true, once: true });
    const handleWheel = () => { dismiss(); };
    el.addEventListener("wheel", handleWheel, { passive: true, once: true });

    return () => {
      el.removeEventListener("touchstart", dismiss);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [onComplete]);

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
        {/* <p className="intro-scroll-hint" ref={scrollHintRef}>
          Scroll
        </p> */}
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
      <a
        href="#"
        className="nav-logo"
        ref={logoRef}
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
      >
        Shweta Dwivedi
      </a>
      <div className="nav-links">
        <a
          href="#motion-graphics"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("motion-graphics");
          }}
        >
          Work
        </a>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("about");
          }}
        >
          About
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("contact");
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

// Media popup modal – overlay + video (iframe) or image + close
function VideoModal({ isOpen, videoUrl, imageUrl, title, onClose }) {
  const isImage = !!imageUrl;

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
      aria-label={title || (isImage ? "Image" : "Video")}
    >
      <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className={`video-modal-player ${isImage ? "video-modal-player--image" : ""}`}>
          {isImage ? (
            <img src={imageUrl} alt={title || "Image"} className="video-modal-image" />
          ) : (
            <iframe
              src={videoUrl}
              title={title || "Video"}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          )}
        </div>
        {title && <p className="video-modal-title">{title}</p>}
      </div>
    </div>
  );
}

// Reusable section: title + auto-scrolling carousel with manual scroll
function CarouselSection({ id, title, subtitle, items, type = "card", onVideoCardClick, modalOpenRef }) {
  const isCard = type === "card";
  const isSkill = type === "skill";
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);
  const draggedRef = useRef(false);
  const [failedThumbnails, setFailedThumbnails] = useState(new Set());
  // Duplicate items for seamless infinite scroll
  const duplicated = [...items, ...items];

  const markThumbnailFailed = (key) => {
    setFailedThumbnails((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
  };

  // Auto-scroll + manual click-and-drag scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollPos = { value: 0 };
    let lastTime = performance.now();
    const pixelsPerSecond = 90;
    let isDragging = false;
    let isTouching = false;
    let pauseUntil = 0;
    let startX = 0;
    let startScrollLeft = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;

    const animate = (now) => {
      // Always advance clock to prevent jumps after pause
      const dt = now - lastTime;
      lastTime = now;

      if (
        isDragging ||
        isTouching ||
        now < pauseUntil ||
        (modalOpenRef && modalOpenRef.current)
      ) {
        autoScrollRef.current = requestAnimationFrame(animate);
        return;
      }
      const halfWidth = el.scrollWidth / 2;
      scrollPos.value += (pixelsPerSecond * dt) / 1000;
      if (scrollPos.value >= halfWidth) scrollPos.value -= halfWidth;
      el.scrollLeft = scrollPos.value;
      autoScrollRef.current = requestAnimationFrame(animate);
    };
    autoScrollRef.current = requestAnimationFrame(animate);

    const handleMouseDown = (e) => {
      isDragging = true;
      draggedRef.current = false;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      draggedRef.current = true;
      e.preventDefault();
      const dx = startX - e.clientX;
      const newScroll = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, startScrollLeft + dx));
      scrollPos.value = newScroll;
      el.scrollLeft = newScroll;
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const halfWidth = el.scrollWidth / 2;
      let pos = el.scrollLeft;
      if (pos >= halfWidth) pos -= halfWidth;
      scrollPos.value = pos;
      el.scrollLeft = pos;
      el.style.cursor = "";
      el.style.userSelect = "";
      requestAnimationFrame(() => { draggedRef.current = false; });
    };

    const handleMouseLeave = () => {
      if (isDragging) handleMouseUp();
    };

    const handleTouchStart = (e) => {
      isTouching = true;
      touchMoved = false;
      draggedRef.current = false;
      const t = e.touches && e.touches[0];
      if (t) {
        touchStartX = t.clientX;
        touchStartY = t.clientY;
      }
      pauseUntil = performance.now() + 2000;
    };

    const handleTouchMove = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      // Only treat as "drag" if it's primarily horizontal (prevents blocking vertical page scroll)
      if (!touchMoved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        touchMoved = true;
        draggedRef.current = true;
      }
      pauseUntil = performance.now() + 2000;
    };

    const handleTouchEnd = () => {
      isTouching = false;
      const halfWidth = el.scrollWidth / 2;
      let pos = el.scrollLeft;
      if (pos >= halfWidth) pos -= halfWidth;
      scrollPos.value = pos;
      el.scrollLeft = pos;
      pauseUntil = performance.now() + 2000;
      requestAnimationFrame(() => { draggedRef.current = false; });
    };

    const handleScroll = () => {
      const halfWidth = el.scrollWidth / 2;
      // Keep scrollLeft within first half (seamless because content is duplicated)
      if (el.scrollLeft >= halfWidth) el.scrollLeft -= halfWidth;
      scrollPos.value = el.scrollLeft;
    };

    const handleWheel = () => {
      // Trackpad/mouse horizontal scrolling should pause auto-scroll briefly
      pauseUntil = performance.now() + 1200;
    };

    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    el.addEventListener("scroll", handleScroll, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [items]);

  const handleCardClick = (item, e) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if ((item.video || item.image) && onVideoCardClick) {
      e.preventDefault();
      onVideoCardClick(item);
    }
  };

  return (
    <section className="work-section" id={id}>
      <div className="work-section-header" >
        <h2 className="section-title section-title--large m-auto" >{title}</h2>
        {subtitle && <p className="section-sub" >{subtitle}</p>}
      </div>
      <div
        ref={carouselRef}
        className="work-carousel work-carousel--auto"
        aria-label={title}
      >
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
                      {failedThumbnails.has(`v-${item.id}-${i}`) ? (
                        <iframe
                          src={item.video}
                          title={item.title}
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="project-card-video"
                        />
                      ) : (
                        <img
                          src={item.thumbnail || getDriveThumbnailUrl(item.video)}
                          alt=""
                          loading="lazy"
                          className="project-card-thumbnail"
                          onError={() => markThumbnailFailed(`v-${item.id}-${i}`)}
                        />
                      )}
                      <span className="project-card-play-hint">Click to watch</span>
                    </>
                  ) : (
                    <>
                      {failedThumbnails.has(`i-${item.id}-${i}`) ? (
                        <div
                          className="project-card-image-fallback"
                          style={{ background: item.color }}
                          aria-hidden
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt=""
                          loading="lazy"
                          onError={() => markThumbnailFailed(`i-${item.id}-${i}`)}
                        />
                      )}
                    </>
                  )}
                </div>
                {/* <div className="project-card-info">
                  {item.category && (
                    <span className="project-card-category">{item.category}</span>
                  )}
                  <h3 className="project-card-title">{item.title}</h3>
                  {item.year && (
                    <span className="project-card-year">{item.year}</span>
                  )}
                </div> */}
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
  const [videoModal, setVideoModal] = useState({ open: false, videoUrl: null, imageUrl: null, title: "" });
  const mainRef = useRef(null);
  const heroScrollRef = useRef(null);
  const modalOpenRef = useRef(false);
  modalOpenRef.current = videoModal.open;

  const openVideoModal = (item) => {
    if (!item) return;
    if (item.video) setVideoModal({ open: true, videoUrl: item.video, imageUrl: null, title: item.title || "" });
    else if (item.image) setVideoModal({ open: true, videoUrl: null, imageUrl: item.image, title: item.title || "" });
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
        videoUrl={videoModal.videoUrl}
        imageUrl={videoModal.imageUrl}
        title={videoModal.title}
        onClose={closeVideoModal}
      />
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}

      {introDone && (
        <div className="nav-wrap">
          <Nav scrolled={scrolled} />
        </div>
      )}

      <main className="main">
        <section className="hero">
          <h2 className="hero-title">
            <span className="hero-title-line">I'm Shweta Dwivedi</span>
          </h2>
          <p className="hero-tagline">
           A Motion , Graphic & Ui Designer crafting purposeful visuals that move , connect and communicate.
          </p>
          <a
            href="#contact"
            className="hero-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
          >
            Let's meet
          </a>
          {/* <p className="hero-scroll-hint" ref={heroScrollRef}>
            Scroll
          </p> */}
        </section>


           {/* About */}
           <section className="section section--mint" id="about">
          <h2 className="section-title section-title--large">About</h2>
          <p className="section-text section-text--large">
          I work across motion graphics, UI design, and digital branding, using tools like After Effects, Illustrator, Premiere Pro, Photoshop, and Figma. I love blending creativity with strategy-because good design shouldn’t just look beautiful, it should communicate.
          </p>
          <p className="section-text">
          From social campaigns to UI experiences and brand visuals, I design with intention, clarity, and a touch of bold storytelling.    </p>
          {/* <p className="section-text">
          Tools I use to bring ideas to life: After Effects , Illustrator , Photoshop, Premiere Pro , Figma</p> */}
        </section>
{/* 
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
          modalOpenRef={modalOpenRef}
        /> */}

        <CarouselSection
          id="motion-graphics"
          title="Motion Graphics"
          subtitle="Engaging animations, explainer videos, and branded visual content."
          items={motionGraphics.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
          onVideoCardClick={openVideoModal}
          modalOpenRef={modalOpenRef}
        />

        <CarouselSection
          id="graphic-design"
          title="Graphic Design"
          subtitle="Strategic social creatives, packaging, and marketing visuals."
          items={graphicDesigns.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
          onVideoCardClick={openVideoModal}
          modalOpenRef={modalOpenRef}
        />

        <CarouselSection
          id="ui-designs"
          title="UI Designs"
          subtitle="Clean, intuitive website and mobile interface designs."
          items={UIDesigns.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
          onVideoCardClick={openVideoModal}
          modalOpenRef={modalOpenRef}
        />

        <CarouselSection
          id="digital-designs"
          title="Digital Designs"
          subtitle="Web and digital experiences."
          items={digitalDesigns.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
          onVideoCardClick={openVideoModal}
          modalOpenRef={modalOpenRef}
        />

          <CarouselSection
          id="digital-illustrations"
          title="Digital Illustrations"
          subtitle="Web and digital experiences."
          items={digitalIllustrations.map((p) => ({
            ...p,
            link: p.link,
          }))}
          type="card"
          onVideoCardClick={openVideoModal}
          modalOpenRef={modalOpenRef}
        />

        

        <CarouselSection
          id="skills-tools"
          title="Skills and Tools"
          subtitle="What I use to bring ideas to life."
          items={skillsAndTools}
          type="skill"
          modalOpenRef={modalOpenRef}
        />


        <CarouselSection
          id="ai-workflow"
          title="AI Workflow"
          subtitle="Smart workflows and concept development using AI tools."
          items={aiWorkFlow}
          type="skill"
          modalOpenRef={modalOpenRef}
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
          Let's build  something meaningful together</p>
     
          <a href="mailto:shwetadwivedi882@gmail.com" className="contact-email">
          shwetadwivedi882@gmail.com
          </a>
          <div className="contact-links">
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
              Instagram
            </a> */}
            <a href="https://www.linkedin.com/in/shweta-dwivedi-6075b1224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a> */}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Shweta Dwivedi</span>
      </footer>
    </div>
  );
}

export default App;
