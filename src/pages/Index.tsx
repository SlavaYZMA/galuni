import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import Section01Trace from "@/components/Section01Trace";
import Section02Theory from "@/components/Section02Theory";
import Section03Gallery from "@/components/Section03Gallery";
import Section04Engine from "@/components/Section04Engine";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7 },
};

const Index = () => {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "hsl(0,0%,96%)",
        color: "hsl(0,0%,0%)",
        minHeight: "100vh",
      }}
    >
      {/* Custom cursor */}
      <CustomCursor />

      {/* Sticky side nav */}
      <StickyNav />

      {/* Footer bar top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "1px", background: "hsl(0,0%,88%)", zIndex: 100,
      }} />

      {/* Hero */}
      <motion.div {...fadeUp}>
        <HeroSection />
      </motion.div>

      {/* Section 01 */}
      <motion.div {...fadeUp}>
        <Section01Trace />
      </motion.div>

      {/* Section 02 */}
      <motion.div {...fadeUp}>
        <Section02Theory />
      </motion.div>

      {/* Section 03 */}
      <motion.div {...fadeUp}>
        <Section03Gallery />
      </motion.div>

      {/* Section 04 */}
      <motion.div {...fadeUp}>
        <Section04Engine />
      </motion.div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid hsl(0,0%,88%)",
        padding: "2rem 4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(0,0%,50%)", letterSpacing: "0.2em" }}>
          АЛГОРИТМИЧЕСКАЯ АБЪЕКЦИЯ / 2024
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(323,100%,50%)", letterSpacing: "0.2em" }}>
          STERILE ARCHIVE v1.0.0
        </span>
      </footer>
    </div>
  );
};

export default Index;
