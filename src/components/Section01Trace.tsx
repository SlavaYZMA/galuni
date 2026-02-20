import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import traceImage from "@/assets/trace-image.jpg";

export default function Section01Trace() {
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
            SECTION 01 / THE TRACE
          </p>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.5rem, 3vw, 3rem)",
            fontWeight: 800, lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "3rem",
          }}>
            МАТЕРИ<br />АЛЬНОСТЬ
          </h2>

          <div style={{ borderLeft: "2px solid hsl(0,0%,88%)", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem", lineHeight: 1.8,
              color: "hsl(0,0%,20%)",
            }}>
              The body as data. The skin as interface.
              Each algorithmic pass leaves residue—
              not information, but the ghost of information.
              What the machine sees is not the body,
              but the body's translation into numbers,
              then back into synthetic flesh.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "MATERIALITY INDEX", value: "0.847" },
              { label: "TRACE DENSITY", value: "92.3%" },
              { label: "DATA RESIDUE", value: "14.2 MB" },
              { label: "GHOST WEIGHT", value: "0.003 kg" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                borderTop: "1px solid hsl(0,0%,88%)",
                paddingTop: "0.75rem",
              }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)", marginBottom: "0.25rem" }}>{label}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", fontWeight: 700, color: "hsl(323,100%,50%)" }}>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right column — image with scan reveal */}
      <div ref={imgRef} style={{ position: "relative", overflow: "hidden", minHeight: "500px" }}>
        <img
          src={traceImage}
          alt="body trace archive"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%) contrast(1.1)",
          }}
        />
        {/* Pink scanning grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(
            to bottom,
            hsl(323,100%,50%,0.12) 0%,
            transparent ${revealed * 100}%
          )`,
          transition: "background 0.1s",
          pointerEvents: "none",
        }} />
        {/* Scan lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            hsl(323,100%,50%,0.04) 3px,
            hsl(323,100%,50%,0.04) 4px
          )`,
          pointerEvents: "none",
        }} />
        {/* Moving scan bar */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          height: "2px",
          background: "hsl(323,100%,50%)",
          top: `${revealed * 100}%`,
          boxShadow: "0 0 12px hsl(323,100%,50%), 0 0 24px hsl(323,100%,50%,0.5)",
          transition: "top 0.1s",
        }} />
        {/* Label */}
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "1.5rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem", color: "hsl(323,100%,50%)",
          letterSpacing: "0.2em",
        }}>
          SCANNING... {Math.round(revealed * 100)}%
        </div>
      </div>
    </section>
  );
}
