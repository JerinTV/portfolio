import project1 from "../assets/project1.jpeg";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";

function Projects() {
  const projects = [
    {
      title: "Smart Helmet Dashboard",
      description:
        "A real-time helmet monitoring system with live speed tracking, GPS location updates, and IoT integration for enhanced rider safety.",
      image: project1,
      tech: ["HTML", "CSS","JavaScript","PHP", "MySQL", "ESP32"],
      live: "#",
      github: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, ultra-premium personal portfolio built with React featuring animated sections, glowing effects, and responsive design.",
      image: project2,
      tech: ["React", "CSS", "JavaScript"],
      live: "https://portfolio1-rust-omega.vercel.app",
      github: "https://github.com/JerinTV/portfolio_1.git",
    },
    {
      title: "Blockchain Fake Product Detection",
      description:
        "A blockchain-powered authentication system that prevents counterfeit products using decentralized ledger technology and smart contracts.",
      image: project3,
      tech: ["Blockchain", "Solidity", "React", "Node.js"],
      live: "#",
      github: "#",
    },
    {
      title: "Zentode – Smart To-Do App",
      description:
        "A productivity-focused task management application built with React featuring dynamic updates, local storage integration, and clean UI.",
      image: project4,
      tech: ["React", "JavaScript", "CSS", "Django"],
      live: "#",
      github: "#",
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="projects-title">My Projects</h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>

                <div className="project-buttons">
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
