import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const sections = [
  { id: "hero", label: "00" },
  { id: "trace", label: "01" },
  { id: "theory", label: "02" },
  { id: "gallery", label: "03" },
];

export default function StickyNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "flex-end",
      }}
    >
      {/* Language switcher at top */}
      <div style={{ marginBottom: "1rem" }}>
        <LanguageSwitcher />
      </div>

      {sections.map(({ id, label }) => (
        <button
          key={id}
          data-hover
          onClick={() => scrollTo(id)}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "none", border: "none", padding: 0, cursor: "none",
          }}
        >
          <span style={{
            display: "block",
            width: active === id ? "24px" : "8px",
            height: "1px",
            backgroundColor: active === id ? "hsl(323,100%,50%)" : "hsl(0,0%,0%)",
            transition: "all 0.3s ease",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.15em",
            color: active === id ? "hsl(323,100%,50%)" : "hsl(0,0%,50%)",
            transition: "color 0.3s",
          }}>
            {label}
          </span>
        </button>
      ))}
    </motion.nav>
  );
}
