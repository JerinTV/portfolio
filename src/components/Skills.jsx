import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

function Skills() {
  useEffect(() => {
    AOS.init({ duration: 850, once: true });
  }, []);

  const skills = [
    {
      name: "UI Design Basics",
      level: 45,
      icon: <FaFigma />,
      detail: "Learning wireframes, spacing, and simple layout structure.",
    },
    {
      name: "React Fundamentals",
      level: 55,
      icon: <FaReact />,
      detail: "Building reusable components and basic responsive pages.",
    },
    {
      name: "JavaScript Basics",
      level: 58,
      icon: <SiJavascript />,
      detail: "Using arrays, objects, functions, and DOM/event handling.",
    },
    {
      name: "HTML Structure",
      level: 65,
      icon: <FaHtml5 />,
      detail: "Writing clean page sections, forms, and semantic tags.",
    },
    {
      name: "CSS Styling",
      level: 62,
      icon: <FaCss3Alt />,
      detail: "Creating responsive layouts with Flexbox, Grid, and media queries.",
    },
    {
      name: "Git and GitHub",
      level: 50,
      icon: <FaGitAlt />,
      detail: "Using commits, branches, and pushing projects to repositories.",
    },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <p className="section-kicker" data-aos="fade-up">
          Capabilities
        </p>
        <h2 className="skills-title" data-aos="fade-up">
          End-to-end product execution.
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className="skill-card"
              key={skill.name}
              data-aos="fade-up"
              data-aos-delay={index * 70}
            >
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <h3>{skill.name}</h3>
              </div>

              <p className="skill-detail">{skill.detail}</p>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${skill.level}%` }}></div>
              </div>

              <span className="skill-percent">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
