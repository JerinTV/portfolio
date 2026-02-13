import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import profileImg from "../assets/pic.png";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="about-section" id="about">
      
      {/* Floating Particles */}
      <div className="particles"></div>

      <div className="about-container">

        {/* LEFT SIDE IMAGE */}
        <div className="about-image" data-aos="fade-right">
          <img src={profileImg} alt="Profile" />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="about-content" data-aos="fade-left">

          <h2 className="about-title">About Me</h2>

          <p>
            I am a passionate <span>Frontend Developer</span> who builds
            modern, responsive and high-performance web applications.
            I love creating clean UI and smooth user experiences.
          </p>

          <p>
            My expertise includes <span>React</span>, <span>JavaScript</span>,
            <span> HTML</span>, and <span> CSS</span>. I continuously improve
            my skills to stay ahead in the tech world.
          </p>

         

        </div>
      </div>
    </section>
  );
}

export default About;
