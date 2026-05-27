import { useState, useEffect, useRef } from "react";
import heroImg from "./assets/hero.jpeg";

// ─── Particle System ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const COUNT = 120;
    const COLORS = ["#00f5ff", "#7b2ff7", "#ff006e", "#ffffff"];

    for (let i = 0; i < COUNT; i++) {
      particles.current.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const handleMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const ps = particles.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx2 = p.x - q.x;
          const dy2 = p.y - q.y;
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d2 / 100) * 0.25;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
function TiltCard({ children, style, className }) {
  const cardRef = useRef(null);
  const handleMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -12;
    const rotY = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
  };
  const handleLeave = () => {
    cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: "transform 0.15s ease",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticBtn({ children, onClick, style }) {
  const btnRef = useRef(null);
  const handleMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const handleLeave = () => {
    btnRef.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ end, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = Math.ceil(end / 60);
          const t = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(t); }
            else setCount(start);
          }, 20);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontSize: "clamp(2.5rem,5vw,4rem)",
        fontFamily: "'Orbitron', monospace",
        background: "linear-gradient(135deg,#00f5ff,#7b2ff7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 900,
      }}>{count}+</div>
      <div style={{ color: "#a0a0c0", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

// ─── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchText({ text, style }) {
  return (
    <span
      data-text={text}
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      <style>{`
        @keyframes glitch1 {
          0%,100%{clip-path:inset(0 0 95% 0);transform:translate(-2px,0)}
          20%{clip-path:inset(30% 0 50% 0);transform:translate(2px,0)}
          40%{clip-path:inset(60% 0 20% 0);transform:translate(-1px,0)}
          60%{clip-path:inset(80% 0 5% 0);transform:translate(1px,0)}
          80%{clip-path:inset(10% 0 70% 0);transform:translate(-2px,0)}
        }
        @keyframes glitch2 {
          0%,100%{clip-path:inset(50% 0 30% 0);transform:translate(2px,0)}
          20%{clip-path:inset(10% 0 80% 0);transform:translate(-2px,0)}
          40%{clip-path:inset(70% 0 15% 0);transform:translate(1px,0)}
          60%{clip-path:inset(25% 0 55% 0);transform:translate(-1px,0)}
          80%{clip-path:inset(85% 0 3% 0);transform:translate(2px,0)}
        }
      `}</style>
      {text}
      <span
        aria-hidden
        style={{
          content: `"${text}"`,
          position: "absolute",
          top: 0, left: 0,
          color: "#00f5ff",
          animation: "glitch1 3s infinite linear",
        }}
      >{text}</span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: 0,
          color: "#ff006e",
          animation: "glitch2 3s infinite linear 0.1s",
        }}
      >{text}</span>
    </span>
  );
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const transforms = { up: "translateY(60px)", down: "translateY(-60px)", left: "translateX(-60px)", right: "translateX(60px)" };

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translate(0)" : transforms[direction],
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Typing Effect ────────────────────────────────────────────────────────────
function TypeWriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), 1500);
        else setCi(ci + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) { setDeleting(false); setWi((wi + 1) % words.length); setCi(0); }
        else setCi(ci - 1);
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [ci, deleting, wi, words]);

  return (
    <span>
      {display}
      <span style={{ animation: "blink 1s infinite", borderRight: "3px solid #00f5ff" }}>&nbsp;</span>
    </span>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ skill, level, color, delay }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(level), 200); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ color: "#e0e0ff", fontFamily: "'Orbitron', monospace", fontSize: "0.8rem", letterSpacing: "0.1em" }}>{skill}</span>
        <span style={{ color: color, fontFamily: "'Orbitron', monospace", fontSize: "0.8rem" }}>{level}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${w}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: "3px",
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
          boxShadow: `0 0 12px ${color}`,
        }} />
      </div>
    </div>
  );
}

// ─── 3D Rotating Cube (CSS) ───────────────────────────────────────────────────
function RotatingCube({ techs }) {
  const faces = techs.slice(0, 6);
  const faceStyles = [
    { transform: "translateZ(70px)" },
    { transform: "translateZ(-70px) rotateY(180deg)" },
    { transform: "rotateY(90deg) translateZ(70px)" },
    { transform: "rotateY(-90deg) translateZ(70px)" },
    { transform: "rotateX(90deg) translateZ(70px)" },
    { transform: "rotateX(-90deg) translateZ(70px)" },
  ];

  return (
    <div style={{ perspective: "600px", width: "140px", height: "140px", margin: "0 auto" }}>
      <style>{`
        @keyframes rotateCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
      <div style={{
        width: "140px", height: "140px",
        position: "relative",
        transformStyle: "preserve-3d",
        animation: "rotateCube 12s linear infinite",
      }}>
        {faceStyles.map((fs, i) => (
          <div key={i} style={{
            position: "absolute",
            width: "140px", height: "140px",
            border: "1px solid rgba(0,245,255,0.3)",
            background: "rgba(10,10,30,0.85)",
            backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem",
            fontFamily: "'Orbitron', monospace",
            color: "#00f5ff",
            letterSpacing: "0.05em",
            ...fs,
          }}>
            {faces[i] || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const colors = ["#00f5ff", "#7b2ff7", "#ff006e"];
  const color = colors[index % 3];

  return (
    <Reveal delay={index * 0.15} direction="up">
      <TiltCard style={{ height: "100%" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "rgba(8,8,25,0.9)",
            border: `1px solid ${hovered ? color : "rgba(255,255,255,0.08)"}`,
            borderRadius: "16px",
            padding: "2rem",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.3s ease",
            boxShadow: hovered ? `0 0 40px ${color}22, 0 20px 60px rgba(0,0,0,0.5)` : "0 4px 30px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
          <div style={{
            width: "48px", height: "48px",
            borderRadius: "12px",
            background: `${color}18`,
            border: `1px solid ${color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "1.2rem",
            fontSize: "1.4rem",
          }}>
            {project.icon}
          </div>
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "1rem",
            color: "#fff",
            marginBottom: "0.8rem",
            letterSpacing: "0.05em",
          }}>{project.title}</h3>
          <p style={{ color: "#8888aa", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.2rem" }}>{project.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
            {project.stack.map((t) => (
              <span key={t} style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                background: `${color}12`,
                border: `1px solid ${color}30`,
                color: color,
                fontSize: "0.7rem",
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.05em",
              }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {project.metrics.map((m) => (
              <span key={m} style={{
                fontSize: "0.72rem",
                color: "#6060a0",
                background: "rgba(255,255,255,0.04)",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>✦ {m}</span>
            ))}
          </div>
          {project.demoUrl ? (
            <div style={{ marginTop: "1.4rem" }}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  color: "#fff",
                  background: `linear-gradient(135deg, ${color}, ${color}99)`,
                  boxShadow: hovered ? `0 0 30px ${color}44` : "none",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                LIVE DEMO <span aria-hidden="true">↗</span>
              </a>
            </div>
          ) : null}
        </div>
      </TiltCard>
    </Reveal>
  );
}

// ─── Floating Orb ─────────────────────────────────────────────────────────────
function FloatingOrb({ size, color, x, y, delay }) {
  return (
    <div style={{
      position: "fixed",
      width: size, height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, ${color}40, ${color}05)`,
      left: x, top: y,
      filter: "blur(60px)",
      animation: `float${delay % 3} ${8 + delay}s ease-in-out infinite`,
      pointerEvents: "none",
      zIndex: 0,
    }} />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "1rem 2rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(4,4,15,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,245,255,0.1)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "1.2rem",
        fontWeight: 900,
        background: "linear-gradient(135deg,#00f5ff,#7b2ff7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.1em",
      }}>JTV</div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setActive(l)}
            style={{
              color: active === l ? "#00f5ff" : "#8080aa",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              position: "relative",
            }}
          >
            {l}
            {active === l && (
              <span style={{
                position: "absolute", bottom: "-4px", left: 0, right: 0,
                height: "1px",
                background: "linear-gradient(90deg,transparent,#00f5ff,transparent)",
              }} />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    let raf;
    const animate = () => {
      cursorX.current += (targetX.current - cursorX.current) * 0.12;
      cursorY.current += (targetY.current - cursorY.current) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX.current}px`;
        cursorRef.current.style.top = `${cursorY.current}px`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${targetX.current}px`;
        cursorDotRef.current.style.top = `${targetY.current}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const projects = [
    {
      icon: "⚡",
      title: "ZENTODO — Task Manager",
      desc: "Full-stack task management system with JWT auth, nested subtasks, 10+ REST API endpoints. Achieved ~25% faster API responses.",
      stack: ["React", "Django", "DRF", "JWT", "SQLite"],
      metrics: ["25% faster", "30% less data", "CRUD + subtasks"],
      demoUrl: "https://todo-blond-psi.vercel.app/",
    },
    {
      icon: "🔗",
      title: "BLOCKCHAIN FAKE PRODUCT DETECTION",
      desc: "Decentralized product authentication on Ethereum Sepolia. 100+ test records, 0% false-pass rate with NFC cryptographic hash verification.",
      stack: ["React", "Solidity", "Web3.js", "Node.js", "MySQL"],
      metrics: ["0% false-pass", "sub-2s queries", "NFC verified"],
      demoUrl: "https://supply-chain-1-0rut.onrender.com/",
    },
    {
      icon: "🪖",
      title: "SMART HELMET ALERT SYSTEM",
      desc: "Real-time sensor data portal with GPS tracking and emergency alerts triggered within 500ms of threshold breach.",
      stack: ["PHP", "MySQL", "JavaScript", "OpenStreetMap", "REST"],
      metrics: ["500ms alerts", "Live GPS", "4 tables"],
    },
    {
      icon: "🛒",
      title: "SHOP — E-Commerce Demo",
      desc: "E-commerce storefront demo with product browsing and a clean shopping flow.",
      stack: ["React", "Vercel"],
      metrics: ["Live demo", "Storefront", "Products"],
      demoUrl: "https://shop-bylx1zw0f-jerintvs-projects.vercel.app/",
    },
    {
      icon: "🛍️",
      title: "SHOPPING — Products Page",
      desc: "Shopping catalog demo focused on product listing and navigation.",
      stack: ["React", "Vercel"],
      metrics: ["Catalog", "Products", "Live demo"],
      demoUrl: "https://shopping-rho-ruby.vercel.app/products",
    },
    {
      icon: "🧾",
      title: "IIP — Web App Demo",
      desc: "Web application demo deployed on Vercel.",
      stack: ["React", "Vercel"],
      metrics: ["Live demo", "Web app", "Deployed"],
      demoUrl: "https://iip-nine.vercel.app/",
    },
  ];

  const skills = [
    { skill: "React / Frontend", level: 90, color: "#00f5ff", delay: 0 },
    { skill: "Django / Python", level: 85, color: "#7b2ff7", delay: 0.1 },
    { skill: "Node.js / Express", level: 78, color: "#ff006e", delay: 0.2 },
    { skill: "Blockchain / Solidity", level: 72, color: "#ffd700", delay: 0.3 },
    { skill: "SQL / Databases", level: 82, color: "#00ff88", delay: 0.4 },
    { skill: "REST API Design", level: 88, color: "#ff8c00", delay: 0.5 },
  ];

  const techCube = ["React", "Django", "Solidity", "Node.js", "Web3.js", "MySQL"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04040f",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
      cursor: "none",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #04040f; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#00f5ff,#7b2ff7); border-radius: 2px; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float0 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(30px,-40px) scale(1.05)}
          66%{transform:translate(-20px,20px) scale(0.95)}
        }
        @keyframes float1 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(-40px,30px) scale(1.08)}
          66%{transform:translate(25px,-25px) scale(0.92)}
        }
        @keyframes float2 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(20px,40px) scale(0.97)}
          66%{transform:translate(-35px,-20px) scale(1.03)}
        }
        @keyframes heroFloat {
          0%,100%{transform:translateY(0px) rotate(0deg)}
          25%{transform:translateY(-15px) rotate(1deg)}
          75%{transform:translateY(8px) rotate(-1deg)}
        }
        @keyframes pulse {
          0%,100%{box-shadow:0 0 20px #00f5ff44}
          50%{box-shadow:0 0 60px #00f5ff88, 0 0 100px #00f5ff22}
        }
        @keyframes scanline {
          0%{top:-10%} 100%{top:110%}
        }
        @keyframes spin {
          from{transform:rotate(0deg)} to{transform:rotate(360deg)}
        }
        @keyframes fadeInUp {
          from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)}
        }
        @keyframes ringPulse {
          0%{transform:scale(1);opacity:0.5}
          100%{transform:scale(2.5);opacity:0}
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorDotRef} style={{
        position: "fixed",
        width: "6px", height: "6px",
        background: "#00f5ff",
        borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 9999,
        boxShadow: "0 0 10px #00f5ff",
      }} />
      <div ref={cursorRef} style={{
        position: "fixed",
        width: "40px", height: "40px",
        border: "1px solid rgba(0,245,255,0.5)",
        borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 9998,
        transition: "width 0.3s, height 0.3s, border-color 0.3s",
      }} />

      {/* Background Orbs */}
      <FloatingOrb size="600px" color="#7b2ff7" x="-100px" y="-100px" delay={0} />
      <FloatingOrb size="400px" color="#00f5ff" x="60%" y="30%" delay={1} />
      <FloatingOrb size="500px" color="#ff006e" x="80%" y="70%" delay={2} />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Nav */}
      <Nav active={active} setActive={setActive} />

      {/* ─── HERO ─────────────────────────────────────── */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        padding: "2rem",
      }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "2rem", textAlign: "center", position: "relative", zIndex: 1,
          animation: "fadeInUp 1s ease both",
        }}>
          {/* Avatar */}
          <div style={{ position: "relative", animation: "heroFloat 6s ease-in-out infinite" }}>
            <div style={{
              width: "180px", height: "180px",
              borderRadius: "50%",
              border: "2px solid rgba(0,245,255,0.4)",
              padding: "4px",
              animation: "pulse 3s ease-in-out infinite",
              position: "relative",
            }}>
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#0d0d2b,#1a0a3b)",
                overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img
                  src={heroImg}
                  alt="Jerin T V"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    display: "block",
                  }}
                />
              </div>
              {/* Scanline effect */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                overflow: "hidden",
                pointerEvents: "none",
              }}>
                <div style={{
                  position: "absolute", left: 0, right: 0,
                  height: "20%",
                  background: "linear-gradient(transparent,rgba(0,245,255,0.08),transparent)",
                  animation: "scanline 3s linear infinite",
                }} />
              </div>
            </div>
            {/* Pulse rings */}
            {[0, 0.5, 1].map((d, i) => (
              <div key={i} style={{
                position: "absolute",
                inset: `-${20 + i * 15}px`,
                borderRadius: "50%",
                border: "1px solid rgba(0,245,255,0.15)",
                animation: `ringPulse 3s ease-out infinite`,
                animationDelay: `${d}s`,
              }} />
            ))}
          </div>

          {/* Status Badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: "rgba(0,255,100,0.08)",
            border: "1px solid rgba(0,255,100,0.25)",
            borderRadius: "100px",
            fontSize: "0.75rem",
            fontFamily: "'Orbitron', monospace",
            letterSpacing: "0.1em",
            color: "#00ff88",
          }}>
            <span style={{
              width: "7px", height: "7px",
              borderRadius: "50%",
              background: "#00ff88",
              boxShadow: "0 0 8px #00ff88",
              animation: "blink 2s infinite",
            }} />
            AVAILABLE FOR HIRE
          </div>

          {/* Main Title */}
          <div>
            <div style={{
              fontSize: "clamp(0.7rem,1.5vw,0.9rem)",
              letterSpacing: "0.3em",
              color: "#00f5ff",
              fontFamily: "'Orbitron', monospace",
              marginBottom: "0.8rem",
              textTransform: "uppercase",
            }}>
              Full Stack Developer
            </div>
            <h1 style={{
              fontSize: "clamp(3rem,8vw,7rem)",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}>
              <GlitchText text="JERIN T V" style={{
                background: "linear-gradient(135deg,#ffffff 0%,#00f5ff 50%,#7b2ff7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }} />
            </h1>
            <div style={{
              fontSize: "clamp(1rem,2.5vw,1.5rem)",
              color: "#6060a0",
              marginTop: "0.8rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
            }}>
              &gt; <TypeWriter words={["React Developer", "Django Backend", "Blockchain Builder", "UI/UX Craftsman", "API Architect"]} />
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
            <MagneticBtn
              onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "0.9rem 2.2rem",
                background: "linear-gradient(135deg,#00f5ff,#7b2ff7)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                boxShadow: "0 0 30px rgba(0,245,255,0.3)",
              }}
            >
              VIEW PROJECTS ⚡
            </MagneticBtn>
            <MagneticBtn
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "0.9rem 2.2rem",
                background: "transparent",
                border: "1px solid rgba(0,245,255,0.4)",
                borderRadius: "8px",
                color: "#00f5ff",
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              HIRE ME →
            </MagneticBtn>
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: "2rem",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
            color: "#4040606",
            animation: "float0 3s ease-in-out infinite",
          }}>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#404060" }}>SCROLL</span>
            <div style={{
              width: "1px", height: "40px",
              background: "linear-gradient(#00f5ff, transparent)",
            }} />
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────── */}
      <section style={{
        padding: "4rem 2rem",
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "2rem",
        }}>
          <Counter end={3} label="Live Projects" />
          <Counter end={25} label="API Endpoints" />
          <Counter end={100} label="Test Records" />
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────── */}
      <section id="about" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "0.7rem", letterSpacing: "0.3em",
              color: "#00f5ff", fontFamily: "'Orbitron', monospace",
              marginBottom: "0.5rem", textTransform: "uppercase",
            }}>// ABOUT ME</div>
            <h2 style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              marginBottom: "3rem",
              background: "linear-gradient(135deg,#fff,#8080cc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Crafting Digital<br />Experiences</h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}>
            <Reveal direction="left">
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg,transparent,#00f5ff,#7b2ff7,transparent)",
                }} />
                <p style={{
                  color: "#9090b8",
                  lineHeight: 1.9,
                  fontSize: "0.95rem",
                  marginBottom: "1.5rem",
                }}>
                  I'm a <span style={{ color: "#00f5ff" }}>Full Stack Developer</span> from Kerala, India, graduating in May 2026 with a CGPA of 8.68. I build production-grade applications that are fast, scalable, and beautiful.
                </p>
                <p style={{
                  color: "#9090b8",
                  lineHeight: 1.9,
                  fontSize: "0.95rem",
                  marginBottom: "2rem",
                }}>
                  From RESTful APIs to smart contracts on the Ethereum blockchain, I love solving hard problems across the full stack. I believe great software feels <span style={{ color: "#7b2ff7" }}>alive</span>.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {["React", "Django", "Solidity", "Node.js"].map((t) => (
                    <span key={t} style={{
                      padding: "0.3rem 0.8rem",
                      background: "rgba(0,245,255,0.06)",
                      border: "1px solid rgba(0,245,255,0.2)",
                      borderRadius: "6px",
                      color: "#00f5ff",
                      fontSize: "0.75rem",
                      fontFamily: "'Orbitron', monospace",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <RotatingCube techs={techCube} />
                </div>
                <p style={{
                  fontSize: "0.72rem",
                  fontFamily: "'Orbitron', monospace",
                  letterSpacing: "0.1em",
                  color: "#404060",
                }}>TECH STACK • ROTATING 3D</p>
                <div style={{ marginTop: "2rem" }}>
                  <div style={{
                    padding: "1.5rem",
                    background: "rgba(123,47,247,0.06)",
                    border: "1px solid rgba(123,47,247,0.2)",
                    borderRadius: "12px",
                  }}>
                    <div style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: "#7b2ff7",
                      marginBottom: "0.3rem",
                    }}>8.68</div>
                    <div style={{ color: "#6060a0", fontSize: "0.78rem", letterSpacing: "0.1em" }}>CGPA / BTech CSE</div>
                    <div style={{ fontSize: "0.7rem", marginTop: "0.3rem", color: "#404050" }}>College of Engineering Thalassery</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────── */}
      <section id="skills" style={{
        padding: "6rem 2rem",
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.01)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "0.7rem", letterSpacing: "0.3em",
              color: "#7b2ff7", fontFamily: "'Orbitron', monospace",
              marginBottom: "0.5rem",
            }}>// TECHNICAL SKILLS</div>
            <h2 style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              marginBottom: "3rem",
              background: "linear-gradient(135deg,#fff,#8080cc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Weapons of<br />Choice</h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "3rem",
          }}>
            <div>
              {skills.slice(0, 3).map((s) => (
                <SkillBar key={s.skill} {...s} />
              ))}
            </div>
            <div>
              {skills.slice(3).map((s) => (
                <SkillBar key={s.skill} {...s} />
              ))}
            </div>
          </div>

          {/* Tech badges */}
          <Reveal delay={0.3}>
            <div style={{
              marginTop: "3rem",
              display: "flex", flexWrap: "wrap", gap: "0.8rem",
              justifyContent: "center",
            }}>
              {["JavaScript ES6+", "Python", "PHP", "SQL", "HTML5", "CSS3", "Solidity", "Git", "Postman", "Figma", "Vercel", "JWT"].map((t) => (
                <TiltCard key={t}>
                  <div style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#8080aa",
                    transition: "all 0.3s ease",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#00f5ff55"; e.currentTarget.style.color = "#00f5ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#8080aa"; }}
                  >
                    {t}
                  </div>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────── */}
      <section id="projects" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "0.7rem", letterSpacing: "0.3em",
              color: "#ff006e", fontFamily: "'Orbitron', monospace",
              marginBottom: "0.5rem",
            }}>// FEATURED PROJECTS</div>
            <h2 style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              marginBottom: "3rem",
              background: "linear-gradient(135deg,#fff,#8080cc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Things I've<br />Built</h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "1.5rem",
          }}>
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ───────────────────────────── */}
      <section style={{ padding: "4rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "0.7rem", letterSpacing: "0.3em",
              color: "#ffd700", fontFamily: "'Orbitron', monospace",
              marginBottom: "2rem", textTransform: "uppercase",
            }}>// Certifications</div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1rem" }}>
            {[
              { title: "Software Development", org: "LinkedIn Learning", year: "2025", color: "#0077b5" },
              { title: "Full Stack Developer", org: "Simplilearn", year: "2024", color: "#ff6b35" },
              { title: "Python Programming", org: "GeeksforGeeks", year: "2024", color: "#2f8d46" },
            ].map((cert, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <TiltCard>
                  <div style={{
                    padding: "1.5rem",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px",
                    borderLeft: `3px solid ${cert.color}`,
                  }}>
                    <div style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.8rem",
                      color: "#fff",
                      marginBottom: "0.3rem",
                    }}>{cert.title}</div>
                    <div style={{ color: cert.color, fontSize: "0.72rem", marginBottom: "0.2rem" }}>{cert.org}</div>
                    <div style={{ color: "#404060", fontSize: "0.68rem" }}>{cert.year}</div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────── */}
      <section id="contact" style={{
        padding: "6rem 2rem",
        position: "relative", zIndex: 1,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "0.7rem", letterSpacing: "0.3em",
              color: "#00f5ff", fontFamily: "'Orbitron', monospace",
              marginBottom: "0.5rem",
            }}>// GET IN TOUCH</div>
            <h2 style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg,#fff,#8080cc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Let's Build<br />Something Epic</h2>
            <p style={{ color: "#6060a0", marginBottom: "3rem", lineHeight: 1.8 }}>
              Seeking entry-level Software Developer roles. Available immediately. Let's connect and create something extraordinary.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
              marginBottom: "2rem",
            }}>
              {[
                { icon: "📧", label: "Email", value: "jerintv0173@gmail.com", href: "mailto:jerintv0173@gmail.com" },
                { icon: "📱", label: "Phone", value: "+91-7994340173", href: "tel:+917994340173" },
                { icon: "💼", label: "LinkedIn", value: "jerin-t-v", href: "https://linkedin.com/in/jerin-t-v" },
                { icon: "💻", label: "GitHub", value: "JerinTV", href: "https://github.com/JerinTV" },
              ].map((c) => (
                <TiltCard key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{
                      padding: "1.5rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#00f5ff44"; e.currentTarget.style.background = "rgba(0,245,255,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                    >
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
                      <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", fontFamily: "'Orbitron', monospace", color: "#404060", marginBottom: "0.3rem" }}>{c.label}</div>
                      <div style={{ color: "#00f5ff", fontSize: "0.78rem", fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
                    </div>
                  </a>
                </TiltCard>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <MagneticBtn
              onClick={() => window.open("mailto:jerintv0173@gmail.com")}
              style={{
                padding: "1.1rem 3rem",
                background: "linear-gradient(135deg,#00f5ff,#7b2ff7)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                boxShadow: "0 0 40px rgba(0,245,255,0.25), 0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              SEND MESSAGE ✉️
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────── */}
      <footer style={{
        padding: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.65rem",
          color: "#303050",
          letterSpacing: "0.2em",
        }}>
          © 2026 JERIN T V • BUILT WITH REACT • KANNUR, KERALA
        </div>
      </footer>
    </div>
  );
}
