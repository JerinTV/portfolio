import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "@fontsource/bruno-ace";  /* loads the font */

function App() {
  return (
    <>
      <Navbar
        brand="Jerin T V"
        links={["Home", "About", "Skills", "Projects", "Contact"]}
      />

      <Hero name="Jerin T V" role="Frontend Developer" />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
