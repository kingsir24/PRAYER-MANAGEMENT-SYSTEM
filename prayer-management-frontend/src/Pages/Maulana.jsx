const SAMPLE_MAULANA = [
  { id: "m1",  name: "Maulana Aamir Qasmi",   experience: "11+ years", from: "Hyderabad, TS",  price: "₹1,400 / session", email: "aamir.maulana@example.com",  phone: "+91 91000 11111" },
  { id: "m2",  name: "Maulana Farhan Siddiqi",experience: "8 years",    from: "Bhopal, MP",     price: "₹1,200 / session", email: "farhan.maulana@example.com", phone: "+91 91000 22222" },
  { id: "m3",  name: "Maulana Rehan Ansari",  experience: "6 years",    from: "Lucknow, UP",    price: "₹1,000 / session", email: "rehan.maulana@example.com",  phone: "+91 91000 33333" },
  { id: "m4",  name: "Maulana Imran Khan",    experience: "10 years",   from: "Jaipur, RJ",     price: "₹1,300 / session", email: "imran.maulana@example.com",  phone: "+91 91000 44444" },
  { id: "m5",  name: "Maulana Zafar Iqbal",   experience: "5 years",    from: "Delhi",          price: "₹900 / session",   email: "zafar.maulana@example.com",  phone: "+91 91000 55555" },
  { id: "m6",  name: "Maulana Asif Ali",      experience: "4 years",    from: "Kolkata, WB",    price: "₹800 / session",   email: "asif.maulana@example.com",   phone: "+91 91000 66666" },
  { id: "m7",  name: "Maulana Tariq Jameel",  experience: "3 years",    from: "Patna, BR",      price: "₹700 / session",   email: "tariq.maulana@example.com",  phone: "+91 91000 77777" },
  { id: "m8",  name: "Maulana Saeed Khan",    experience: "2 years",    from: "Chennai, TN",    price: "₹600 / session",   email: "saeed.maulana@example.com",  phone: "+91 91000 88888" },
  { id: "m9",  name: "Maulana Bilal Ahmed",   experience: "7 years",    from: "Ahmedabad, GJ",  price: "₹1,100 / session", email: "bilal.maulana@example.com",  phone: "+91 91000 99999" },
  { id: "m10", name: "Maulana Nadeem Akhtar", experience: "9 years",    from: "Mumbai, MH",     price: "₹1,250 / session", email: "nadeem.maulana@example.com", phone: "+91 91000 10101" }
];

function sanitizeTel(value) {
  const raw = String(value || "").trim();
  const kept = raw.replace(/[^\d+]/g, "");
  return kept.startsWith("+") ? `+${kept.replace(/[^\d]/g, "").replace(/^/, "")}` : kept;
}

export default function Maulana({ data = SAMPLE_MAULANA }) {
  return (
    <main>
      <section className="people-hero" aria-labelledby="maulana-title">
        <h1 id="maulana-title">Maulana</h1>
        <p className="subtitle">Browse verified profiles and connect directly.</p>
        <div className="services-accent" aria-hidden="true" />
      </section>

      <section className="scholar-grid" aria-label="Maulana list">
        {data.length === 0 && <p className="muted" role="status">No profiles yet.</p>}

        {data.map(({ id, name, experience, from, price, email, phone }) => {
          const tel = sanitizeTel(phone);
          return (
            <article key={id} className="scholar-card card">
              <h3 className="scholar-name">{name}</h3>

              <ul className="scholar-facts">
                <li><strong>Experience:</strong> {experience}</li>
                <li><strong>From:</strong> {from}</li>
                <li><strong>Price:</strong> {price}</li>
              </ul>

              <div className="scholar-actions">
                <a className="btn primary" href={tel ? `tel:${tel}` : undefined} aria-disabled={!tel}>Call</a>
                <a className="btn ghost" href={email ? `mailto:${email}` : undefined} aria-disabled={!email}>Email</a>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
