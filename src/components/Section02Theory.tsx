import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const terms = [
  {
    id: "abject",
    label: "ABJECT",
    index: "T—01",
    definition: "Julia Kristeva's abject: that which disturbs identity, system, order. What does not respect borders, positions, rules. The in-between, the ambiguous, the composite.",
    sub: "The body that exceeds its own definition. The algorithm that produces flesh from numbers. Neither art nor biology — something anterior to both.",
    metric: "BOUNDARY DISSOLUTION: 94.7%",
  },
  {
    id: "datasweat",
    label: "DATA SWEAT",
    index: "T—02",
    definition: "The biological residue of computation. What leaks between model weights — the warmth that should not be there. An error that became a material.",
    sub: "When the diffusion model encounters ambiguity in human anatomy, it produces artifacts that resemble sweat, fluid, the excess of organic process.",
    metric: "BIOLOGICAL LEAKAGE: 0.003%",
  },
  {
    id: "plasticghost",
    label: "PLASTIC GHOST",
    index: "T—03",
    definition: "The synthetic body that passes through systems without touching them. Generated but not born. Present but not existing. An imprint without pressure.",
    sub: "The AI-rendered body occupies visual space without physical consequence. It haunts the archive with perfect imperfection — the uncanny made sterile.",
    metric: "GHOST DENSITY: 7.2 μg/cm³",
  },
];

export default function Section02Theory() {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Film grain SVG noise */}
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
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.3em",
            color: "hsl(323,100%,50%)", textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            SECTION 02 / THEORY
          </p>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.5rem, 3vw, 3.5rem)",
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}>
            ТЕРМ<span style={{ color: "hsl(323,100%,50%)" }}>ИНЫ</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {terms.map((term, i) => (
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
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr auto",
                  alignItems: "center",
                  gap: "2rem",
                  padding: "1.5rem 0",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem", color: "hsl(0,0%,60%)",
                  letterSpacing: "0.1em",
                }}>
                  {term.index}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(1rem, 2.5vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  color: open === term.id ? "hsl(323,100%,50%)" : "hsl(0,0%,0%)",
                  transition: "color 0.2s",
                }}>
                  {term.label}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1.2rem",
                  color: open === term.id ? "hsl(323,100%,50%)" : "hsl(0,0%,60%)",
                  transition: "all 0.2s",
                  transform: open === term.id ? "rotate(45deg)" : "none",
                  display: "inline-block",
                }}>
                  +
                </span>
              </button>

              <AnimatePresence>
                {open === term.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "3rem 1fr",
                      gap: "2rem",
                      paddingBottom: "2rem",
                    }}>
                      <div />
                      <div>
                        <p style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.8rem", lineHeight: 1.8,
                          color: "hsl(0,0%,10%)",
                          marginBottom: "1rem",
                        }}>
                          {term.definition}
                        </p>
                        <p style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.7rem", lineHeight: 1.7,
                          color: "hsl(0,0%,40%)",
                          marginBottom: "1.5rem",
                          borderLeft: "2px solid hsl(0,0%,88%)",
                          paddingLeft: "1rem",
                        }}>
                          {term.sub}
                        </p>
                        <span style={{
                          display: "inline-block",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.55rem", letterSpacing: "0.2em",
                          color: "hsl(323,100%,50%)",
                          border: "1px solid hsl(323,100%,50%)",
                          padding: "0.25rem 0.75rem",
                        }}>
                          {term.metric}
                        </span>
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
