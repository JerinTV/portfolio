function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>

        <div className="contact-card">
          <h3>Jerin T V</h3>

          <div className="contact-info">
            <p>
              📞 <a href="tel:7994340173">7994340173</a>
            </p>

            <p>
              ✉️{" "}
              <a href="mailto:jerinjkzjkz@gmail.com">
                jerinjkzjkz@gmail.com
              </a>
            </p>
          </div>

          <div className="contact-buttons">
            <a
              href="https://wa.me/917994340173"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a
              href="mailto:jerinjkzjkz@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
