import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <p className="section-kicker">Contact</p>
        <h2 className="contact-title">Let&apos;s create something that makes people say wow.</h2>

        <div className="contact-card">
          <p className="contact-kicker">Open for freelance and collaboration</p>
          <h3>Jerin T V</h3>

          <div className="contact-info">
            <p>
              <FaPhoneAlt /> <a href="tel:7994340173">7994340173</a>
            </p>
            <p>
              <FaEnvelope /> <a href="mailto:jerinjkzjkz@gmail.com">jerinjkzjkz@gmail.com</a>
            </p>
            <p>
              <FaMapMarkerAlt /> Kerala, India
            </p>
          </div>

          <div className="contact-buttons">
            <a href="https://wa.me/917994340173" target="_blank" rel="noreferrer">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="mailto:jerinjkzjkz@gmail.com" target="_blank" rel="noreferrer">
              <FaEnvelope /> Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
