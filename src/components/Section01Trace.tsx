import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import traceImage from "@/assets/trace-image.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

// Glitch text effect component
const GlitchWord = ({ children }: { children: string }) => {
  const [display, setDisplay] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchChars = "╬░▒▓█▀▄■□◆◇○●※†‡";
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startGlitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);
    const original = children;
    let count = 0;
    const maxIterations = 6;

    const scramble = () => {
      count++;
      if (count >= maxIterations) {
        setDisplay(original);
        setIsGlitching(false);
        return;
      }
      const scrambled = original
        .split("")
        .map((ch) =>
          ch === " "
            ? " "
            : Math.random() > 0.4
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : ch
        )
        .join("");
      setDisplay(scrambled);
      timeouts.current.push(setTimeout(scramble, 50));
    };
    scramble();
  }, [children, isGlitching]);

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  return (
    <span
      data-hover
      onMouseEnter={startGlitch}
      style={{
        cursor: "none",
        transition: "color 0.1s",
        color: isGlitching ? "hsl(323,100%,50%)" : "inherit",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {display}
    </span>
  );
};

const paragraphKeys = ["s01.body_1", "s01.body_2", "s01.body_3", "s01.body_4"];

// Words to make glitchy per paragraph
const glitchWordsMap: Record<number, string[]> = {
  0: ["shadow", "machine code", "reality", "тень", "машинному коду", "реальность", "Schatten", "Maschinencode", "Realität"],
  1: ["latent space", "hallucination", "volume", "латентному пространству", "галлюцинацию", "объем", "latenten Raum", "Halluzinationen", "Volumen"],
  2: ["biomass", "Frankenstein", "chimera", "биомассы", "Франкенштейн", "химеру", "Biomasse", "Schimäre"],
  3: ["violence", "deepfakes", "weapon", "насилия", "дипфейков", "оружие", "Gewalt", "Deepfakes", "Waffe"],
};

function applyGlitch(text: string, paraIndex: number) {
  const words = glitchWordsMap[paraIndex] || [];
  if (words.length === 0) return text;

  // Find glitch words in text and wrap them
  let parts: (string | { glitch: string })[] = [text];
  
  for (const word of words) {
    const newParts: (string | { glitch: string })[] = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        newParts.push(part);
        continue;
      }
      const idx = part.toLowerCase().indexOf(word.toLowerCase());
      if (idx === -1) {
        newParts.push(part);
        continue;
      }
      if (idx > 0) newParts.push(part.slice(0, idx));
      newParts.push({ glitch: part.slice(idx, idx + word.length) });
      if (idx + word.length < part.length) newParts.push(part.slice(idx + word.length));
    }
    parts = newParts;
  }

  return parts;
}

function ScrollParagraph({
  textKey,
  paraIndex,
  t,
}: {
  textKey: string;
  paraIndex: number;
  t: (key: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const text = t(textKey);
  const parts = applyGlitch(text, paraIndex);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      style={{
        paddingBottom: "3rem",
        borderLeft: "2px solid hsl(0,0%,88%)",
        paddingLeft: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          lineHeight: 1.9,
          color: "hsl(0,0%,15%)",
        }}
      >
        {Array.isArray(parts)
          ? parts.map((part, i) =>
              typeof part === "string" ? (
                <span key={i}>{part}</span>
              ) : (
                <GlitchWord key={i}>{part.glitch}</GlitchWord>
              )
            )
          : text}
      </p>
    </motion.div>
  );
}

export default function Section01Trace() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scanLineTop = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);
  const [scanPercent, setScanPercent] = useState(0);

  useMotionValueEvent(scanLineTop, "change", (v) => {
    setScanPercent(Math.round(Math.max(0, Math.min(100, v))));
  });

  return (
    <section
      id="trace"
      ref={sectionRef}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid hsl(0,0%,88%)",
        position: "relative",
      }}
    >
      {/* Left column — scrollytelling text */}
      <div
        style={{
          padding: "6rem 4rem",
          borderRight: "1px solid hsl(0,0%,88%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3rem" }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "hsl(323,100%,50%)",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            {t("s01.label")}
          </p>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {t("s01.title_1")}
            <br />
            {t("s01.title_2")}
          </h2>
        </motion.div>

        {paragraphKeys.map((key, i) => (
          <ScrollParagraph key={key} textKey={key} paraIndex={i} t={t} />
        ))}
      </div>

      {/* Right column — sticky image with scan line */}
      <div style={{ position: "relative", minHeight: "100%" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <img
            src={traceImage}
            alt="body trace archive"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1)",
            }}
          />
          {/* Pink gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, hsl(323,100%,50%,0.12) 0%, transparent ${scanPercent}%)`,
              transition: "background 0.1s",
              pointerEvents: "none",
            }}
          />
          {/* Scan lines texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(323,100%,50%,0.04) 3px, hsl(323,100%,50%,0.04) 4px)",
              pointerEvents: "none",
            }}
          />
          {/* Moving scan line — tied to scroll */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "2px",
              background: "hsl(323,100%,50%)",
              top: `${scanPercent}%`,
              boxShadow:
                "0 0 12px hsl(323,100%,50%), 0 0 24px hsl(323,100%,50%,0.5)",
              transition: "top 0.05s linear",
            }}
          />
          {/* Progress label */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: "hsl(323,100%,50%)",
              letterSpacing: "0.2em",
            }}
          >
            {t("s01.scan")} {scanPercent}%
          </div>
        </div>
      </div>

      {/* Mobile responsive: hide grid on small screens */}
      <style>{`
        @media (max-width: 768px) {
          #trace {
            grid-template-columns: 1fr !important;
          }
          #trace > div:last-child {
            position: relative !important;
            height: 60vh !important;
          }
          #trace > div:last-child > div {
            position: relative !important;
            height: 60vh !important;
          }
        }
      `}</style>
    </section>
  );
}
