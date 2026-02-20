import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import bodyImprint2 from "@/assets/body-imprint-2.jpg";
import bodyImprint3 from "@/assets/body-imprint-3.jpg";
import traceImage from "@/assets/trace-image.jpg";

const cards = [
  {
    id: "AA-001",
    title: "SPECIMEN ALPHA",
    image: traceImage,
    massIndex: "23.4",
    aiConf: "97.2%",
    resolution: "4096 × 5120",
    status: "ARCHIVED",
    canny: "82/240",
  },
  {
    id: "AA-002",
    title: "SPECIMEN BETA",
    image: bodyImprint2,
    massIndex: "19.8",
    aiConf: "94.1%",
    resolution: "3840 × 4800",
    status: "PROCESSING",
    canny: "75/215",
  },
  {
    id: "AA-003",
    title: "SPECIMEN GAMMA",
    image: bodyImprint3,
    massIndex: "27.1",
    aiConf: "98.7%",
    resolution: "4096 × 5120",
    status: "ARCHIVED",
    canny: "90/255",
  },
  {
    id: "AA-004",
    title: "SPECIMEN DELTA",
    image: bodyImprint2,
    massIndex: "21.6",
    aiConf: "91.3%",
    resolution: "2048 × 2560",
    status: "FLAGGED",
    canny: "68/200",
  },
  {
    id: "AA-005",
    title: "SPECIMEN EPSILON",
    image: traceImage,
    massIndex: "25.0",
    aiConf: "99.1%",
    resolution: "4096 × 5120",
    status: "ARCHIVED",
    canny: "85/230",
  },
];

export default function Section03Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const scrollRef = useRef<HTMLDivElement>(null);

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
            SECTION 03 / GHOST GALLERY
          </p>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.5rem, 3vw, 3.5rem)",
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}>
            АРХИВ<br /><span style={{ color: "hsl(323,100%,50%)" }}>ОТПЕЧАТКОВ</span>
          </h2>
        </motion.div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem", color: "hsl(0,0%,50%)",
          letterSpacing: "0.15em",
        }}>
          {cards.length} SPECIMENS / SCROLL →
        </p>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          flex: 1,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: 0,
        }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            data-hover
            style={{
              flexShrink: 0,
              width: "340px",
              borderRight: "1px solid hsl(0,0%,88%)",
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Image */}
            <div style={{ height: "420px", overflow: "hidden", position: "relative" }}>
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(60%) contrast(1.05)",
                  transition: "transform 0.6s, filter 0.4s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.transform = "scale(1.04)";
                  (e.target as HTMLImageElement).style.filter = "grayscale(0%) contrast(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.transform = "scale(1)";
                  (e.target as HTMLImageElement).style.filter = "grayscale(60%) contrast(1.05)";
                }}
              />
              {/* Status badge */}
              <div style={{
                position: "absolute", top: "1rem", right: "1rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5rem", letterSpacing: "0.2em",
                color: card.status === "FLAGGED" ? "hsl(323,100%,50%)" : "hsl(0,0%,0%)",
                background: card.status === "FLAGGED" ? "transparent" : "hsl(0,0%,96%)",
                border: card.status === "FLAGGED" ? "1px solid hsl(323,100%,50%)" : "1px solid hsl(0,0%,88%)",
                padding: "0.2rem 0.5rem",
              }}>
                {card.status}
              </div>
              {/* ID overlay */}
              <div style={{
                position: "absolute", bottom: "1rem", left: "1rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5rem", color: "hsl(323,100%,50%)",
                letterSpacing: "0.15em",
              }}>
                {card.id}
              </div>
            </div>

            {/* Metadata */}
            <div style={{ padding: "1.5rem", borderTop: "1px solid hsl(0,0%,88%)", flex: 1 }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.1em", marginBottom: "1rem",
              }}>
                {card.title}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { k: "MASS INDEX", v: card.massIndex },
                  { k: "AI CONF.", v: card.aiConf },
                  { k: "RESOLUTION", v: card.resolution },
                  { k: "CANNY", v: card.canny },
                ].map(({ k, v }) => (
                  <div key={k}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.45rem", color: "hsl(0,0%,55%)", letterSpacing: "0.15em", marginBottom: "0.2rem" }}>{k}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 600 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
