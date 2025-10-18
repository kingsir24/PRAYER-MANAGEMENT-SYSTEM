const SAMPLE_PANDIT = [
  { id: "p1", name: "Pandit Raghav Sharma",   experience: "12+ years", from: "Varanasi, UP",  price: "₹1,500 / session", email: "raghav.pandit@example.com",  phone: "+91 92000 11111" },
  { id: "p2", name: "Pandit Mohan Trivedi",   experience: "9 years",   from: "Jaipur, RJ",    price: "₹1,300 / session", email: "mohan.pandit@example.com",  phone: "+91 92000 22222" },
  { id: "p3", name: "Pandit Vivek Chaturvedi",experience: "7 years",   from: "Lucknow, UP",   price: "₹1,100 / session", email: "vivek.pandit@example.com",  phone: "+91 92000 33333" },
  { id: "p4", name: "Pandit Amit Pathak",     experience: "5 years",   from: "Bhopal, MP",    price: "₹900 / session",   email: "amit.pandit@example.com",   phone: "+91 92000 44444" },
  { id: "p5", name: "Pandit Suresh Joshi",    experience: "4 years",   from: "Mumbai, MH",    price: "₹850 / session",   email: "suresh.pandit@example.com", phone: "+91 92000 55555" },
  { id: "p6", name: "Pandit Rajesh Tiwari",   experience: "3 years",   from: "Delhi",         price: "₹800 / session",   email: "rajesh.pandit@example.com", phone: "+91 92000 66666" },
  { id: "p7", name: "Pandit Anil Shukla",     experience: "6 years",   from: "Pune, MH",      price: "₹1,000 / session", email: "anil.pandit@example.com",   phone: "+91 92000 77777" },
  { id: "p8", name: "Pandit Harish Upadhyay", experience: "2 years",   from: "Ahmedabad, GJ", price: "₹700 / session",   email: "harish.pandit@example.com",phone: "+91 92000 88888" },
  { id: "p9", name: "Pandit Kunal Bhatt",     experience: "8 years",   from: "Surat, GJ",     price: "₹1,200 / session", email: "kunal.pandit@example.com",  phone: "+91 92000 99999" },
  { id: "p10",name: "Pandit Deepak Purohit",  experience: "10 years",  from: "Indore, MP",    price: "₹1,400 / session", email: "deepak.pandit@example.com", phone: "+91 92000 10101" }
];

function sanitizeTel(value) {
  const raw = String(value || "").trim();
  const kept = raw.replace(/[^\d+]/g, "");
  return kept.startsWith("+") ? `+${kept.replace(/[^\d]/g, "").replace(/^/, "")}` : kept;
}

export default function Pandit({ data = SAMPLE_PANDIT }) {
  return (
    <main>
      <section className="people-hero" aria-labelledby="pandit-title">
        <h1 id="pandit-title">Pandit</h1>
        <p className="subtitle">Browse verified profiles and connect directly.</p>
        <div className="services-accent" aria-hidden="true" />
      </section>

      <section className="scholar-grid" aria-label="Pandit list">
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
