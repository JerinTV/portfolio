import heroImg from "../assets/hero.jpeg";

function Hero({ name, role }) {
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <h1>
          Hi, I’m <span>{name}</span>
        </h1>

        <h2>{role}</h2>

        <p className="hero-description">
          I build modern, responsive and interactive web applications
          using React and JavaScript.
        </p>

        
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Profile" className="hero-img" />
      </div>
    </section>
  );
}

export default Hero;
