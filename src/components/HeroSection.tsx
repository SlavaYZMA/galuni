import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh", // Увеличил высоту, чтобы заголовок смотрелся массивнее
        padding: "2rem 2rem 1.5rem",
        borderBottom: "1px solid hsl(0,0%,88%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Слева: Ссылка на экземпляр */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "2rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "hsl(0,0%,50%)",
          textTransform: "uppercase",
        }}
      >
        {t("hero.ref")}
      </motion.div>

      {/* Справа: Статус */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "2rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "hsl(0,0%,50%)",
          textTransform: "uppercase",
        }}
      >
        {t("hero.status")}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        {/* Подзаголовок */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "hsl(323,100%,50%)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* Главный заголовок с пасхалкой */}
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.8rem, 8vw, 5.5rem)", // Чуть увеличил для эффекта
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "hsl(0,0%,0%)",
            textTransform: "uppercase",
            maxWidth: "1100px",
          }}
        >
          {/* Первая строка: CALCU + LATE + D */}
          {t("hero.title_1")}
          <span style={{ color: "hsl(323,100%,50%)" }}>
            {t("hero.title_1_accent")}
          </span>
          {t("hero.title_1_end")}
          
          <br />

          {/* Вторая строка: CORPO + REALITY + ОСТЬ */}
          {t("hero.title_2")}
          <span style={{ color: "hsl(323,100%,50%)" }}>
            {t("hero.title_2_accent")}
          </span>
          {t("hero.title_2_end")}
        </h1>
      </motion.div>

      {/* Canvas Инфо */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: "2rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.5rem",
          color: "hsl(0,0%,70%)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {t("hero.canvas")}
      </motion.p>

      {/* Скролл вниз */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "1.5rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          color: "hsl(0,0%,50%)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {t("hero.scroll")}
      </motion.p>
    </section>
  );
}
