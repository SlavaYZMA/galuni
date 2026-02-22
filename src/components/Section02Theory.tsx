import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const termKeys = [
  { id: "term1", index: "T—01", labelKey: "term1.label", defKey: "term1.def" },
  { id: "term2", index: "T—02", labelKey: "term2.label", defKey: "term2.def" },
  { id: "term3", index: "T—03", labelKey: "term3.label", defKey: "term3.def" },
  { id: "term4", index: "T—04", labelKey: "term4.label", defKey: "term4.def" },
  { id: "term5", index: "T—05", labelKey: "term5.label", defKey: "term5.def" },
];

// Typewriter effect hook
function useTypewriter(text: string, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function Section02Theory() {
  const { t } = useLanguage();
  const [activeTerm, setActiveTerm] = useState<string | null>("term1");
  const [flickering, setFlickering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const activeText = activeTerm ? t(termKeys.find((tk) => tk.id === activeTerm)?.defKey || "") : "";
  const activeLabel = activeTerm ? t(termKeys.find((tk) => tk.id === activeTerm)?.labelKey || "") : "";
  const activeIndex = activeTerm ? termKeys.find((tk) => tk.id === activeTerm)?.index || "" : "";

  const { displayed, done } = useTypewriter(activeText, 8);

  const handleTermClick = useCallback(
    (id: string) => {
      if (id === activeTerm) return;
      setFlickering(true);
      setTimeout(() => setFlickering(false), 200);
      setActiveTerm(id);
    },
    [activeTerm]
  );

  return (
    <section
      id="theory"
      ref={ref}
      style={{
        minHeight: "100vh",
        borderBottom: "1px solid hsl(0,0%,88%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: flickering ? 0.15 : 0.04,
          pointerEvents: "none",
          transition: "opacity 0.1s",
        }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            padding: "3rem 4rem 2rem",
            borderBottom: "1px solid hsl(0,0%,88%)",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "hsl(323,100%,50%)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t("s02.label")}
          </p>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(1.5rem, 3vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            {t("s02.title_1")}
            <span style={{ color: "hsl(323,100%,50%)" }}>
              {t("s02.title_2")}
            </span>
          </h2>
        </motion.div>

        {/* Terminal layout: two columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            flex: 1,
            minHeight: "500px",
          }}
        >
          {/* Left: file directory */}
          <div
            style={{
              borderRight: "1px solid hsl(0,0%,88%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Directory header */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid hsl(0,0%,88%)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "hsl(0,0%,50%)",
              }}
            >
              ~/THEORY/TERMS/
            </div>

            {termKeys.map((term, i) => (
              <motion.button
                key={term.id}
                data-hover
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => handleTermClick(term.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.2rem 1.5rem",
                  background:
                    activeTerm === term.id
                      ? "hsl(0,0%,0%)"
                      : "transparent",
                  border: "none",
                  borderBottom: "1px solid hsl(0,0%,88%)",
                  cursor: "none",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color:
                      activeTerm === term.id
                        ? "hsl(323,100%,50%)"
                        : "hsl(0,0%,50%)",
                    letterSpacing: "0.1em",
                    minWidth: "2.5rem",
                  }}
                >
                  {term.index}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color:
                      activeTerm === term.id
                        ? "hsl(323,100%,50%)"
                        : "hsl(0,0%,10%)",
                    transition: "color 0.15s",
                  }}
                >
                  {t(term.labelKey)}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right: console output */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "hsl(0,0%,2%)",
              color: "hsl(0,0%,80%)",
              position: "relative",
              overflow: "hidden",
              opacity: flickering ? 0.7 : 1,
              transition: "opacity 0.1s",
            }}
          >
            {/* Console header */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid hsl(0,0%,15%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "hsl(323,100%,50%)",
                }}
              >
                OUTPUT://DEFINITION
              </span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "hsl(323,100%,50%)",
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "hsl(0,0%,30%)",
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "hsl(0,0%,30%)",
                  }}
                />
              </div>
            </div>

            {/* Console body */}
            <div
              style={{
                flex: 1,
                padding: "2rem 2rem",
                overflow: "auto",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {activeTerm ? (
                <>
                  {/* Term header in console */}
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid hsl(0,0%,15%)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.5rem",
                        color: "hsl(0,0%,40%)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {activeIndex}
                    </span>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "hsl(323,100%,50%)",
                        marginTop: "0.5rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {activeLabel}
                    </h3>
                  </div>

                  {/* Typewriter output */}
                  <div>
                    <span
                      style={{
                        fontSize: "0.5rem",
                        color: "hsl(0,0%,40%)",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: "1rem",
                      }}
                    >
                      {">"} READING DEFINITION...
                    </span>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: 1.9,
                        color: "hsl(0,0%,75%)",
                      }}
                    >
                      {displayed}
                      {!done && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "0.5em",
                            height: "1em",
                            backgroundColor: "hsl(323,100%,50%)",
                            marginLeft: "2px",
                            animation: "blink-cursor 0.7s step-end infinite",
                          }}
                        />
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "hsl(0,0%,30%)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    SELECT A TERM TO VIEW DEFINITION
                  </span>
                </div>
              )}
            </div>

            {/* Scan lines overlay on console */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,122,0.02) 2px, rgba(255,0,122,0.02) 4px)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Cursor blink animation */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          #theory > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #theory > div > div:nth-child(2) > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid hsl(0,0%,88%);
          }
        }
      `}</style>
    </section>
  );
}
