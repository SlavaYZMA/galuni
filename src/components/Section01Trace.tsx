import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import traceImage from "@/assets/trace-image.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Section01Trace() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(entry.intersectionRatio);
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trace"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid hsl(0,0%,88%)",
      }}
    >
      {/* Left column */}
      <div style={{
        padding: "6rem 4rem",
        borderRight: "1px solid hsl(0,0%,88%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.3em",
            color: "hsl(323,100%,50%)", textTransform: "uppercase",
            marginBottom: "2rem",
          }}>
            {t("s01.label")}
          </p>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.5rem, 3vw, 3rem)",
            fontWeight: 800, lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "3rem",
          }}>
            {t("s01.title_1")}<br />{t("s01.title_2")}
          </h2>

          <div style={{ borderLeft: "2px solid hsl(0,0%,88%)", paddingLeft: "1.5rem" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem", lineHeight: 1.8,
              color: "hsl(0,0%,20%)",
            }}>
              {t("s01.body")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right column — image with scan reveal */}
      <div ref={imgRef} style={{ position: "relative", overflow: "hidden", minHeight: "500px" }}>
        <img
          src={traceImage}
          alt="body trace archive"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(1.1)" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, hsl(323,100%,50%,0.12) 0%, transparent ${revealed * 100}%)`,
          transition: "background 0.1s", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(323,100%,50%,0.04) 3px, hsl(323,100%,50%,0.04) 4px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "hsl(323,100%,50%)",
          top: `${revealed * 100}%`,
          boxShadow: "0 0 12px hsl(323,100%,50%), 0 0 24px hsl(323,100%,50%,0.5)",
          transition: "top 0.1s",
        }} />
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "1.5rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem", color: "hsl(323,100%,50%)",
          letterSpacing: "0.2em",
        }}>
          {t("s01.scan")} {Math.round(revealed * 100)}%
        </div>
      </div>
    </section>
  );
}
