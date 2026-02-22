import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

interface Imprint {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  shadow_image_url: string;
  result_image_url: string;
}

const ZoomableImage = ({ src, label }: { src: string; label: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [hover, setHover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const px = (x / width) * 100;
    const py = (y / height) * 100;
    setPos({ x, y, px, py });
  };

  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#050505", border: "1px solid hsl(0,0%,20%)", position: "relative" }}>
      <p style={{
        position: "absolute", top: "1rem", left: "1rem", zIndex: 10,
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
        color: "hsl(323,100%,50%)", textShadow: "0 0 4px rgba(0,0,0,0.8)"
      }}>
        {label}
      </p>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={handleMouseMove}
        style={{ position: "relative", height: "100%", aspectRatio: "9/16", cursor: "none", overflow: "hidden" }}
      >
        <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {hover && (
          <div
            style={{
              position: "absolute",
              left: pos.x - 125,
              top: pos.y - 125,
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              pointerEvents: "none",
              border: "1px solid hsl(323,100%,50%)",
              backgroundImage: `url(${src})`,
              backgroundSize: "250%",
              backgroundPosition: `${pos.px}% ${pos.py}%`,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)",
              zIndex: 20
            }}
          >
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "10px", height: "1px", backgroundColor: "rgba(255,0,127,0.5)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "1px", height: "10px", backgroundColor: "rgba(255,0,127,0.5)" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default function Section03Gallery() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [imprints, setImprints] = useState<Imprint[]>([]);
  const [selectedImprint, setSelectedImprint] = useState<Imprint | null>(null);

  useEffect(() => {
    supabase
      .from("imprints")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setImprints(data as Imprint[]);
      });
  }, []);

  // Calculate card height for exactly 2 rows
  // Each card has ~9:16 images in a 2-col grid + title bar (~3rem)
  // We want 2 visible rows, so container height = 2 * card height
  const CARD_ASPECT = 0.75; // approximate card height/width ratio considering images + title
  const ROW_HEIGHT = "calc(min(70vw / var(--cols), 420px))";

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        borderBottom: "1px solid hsl(0,0%,88%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "2rem 4rem 1.5rem",
          borderBottom: "1px solid hsl(0,0%,88%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "hsl(323,100%,50%)",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            {t("s03.label")}
          </p>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            {t("s03.title_1")}
            <br />
            <span style={{ color: "hsl(323,100%,50%)" }}>
              {t("s03.title_2")}
            </span>
          </h2>
        </motion.div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "hsl(0,0%,50%)",
            letterSpacing: "0.15em",
          }}
        >
          {imprints.length} IMPRINTS
        </p>
      </div>

      {/* Scrollable archive container — exactly 2 rows visible */}
      {imprints.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "hsl(0,0%,50%)",
              letterSpacing: "0.2em",
            }}
          >
            {t("s03.empty")}
          </p>
        </div>
      ) : (
        <div
          className="archive-scroll"
          style={{
            maxHeight: "680px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "1px",
              backgroundColor: "hsl(0,0%,88%)",
            }}
          >
            {imprints.map((imp, i) => (
              <motion.div
                key={imp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setSelectedImprint(imp)}
                data-hover
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "hsl(0,0%,96%)",
                  cursor: "none",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "hsl(0,0%,100%)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "hsl(0,0%,96%)")
                }
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <p
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        zIndex: 2,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.45rem",
                        letterSpacing: "0.2em",
                        color: "hsl(323,100%,50%)",
                        textShadow: "0 0 4px rgba(255,255,255,0.8)",
                      }}
                    >
                      {t("s03.source")}
                    </p>
                    <img
                      src={imp.shadow_image_url}
                      alt={`${imp.title} — shadow`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "9 / 16",
                        objectFit: "cover",
                        filter: "grayscale(100%) contrast(1.1)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderLeft: "1px solid hsl(0,0%,88%)",
                    }}
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        zIndex: 2,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.45rem",
                        letterSpacing: "0.2em",
                        color: "hsl(323,100%,50%)",
                        textShadow: "0 0 4px rgba(255,255,255,0.8)",
                      }}
                    >
                      {t("s03.result")}
                    </p>
                    <img
                      src={imp.result_image_url}
                      alt={`${imp.title} — result`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "9 / 16",
                        objectFit: "cover",
                        filter: "grayscale(60%) contrast(1.05)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Title bar */}
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderTop: "1px solid hsl(0,0%,88%)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {imp.title}
                    </p>
                    {imp.description && (
                      <p
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.5rem",
                          color: "hsl(0,0%,40%)",
                          marginTop: "0.3rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {imp.description}
                      </p>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.45rem",
                      color: "hsl(0,0%,50%)",
                      letterSpacing: "0.15em",
                      whiteSpace: "nowrap",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {new Date(imp.created_at).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImprint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImprint(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.95)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ color: "white" }}>
                <h3
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {selectedImprint.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "hsl(0,0%,60%)",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    maxWidth: "600px",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedImprint.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedImprint(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "hsl(323,100%,50%)",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1rem",
                  alignSelf: "flex-start",
                  padding: "0.5rem",
                }}
              >
                [ CLOSE ]
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", gap: "1rem", flex: 1, overflow: "hidden" }}
            >
              <ZoomableImage
                src={selectedImprint.shadow_image_url}
                label={t("s03.source")}
              />
              <ZoomableImage
                src={selectedImprint.result_image_url}
                label={t("s03.result")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
