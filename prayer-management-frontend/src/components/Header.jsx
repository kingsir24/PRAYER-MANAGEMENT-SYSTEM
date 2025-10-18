import logo from "../assets/logo.js";
import { useState, useRef, useEffect } from "react";
export default function Header({ user, onLoginClick, onLogout, onNav})
{
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // close dropdown on outside click or Escape
  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const initials = user?.initials ?? "";

  return (
    <header className="su-header">
      <div
        className="logo"
        onClick={() => onNav("home")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <img src={logo} alt="Spirituals United logo" width={40} height={40} style={{ marginRight: 8 }} />
        <span><b>SPIRITUALS UNITED</b></span>
      </div>

      <nav aria-label="Primary">
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("home"); }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("contact"); }}>Contact</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("services"); }}>Services</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("products"); }}>Products</a>


        {user ? (
          <div className="profile-wrap" ref={menuRef}>
            <button
              className="avatar"
              type="button"
              title={`${user.name} — ${user.email}`}
              onClick={() => setOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              {initials}
            </button>

            {open && (
              <div className="profile-menu" role="menu">
                <div className="profile-id" role="none">
                  <div className="profile-avatar">{initials}</div>
                  <div className="profile-text">
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-email">{user.email}</div>

                  </div>
                </div>
                
                <button
                  className="profile-item"
                  role="menuitem"
                  onClick={() => { setOpen(false); onLogout(); }}
                >
                  Logout
                </button>
                
              </div>
            )}
          </div>
        ) : (
          <button className="btn ghost" onClick={onLoginClick}>Login / Sign Up</button>
        )}
      </nav>
    </header>
  );
}