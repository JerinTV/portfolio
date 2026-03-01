import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-shell">
      <Navbar links={["Home", "About", "Skills", "Projects", "Contact"]} />

      <Hero name="Jerin T V" role="Frontend Developer (Learning UI/UX)" />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
