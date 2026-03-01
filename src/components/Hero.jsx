import heroImg from "../assets/hero.jpeg";

function Hero({ name, role }) {
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <p className="hero-kicker">Welcome to my portfolio</p>

        <h1>
          <span className="hero-greet">Hello, I&apos;m</span>
          <span className="hero-name">{name}</span>.
          <br />
          Crafting <em className="hero-highlight">creative</em> and elegant web experiences.
        </h1>

        <h2>{role}</h2>

        <p className="hero-description">
          Thank you for visiting. I craft responsive, modern interfaces with
          thoughtful details, smooth interactions, and polished visual storytelling.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            Explore Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Start a Conversation
          </a>
        </div>

        <div className="hero-ticker" aria-hidden="true">
          <span>Global Style</span>
          <span>Creative Motion</span>
          <span>Premium Visuals</span>
          <span>Responsive Design</span>
        </div>
      </div>

      <div className="hero-image-wrap">
        <div className="hero-image">
          <img src={heroImg} alt="Jerin TV portrait" className="hero-img" />
          <div className="hero-floating-card">
            <p>Now Building</p>
            <h3>Ultra Premium UI</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
