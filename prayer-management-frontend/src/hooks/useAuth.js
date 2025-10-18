// src/hooks/useAuth.js
import { useEffect, useState } from "react";

const KEY = "su:user";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // Ignore JSON parse/localStorage errors
    }
  }, []);

  const login = (payload) => {
    const u = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      initials: payload.name
        .split(/\s+/)
        .map((p) => p[0]?.toUpperCase())
        .slice(0, 2)
        .join(""),
    };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return { user, login, logout };
}
