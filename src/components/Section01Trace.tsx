import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import traceImage from "@/assets/trace-image.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import InlineTerm from "@/components/InlineTerm";

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

// Glossary term definitions per paragraph: { match variants per lang, glossary key }
interface TermDef {
  words: Record<string, string>; // lang -> word to match in text
  glossaryKey: string;
}

const glossaryTermsMap: Record<number, TermDef[]> = {
  1: [
    { words: { en: "latent space", ru: "латентному пространству", de: "latenten Raum" }, glossaryKey: "glossary.latentSpace" },
    { words: { en: "hallucination", ru: "галлюцинацию", de: "Halluzinationen" }, glossaryKey: "glossary.hallucination" },
  ],
  2: [
    { words: { en: "biomass", ru: "биомассы", de: "Biomasse" }, glossaryKey: "glossary.biomass" },
    { words: { en: "chimera", ru: "химеру", de: "Schimäre" }, glossaryKey: "glossary.chimera" },
  ],
  3: [
    { words: { en: "violence", ru: "насилия", de: "Gewalt" }, glossaryKey: "glossary.violence" },
    { words: { en: "deepfakes", ru: "дипфейков", de: "Deepfakes" }, glossaryKey: "glossary.deepfakes" },
  ],
};

// Words to make glitchy per paragraph (excluding glossary terms to avoid conflicts)
const glitchWordsMap: Record<number, string[]> = {
  0: ["shadow", "machine code", "reality", "тень", "машинному коду", "реальность", "Schatten", "Maschinencode", "Realität"],
  1: ["volume", "объем", "Volumen"],
  2: ["Frankenstein", "Франкенштейн"],
  3: ["weapon", "оружие", "Waffe"],
};

type Part = string | { glitch: string } | { term: string; glossaryKey: string };

function applyMarkers(text: string, paraIndex: number, lang: string): Part[] {
  let parts: Part[] = [text];

  // Apply glossary terms first
  const termDefs = glossaryTermsMap[paraIndex] || [];
  for (const td of termDefs) {
    const word = td.words[lang];
    if (!word) continue;
    const newParts: Part[] = [];
    for (const part of parts) {
      if (typeof part !== "string") { newParts.push(part); continue; }
      const idx = part.toLowerCase().indexOf(word.toLowerCase());
      if (idx === -1) { newParts.push(part); continue; }
      if (idx > 0) newParts.push(part.slice(0, idx));
      newParts.push({ term: part.slice(idx, idx + word.length), glossaryKey: td.glossaryKey });
      if (idx + word.length < part.length) newParts.push(part.slice(idx + word.length));
    }
    parts = newParts;
  }

  // Apply glitch words
  const glitchWords = glitchWordsMap[paraIndex] || [];
  for (const word of glitchWords) {
    const newParts: Part[] = [];
    for (const part of parts) {
      if (typeof part !== "string") { newParts.push(part); continue; }
      const idx = part.toLowerCase().indexOf(word.toLowerCase());
      if (idx === -1) { newParts.push(part); continue; }
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
  lang,
}: {
  textKey: string;
  paraIndex: number;
  t: (key: string) => string;
  lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const text = t(textKey);
  const parts = applyMarkers(text, paraIndex, lang);

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
        {parts.map((part, i) => {
          if (typeof part === "string") return <span key={i}>{part}</span>;
          if ("glitch" in part) return <GlitchWord key={i}>{part.glitch}</GlitchWord>;
          if ("term" in part) return <InlineTerm key={i} term={part.term} description={t(part.glossaryKey)} />;
          return null;
        })}
      </p>
    </motion.div>
  );
}

export default function Section01Trace() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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
          <ScrollParagraph key={key} textKey={key} paraIndex={i} t={t} lang={lang} />
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

      {/* Mobile responsive */}
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
