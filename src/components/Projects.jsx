import project1 from "../assets/project1.jpeg";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import { FaArrowRight } from "react-icons/fa";

function Projects() {
  const isExternalLink = (url) => typeof url === "string" && url.startsWith("http");
  const openExternal = (url) => {
    if (!isExternalLink(url)) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const projects = [
    {
      title: "Smart Helmet Dashboard",
      category: "IoT Product Experience",
      description:
        "A real-time monitoring interface with speed insights, GPS updates, and safety feedback designed for instant rider awareness.",
      image: project1,
      tech: ["UX", "JavaScript", "PHP", "MySQL", "ESP32"],
      live: "#",
      github: "#",
      featured: true,
    },
    {
      title: "Portfolio Website",
      category: "Brand and Personal Identity",
      description:
        "A premium portfolio system with animated storytelling, layered visuals, and responsive behavior tuned for recruiter impact.",
      image: project2,
      tech: ["React", "CSS", "Interaction Design"],
      live: "https://portfolio1-rust-omega.vercel.app",
      github: "https://github.com/JerinTV/portfolio_1.git",
      featured: false,
    },
    {
      title: "Blockchain Fake Product Detection",
      category: "Trust and Verification",
      description:
        "A blockchain-backed experience that verifies product authenticity through a transparent flow and smart contract logic.",
      image: project3,
      tech: ["Blockchain", "Solidity", "React", "Node.js"],
      live: "https://blockchain-hu7vz6pab-jerintvs-projects.vercel.app",
      github: "https://github.com/JerinTV/blockchain.git",
      featured: false,
    },
    {
      title: "Zentode Smart To-Do App",
      category: "Productivity UX",
      description:
        "A focused task experience with clean layout, quick interactions, and local-first behavior for daily workflow consistency.",
      image: project4,
      tech: ["React", "JavaScript", "CSS", "Django"],
      live: "#",
      github: "#",
      featured: false,
    },
  ];

  const uiDesigns = [
    {
      title: "Car Landing Page UI",
      category: "Web UI Design",
      description:
        "A modern UI concept focused on visual hierarchy, clean layout, and polished component styling for a strong first impression.",
      live: "https://car-prsmiq070-jerintvs-projects.vercel.app",
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-head">
          <p className="section-kicker">Projects</p>
          <h2 className="projects-title">Ultra-Premium Creative Builds</h2>
          <p className="projects-subtitle">
            A curated collection of projects designed to be visually strong,
            interactive, and production-ready.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card ${project.featured ? "project-featured" : ""}`}
              key={project.title}
            >
              <div className="project-sheen" aria-hidden="true"></div>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <span className="project-index">0{index + 1}</span>
                <span className="project-badge">
                  {project.live.startsWith("http") ? "Live" : "In Progress"}
                </span>
              </div>

              <div className="project-content">
                <div className="project-topline">
                  <span className="project-id">Project 0{index + 1}</span>
                  <span className="project-status">
                    {project.live.startsWith("http") ? "Live Project" : "Coming Soon"}
                  </span>
                </div>

                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-buttons">
                  {isExternalLink(project.live) ? (
                    <button type="button" onClick={() => openExternal(project.live)}>
                      Live Preview <FaArrowRight />
                    </button>
                  ) : (
                    <button type="button" aria-disabled="true" disabled>
                      Preview Soon
                    </button>
                  )}

                  {isExternalLink(project.github) ? (
                    <button type="button" onClick={() => openExternal(project.github)}>
                      Source Code <FaArrowRight />
                    </button>
                  ) : (
                    <button type="button" aria-disabled="true" disabled>
                      Source Soon
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ui-designs-wrap">
          <div className="projects-head ui-designs-head">
            <p className="section-kicker">UI Designs</p>
            <h3 className="ui-designs-title">UI/UX Design Showcase</h3>
            <p className="projects-subtitle">
              Adding more web UI design concepts soon to showcase more UI/UX work.
            </p>
          </div>

          <div className="ui-designs-grid">
            {uiDesigns.map((design, index) => (
              <article className="project-card ui-design-card" key={design.title}>
                <div className="project-sheen" aria-hidden="true"></div>
                <div className="project-content">
                  <div className="project-topline">
                    <span className="project-id">UI Design 0{index + 1}</span>
                    <span className="project-status">Live Design</span>
                  </div>

                  <p className="project-category">{design.category}</p>
                  <h3>{design.title}</h3>
                  <p>{design.description}</p>

                  <div className="project-buttons">
                    <button type="button" onClick={() => openExternal(design.live)}>
                      View Design <FaArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
