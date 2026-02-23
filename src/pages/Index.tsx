import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import Section01Trace from "@/components/Section01Trace";
import Section03Gallery from "@/components/Section03Gallery";
import SurfaceCanvas from "@/components/SurfaceCanvas";
import { useLanguage } from "@/i18n/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7 },
};

const Index = () => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "hsl(0,0%,96%)",
        color: "hsl(0,0%,0%)",
        minHeight: "100vh",
      }}
    >
      <CustomCursor />
      <StickyNav />

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "1px", background: "hsl(0,0%,88%)", zIndex: 100,
      }} />

      <motion.div {...fadeUp}><HeroSection /></motion.div>
      <motion.div {...fadeUp}><Section03Gallery /></motion.div>
      <motion.div {...fadeUp}><Section01Trace /></motion.div>
      <motion.div {...fadeUp}><SurfaceCanvas /></motion.div>

      <footer style={{
        borderTop: "1px solid hsl(0,0%,88%)",
        padding: "2rem 4rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(0,0%,50%)", letterSpacing: "0.2em" }}>
          {t("footer.left")}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(323,100%,50%)", letterSpacing: "0.2em" }}>
          {t("footer.right")}
        </span>
      </footer>
    </div>
  );
};

export default Index;
