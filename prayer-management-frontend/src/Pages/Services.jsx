// src/pages/Services.jsx
export default function Services() {
  const items = [
    { icon: "🕯️", title: "Prayer Scheduling", desc: "Set reminders, track observances, and sync events to calendars." },
    { icon: "📖", title: "Guided Learning", desc: "Access curated lessons, transliterations, and recitation aids." },
    { icon: "🕌", title: "Hire a Scholar", desc: "Book qualified scholars for ceremonies and community events." },
    { icon: "🛍️", title: "Ritual Essentials", desc: "Order verified items for pooja, Eid, and prayer gatherings." },
    { icon: "📅", title: "Festival Planner", desc: "View upcoming festivals and manage custom cultural events." },
    { icon: "🔔", title: "Smart Reminders", desc: "Get timely notifications adapted to location and preferences." },
  ];

  return (
    <main>
      <section className="services-hero" aria-labelledby="services-title">
        <h1 id="services-title">“Serve, Support, and Celebrate”</h1>
        <p className="subtitle">Offerings designed to simplify every spiritual moment.</p>
        <div className="services-accent" aria-hidden="true" />
      </section>

      <section className="services-grid" aria-label="Services">
        {items.map((s) => (
          <article className="service-card" key={s.title}>
            <div className="service-icon" aria-hidden="true">{s.icon}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-actions">
              <button className="btn">Learn more</button>
            </div>
          </article>
        ))}
      </section>

      <section className="cta-band" aria-label="Get started">
        <h2 className="cta-title">Ready to begin?</h2>
        <p className="cta-sub">Create an event, invite friends, and keep everything organized.</p>
        <div className="cta-actions">
          <a className="btn see-more" href="#">Get started</a>
        </div>
      </section>
    </main>
  );
}
