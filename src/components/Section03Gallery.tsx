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

export default function Section03Gallery() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [imprints, setImprints] = useState<Imprint[]>([]);
  
  // Состояние для хранения увеличенной фотографии
  const [enlargedImg, setEnlargedImg] = useState<string | null>(null);

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
        position: "relative"
      }}
    >
      {/* Header */}
      <div style={{
        padding: "4rem 4rem 2rem",
        borderBottom: "1px solid hsl(0,0%,88%)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem"
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
        <div style={{ 
          display: "grid", 
          // Уменьшили минимальную ширину карточки до 260px (было 450px)
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: "1.5rem", // Чуть уменьшили расстояние между карточками
          padding: "2rem clamp(1rem, 4vw, 4rem)"
        }}>
          {imprints.map((imp, i) => (
            <motion.div
              key={imp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid hsl(0,0%,88%)",
                backgroundColor: "#fff"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                {/* Shadow image */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <p style={{
                    position: "absolute", top: "0.5rem", left: "0.5rem", zIndex: 2, // Придвинули к краю
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.45rem", letterSpacing: "0.2em", // Уменьшили шрифт
                    color: "hsl(323,100%,50%)",
                    textShadow: "0 0 4px rgba(255,255,255,0.8)"
                  }}>
                    {t("s03.source")}
                  </p>
                  <img
                    src={imp.shadow_image_url}
                    alt={`${imp.title} — shadow`}
                    onClick={() => setEnlargedImg(imp.shadow_image_url)}
                    style={{
                      width: "100%", 
                      aspectRatio: "9 / 16",
                      objectFit: "cover",
                      filter: "grayscale(100%) contrast(1.1)",
                      cursor: "zoom-in",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>

                {/* Result image */}
                <div style={{ position: "relative", overflow: "hidden", borderLeft: "1px solid hsl(0,0%,88%)" }}>
                  <p style={{
                    position: "absolute", top: "0.5rem", left: "0.5rem", zIndex: 2, // Придвинули к краю
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.45rem", letterSpacing: "0.2em", // Уменьшили шрифт
                    color: "hsl(323,100%,50%)",
                    textShadow: "0 0 4px rgba(255,255,255,0.8)"
                  }}>
                    {t("s03.result")}
                  </p>
                  <img
                    src={imp.result_image_url}
                    alt={`${imp.title} — result`}
                    onClick={() => setEnlargedImg(imp.result_image_url)}
                    style={{
                      width: "100%", 
                      aspectRatio: "9 / 16",
                      objectFit: "cover",
                      filter: "grayscale(60%) contrast(1.05)",
                      cursor: "zoom-in",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
              </div>

              {/* Title bar */}
              <div style={{
                padding: "1rem", // Уменьшили внутренние отступы текстового блока
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderTop: "1px solid hsl(0,0%,88%)",
                flex: 1
              }}>
                <div>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem", fontWeight: 700, // Сделали заголовок чуть меньше
                    letterSpacing: "0.05em",
                  }}>
                    {imp.title}
                  </p>
                  {imp.description && (
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem", color: "hsl(0,0%,40%)", // Сделали описание чуть меньше
                      marginTop: "0.4rem", lineHeight: 1.5,
                    }}>
                      {imp.description}
                    </p>
                  )}
                </div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.45rem", color: "hsl(0,0%,50%)",
                  letterSpacing: "0.15em",
                  whiteSpace: "nowrap",
                  marginLeft: "0.5rem"
                }}>
                  {new Date(imp.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Окно увеличения изображения (Lightbox) */}
      <AnimatePresence>
        {enlargedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImg(null)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "zoom-out",
              padding: "2rem"
            }}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={enlargedImg}
              alt="Enlarged view"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "4px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
