const SAMPLE_PRIEST = [
  { id: "pr1", name: "Father Joseph D'Souza",   experience: "15+ years", from: "Mumbai, MH",     price: "₹1,600 / session", email: "joseph.priest@example.com",   phone: "+91 93000 11111" },
  { id: "pr2", name: "Father Anthony Pereira",  experience: "10 years",  from: "Goa",            price: "₹1,300 / session", email: "anthony.priest@example.com",  phone: "+91 93000 22222" },
  { id: "pr3", name: "Father Peter Fernandes",  experience: "8 years",   from: "Mangaluru, KA",  price: "₹1,200 / session", email: "peter.priest@example.com",    phone: "+91 93000 33333" },
  { id: "pr4", name: "Father Michael Rodrigues",experience: "6 years",   from: "Pune, MH",       price: "₹1,000 / session", email: "michael.priest@example.com",  phone: "+91 93000 44444" },
  { id: "pr5", name: "Father Stephen Thomas",   experience: "5 years",   from: "Kochi, KL",      price: "₹900 / session",   email: "stephen.priest@example.com", phone: "+91 93000 55555" },
  { id: "pr6", name: "Father Andrew Mathew",    experience: "4 years",   from: "Thiruvananthapuram, KL", price: "₹850 / session", email: "andrew.priest@example.com",   phone: "+91 93000 66666" },
  { id: "pr7", name: "Father John Paul",        experience: "7 years",   from: "Delhi",          price: "₹1,100 / session", email: "john.priest@example.com",     phone: "+91 93000 77777" },
  { id: "pr8", name: "Father Francis Xavier",   experience: "3 years",   from: "Chennai, TN",    price: "₹800 / session",   email: "francis.priest@example.com", phone: "+91 93000 88888" },
  { id: "pr9", name: "Father Mathew George",    experience: "9 years",   from: "Bengaluru, KA",  price: "₹1,250 / session", email: "mathew.priest@example.com",   phone: "+91 93000 99999" },
  { id: "pr10",name: "Father Paul Joseph",      experience: "12 years",  from: "Hyderabad, TS",  price: "₹1,400 / session", email: "paul.priest@example.com",     phone: "+91 93000 10101" }
];

function sanitizeTel(value) {
  const raw = String(value || "").trim();
  const kept = raw.replace(/[^\d+]/g, "");
  return kept.startsWith("+") ? `+${kept.replace(/[^\d]/g, "").replace(/^/, "")}` : kept;
}

export default function Priest({ data = SAMPLE_PRIEST }) {
  return (
    <main>
      <section className="people-hero" aria-labelledby="priest-title">
        <h1 id="priest-title">Priest</h1>
        <p className="subtitle">Browse verified profiles and connect directly.</p>
        <div className="services-accent" aria-hidden="true" />
      </section>

      <section className="scholar-grid" aria-label="Priest list">
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
