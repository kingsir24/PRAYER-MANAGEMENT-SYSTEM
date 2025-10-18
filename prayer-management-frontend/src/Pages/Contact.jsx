export default function Contact() {
  return (
    <main>
      <section className="contact-hero" aria-labelledby="contact-title">
        <h1 id="contact-title">“Reach Out Anytime”</h1>
        <p className="subtitle">Questions, collaborations, or feedback are welcome.</p>
        <div className="services-accent" aria-hidden="true" />
      </section>

      <section className="contact-grid" aria-label="Contact methods">
        <article className="contact-card">
          <div className="contact-icon" aria-hidden="true">📧</div>
          <h3 className="contact-title">Email</h3>
          <p className="contact-desc">
            Prefer writing? Send a message and expect a quick reply.
          </p>
          <div className="contact-actions">
            <a className="btn see-more" href="mailto:rajasabsayyed123@gmail.com">
              rajasabsayyed123@gmail.com
            </a>
          </div>
        </article>

        <article className="contact-card">
          <div className="contact-icon" aria-hidden="true">📞</div>
          <h3 className="contact-title">Phone</h3>
          <p className="contact-desc">
            Call or tap to start a conversation during working hours.
          </p>
          <div className="contact-actions">
            <a className="btn" href="tel:+918530231730">+91 85302 31730</a>
          </div>
        </article>
      </section>

      <section className="cta-band" aria-label="Stay connected">
        <h2 className="cta-title">Prefer another channel?</h2>
        <p className="cta-sub">Share a preferred app in the email and it will be added soon.</p>
      </section>
    </main>
  );
}
