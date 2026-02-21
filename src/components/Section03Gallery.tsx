import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

export default function Section03Gallery() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [imprints, setImprints] = useState<Imprint[]>([]);

  useEffect(() => {
    supabase
      .from("imprints")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setImprints(data as Imprint[]);
      });
  }, []);

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        minHeight: "100vh",
        borderBottom: "1px solid hsl(0,0%,88%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "4rem 4rem 2rem",
        borderBottom: "1px solid hsl(0,0%,88%)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.3em",
            color: "hsl(323,100%,50%)", textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            {t("s03.label")}
          </p>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.5rem, 3vw, 3.5rem)",
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}>
            {t("s03.title_1")}<br />
            <span style={{ color: "hsl(323,100%,50%)" }}>{t("s03.title_2")}</span>
          </h2>
        </motion.div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem", color: "hsl(0,0%,50%)",
          letterSpacing: "0.15em",
        }}>
          {imprints.length} IMPRINTS
        </p>
      </div>

      {/* Content */}
      {imprints.length === 0 ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem", color: "hsl(0,0%,50%)",
            letterSpacing: "0.2em",
          }}>
            {t("s03.empty")}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {imprints.map((imp, i) => (
            <motion.div
              key={imp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderBottom: "1px solid hsl(0,0%,88%)",
              }}
            >
              {/* Shadow image */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <p style={{
                  position: "absolute", top: "1rem", left: "1rem", zIndex: 2,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem", letterSpacing: "0.2em",
                  color: "hsl(323,100%,50%)",
                }}>
                  {t("s03.source")}
                </p>
                <img
                  src={imp.shadow_image_url}
                  alt={`${imp.title} — shadow`}
                  style={{
                    width: "100%", 
                    aspectRatio: "9 / 16",
                    objectFit: "cover",
                    filter: "grayscale(100%) contrast(1.1)",
                  }}
                />
              </div>

              {/* Result image */}
              <div style={{ position: "relative", overflow: "hidden", borderLeft: "1px solid hsl(0,0%,88%)" }}>
                <p style={{
                  position: "absolute", top: "1rem", left: "1rem", zIndex: 2,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem", letterSpacing: "0.2em",
                  color: "hsl(323,100%,50%)",
                }}>
                  {t("s03.result")}
                </p>
                <img
                  src={imp.result_image_url}
                  alt={`${imp.title} — result`}
                  style={{
                    width: "100%", 
                    aspectRatio: "9 / 16",
                    objectFit: "cover",
                    filter: "grayscale(60%) contrast(1.05)",
                  }}
                />
              </div>

              {/* Title bar */}
              <div style={{
                gridColumn: "1 / -1",
                padding: "1.5rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid hsl(0,0%,88%)",
              }}>
                <div>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8rem", fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}>
                    {imp.title}
                  </p>
                  {imp.description && (
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem", color: "hsl(0,0%,40%)",
                      marginTop: "0.4rem", lineHeight: 1.6,
                      maxWidth: "500px",
                    }}>
                      {imp.description}
                    </p>
                  )}
                </div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem", color: "hsl(0,0%,50%)",
                  letterSpacing: "0.15em",
                }}>
                  {new Date(imp.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
