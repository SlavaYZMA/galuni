import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const termKeys = [
  { id: "abject", index: "T—01", labelKey: "abject.label", defKey: "abject.def", subKey: "abject.sub" },
  { id: "datasweat", index: "T—02", labelKey: "datasweat.label", defKey: "datasweat.def", subKey: "datasweat.sub" },
  { id: "plasticghost", index: "T—03", labelKey: "plasticghost.label", defKey: "plasticghost.def", subKey: "plasticghost.sub" },
];

export default function Section02Theory() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string | null>("abject");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="theory"
      ref={ref}
      style={{
        minHeight: "100vh",
        padding: "6rem 4rem",
        borderBottom: "1px solid hsl(0,0%,88%)",
        position: "relative", overflow: "hidden",
      }}
    >
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.04, pointerEvents: "none" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}
        >
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "hsl(323,100%,50%)", textTransform: "uppercase", marginBottom: "1rem" }}>
            {t("s02.label")}
          </p>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1.5rem, 3vw, 3.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            {t("s02.title_1")}<span style={{ color: "hsl(323,100%,50%)" }}>{t("s02.title_2")}</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {termKeys.map((term, i) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ borderTop: "1px solid hsl(0,0%,88%)" }}
            >
              <button
                data-hover
                onClick={() => setOpen(open === term.id ? null : term.id)}
                style={{ width: "100%", display: "grid", gridTemplateColumns: "3rem 1fr auto", alignItems: "center", gap: "2rem", padding: "1.5rem 0", background: "none", border: "none", cursor: "none", textAlign: "left" }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(0,0%,60%)", letterSpacing: "0.1em" }}>{term.index}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: open === term.id ? "hsl(323,100%,50%)" : "hsl(0,0%,0%)", transition: "color 0.2s" }}>
                  {t(term.labelKey)}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.2rem", color: open === term.id ? "hsl(323,100%,50%)" : "hsl(0,0%,60%)", transition: "all 0.2s", transform: open === term.id ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
              </button>

              <AnimatePresence>
                {open === term.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "2rem", paddingBottom: "2rem" }}>
                      <div />
                      <div>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", lineHeight: 1.8, color: "hsl(0,0%,10%)", marginBottom: "1rem" }}>{t(term.defKey)}</p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", lineHeight: 1.7, color: "hsl(0,0%,40%)", borderLeft: "2px solid hsl(0,0%,88%)", paddingLeft: "1rem" }}>{t(term.subKey)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid hsl(0,0%,88%)" }} />
        </div>
      </div>
    </section>
  );
}
