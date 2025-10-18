import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ScholarSection from "./components/ScholarSection.jsx";
import FestivalCard from "./components/FestivalCard.jsx";
import AddFestivalForm from "./components/AddFestivalForm.jsx";
import Login from "./Pages/Login.jsx";
import Services from "./Pages/Services.jsx";
import Contact from "./Pages/Contact.jsx";
import Pandit from "./Pages/Pandit.jsx";
import Maulana from "./Pages/Maulana.jsx";
import Priest from "./Pages/Priest.jsx";
import Products from "./Pages/Products.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const USER_KEY = "su:user";

export default function App() {
  // Festivals state
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auth state
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Simple route state
  const [route, setRoute] = useState("home");

// Load user and decide popup visibility
useEffect(() => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      setUser(JSON.parse(raw));
      setShowLogin(false);   // returning user: skip popup
    } else {
      setShowLogin(true);    // new/signed-out: show popup on load
    }
  } catch {
    setShowLogin(true);      // on error, show popup
  }
}, []);

// Lock background scroll while modal is open
useEffect(() => {
  const lock = showLogin && !user;
  document.body.style.overflow = lock ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [showLogin, user]);

  // CRUD: fetch all festivals
  const fetchFestivals = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/festivals`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setFestivals(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to load festivals.");
      setFestivals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFestivals();
  }, [fetchFestivals]);

  // CRUD: add festival
  const addFestival = async (payload) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/festivals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");
      await fetchFestivals();
    } catch {
      setError("Failed to add festival.");
    }
  };

  // CRUD: delete festival
  const deleteFestival = async (id) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/festivals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setFestivals((prev) => prev.filter((f) => f._id !== id));
    } catch {
      setError("Failed to delete festival.");
    }
  };

// Auth helpers
const login = async ({ name, email }) => {
  const u = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    initials: name.split(/\s+/).map(p => p[0]?.toUpperCase()).slice(0,2).join(""),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(u));
  setUser(u);
  setShowLogin(false);

  // send audit event to backend
  try {
    await fetch(`${API_BASE}/auth/login-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: u.name,
        email: u.email,
        provider: "local",
        meta: { initials: u.initials }
      }),
      keepalive: true
    });
  } catch {
    // swallow errors so UI isn’t blocked
  }
};

const logout = () => {
  localStorage.removeItem(USER_KEY);
  setUser(null);
};

  return (
    <div className="app">
      <Header
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
        onNav={(r) => setRoute(r)}
      />

    <main>
  {showLogin && !user ? (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <Login onLogin={login} onClose={() => setShowLogin(false)} />
      </div>
    </div>
  ) : route === "products" ? (
    <Products />
  ) : route === "services" ? (
    <Services />
  ) : route === "contact" ? (
    <Contact />
  ) : route === "people:pandit" ? (
    <Pandit />
  ) : route === "people:maulana" ? (
    <Maulana />
  ) : route === "people:priest" ? (
    <Priest />
  ) : (
    <>
      {/* home content unchanged */}
      <Hero />

      <section className="separator" aria-hidden="true" />

      {/* NEW: animated description just above scholar cards */}
      <section className="scholar-intro" aria-live="polite">
        <p className="scholar-intro__text">
          Find qualified scholars for pujas, namaz, and church services near you. Book trusted experts,
          compare availability, and get guidance for every ritual.
        </p>
      </section>

      <section id="scholars" aria-labelledby="scholars-title">
        <ScholarSection onNav={(r) => setRoute(r)} />
      </section>

      {/* festivals section unchanged */}
      <section className="festivals" aria-labelledby="festivals-title">
        <div className="festivals-header">
          <h2 id="festivals-title">Upcoming Festivals</h2>
          <p className="subtitle">Add, view, and manage spiritual events.</p>
        </div>

        

        <AddFestivalForm onAdd={addFestival} />

        {error && (
          <div role="alert" className="alert">
            {error}
          </div>
        )}

        {loading ? (
          <p className="muted">Loading festivals...</p>
        ) : festivals.length === 0 ? (
          <p className="muted">No festivals yet. Add the first one above.</p>
        ) : (
          <div className="festival-grid">
            {festivals.map((f) => (
              <FestivalCard
                key={f._id}
                festival={f}
                onDelete={() => deleteFestival(f._id)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )}
</main>


      <footer className="footer">
        <p>© {new Date().getFullYear()} Spirituals United</p>
      </footer>
    </div>
  );
}


