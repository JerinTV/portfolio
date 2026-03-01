import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import profileImg from "../assets/pic.png";

function About() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image" data-aos="fade-up">
          <img src={profileImg} alt="Jerin TV" />
        </div>

        <div className="about-content" data-aos="fade-up" data-aos-delay="120">
          <p className="section-kicker">About Me</p>
          <h2 className="about-title">Design ambition with practical frontend execution.</h2>

          <p>
            I am a frontend developer focused on building premium-looking web products.
            My goal is to combine creativity and usability, so every interface feels
            elegant, modern, and easy to use.
          </p>

          <div className="about-highlights">
            <span>Clean Visual Hierarchy</span>
            <span>Interactive Components</span>
            <span>Mobile First Layouts</span>
            <span>Consistent Design Language</span>
          </div>

          <div className="about-pillars">
            <article>
              <h3>Creative Direction</h3>
              <p>Strong color, typography, and composition choices.</p>
            </article>
            <article>
              <h3>Performance Focus</h3>
              <p>Fast-loading and responsive experiences across devices.</p>
            </article>
            <article>
              <h3>Product Thinking</h3>
              <p>Interfaces that communicate clearly and convert attention.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
