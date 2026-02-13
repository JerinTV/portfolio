import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

function Skills() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const skills = [
    { name: "HTML", level: 90, icon: <FaHtml5 /> },
    { name: "CSS", level: 85, icon: <FaCss3Alt /> },
    { name: "JavaScript", level: 80, icon: <SiJavascript /> },
    { name: "React", level: 75, icon: <FaReact /> },
    { name: "Git & GitHub", level: 70, icon: <FaGitAlt /> },
    { name: "Figma", level: 60, icon: <FaFigma /> },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title" data-aos="fade-up">
          My Skills
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className="skill-card"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <h3>{skill.name}</h3>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
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
