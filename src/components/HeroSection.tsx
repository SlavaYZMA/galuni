import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "4rem 2rem",
        borderBottom: "1px solid hsl(0,0%,88%)",
        position: "relative", overflow: "hidden",
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        style={{ position: "absolute", top: "2rem", left: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)", textTransform: "uppercase" }}>
        {t("hero.ref")}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        style={{ position: "absolute", top: "2rem", right: "5rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)", textTransform: "uppercase" }}>
        {t("hero.status")}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.35em", color: "hsl(323,100%,50%)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          {t("hero.subtitle")}
        </p>
        <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2rem, 6vw, 7rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.03em", color: "hsl(0,0%,0%)", textTransform: "uppercase", maxWidth: "900px" }}>
          {t("hero.title_1")}<span style={{ color: "hsl(323,100%,50%)" }}>{t("hero.title_1_accent")}</span>
          <br />
          {t("hero.title_2")}<span style={{ color: "hsl(323,100%,50%)" }}>{t("hero.title_2_accent")}</span>{t("hero.title_2_end")}
        </h1>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ marginTop: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "hsl(0,0%,50%)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {t("hero.scroll")}
      </motion.p>
    </section>
  );
}
