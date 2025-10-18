import { useState } from "react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return;
    setBusy(true);
    onLogin({ name: form.name, email: form.email });
    setBusy(false);
  };

  return (
    <main>
      {/* Top band matching home gradients */}
      <section className="login-hero" aria-hidden="true">
        <h1 className="login-title">“Welcome back to Spirituals United”</h1>
        <p className="subtitle">Login with name and email to continue.</p>
        <div className="services-accent" />
      </section>

      {/* Glass card form */}
      <section
        className="card login-card"
        aria-labelledby="login-title"
        style={{ maxWidth: 520, margin: "24px auto 48px" }}
      >
        <h2 id="login-title" style={{ marginTop: 0 }}>Login</h2>
        <p className="muted">Enter full name and email to continue.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Full name</span>
            <input
              name="name"
              placeholder="e.g., Aisha Khan"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <div className="actions">
            <button type="submit" className="btn see-more" disabled={busy}>
              {busy ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
