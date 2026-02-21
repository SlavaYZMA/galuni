import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface Dent {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  createdAt: number;
}

export default function HeroSection() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dentsRef = useRef<Dent[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;
      dentsRef.current.push({ x, y, radius: 60, opacity: 0.35, createdAt: Date.now() });
      if (dentsRef.current.length > 80) dentsRef.current.shift();
    };

    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      ctx.strokeStyle = "rgba(0,0,0,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      dentsRef.current = dentsRef.current.filter((d) => now - d.createdAt < 3000);

      dentsRef.current.forEach((dent) => {
        const age = (now - dent.createdAt) / 3000;
        const alpha = dent.opacity * (1 - age);
        const r = dent.radius * (1 + age * 0.5);
        const grad = ctx.createRadialGradient(dent.x, dent.y, 0, dent.x, dent.y, r);
        grad.addColorStop(0, `rgba(100,100,100,${alpha})`);
        grad.addColorStop(0.4, `rgba(120,120,120,${alpha * 0.6})`);
        grad.addColorStop(1, "rgba(120,120,120,0)");
        ctx.beginPath();
        ctx.arc(dent.x, dent.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(dent.x, dent.y, r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180,0,100,${alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
          АЛГОРИТ<span style={{ color: "hsl(323,100%,50%)" }}>МИЧ</span>ЕСКАЯ
          <br />
          АБЪ<span style={{ color: "hsl(323,100%,50%)" }}>ЕК</span>ЦИЯ
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
        style={{ position: "relative", width: "min(700px, 90vw)", height: "280px", border: "1px solid hsl(0,0%,88%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "0.5rem", left: "0.75rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(0,0%,60%)", letterSpacing: "0.15em", zIndex: 2 }}>
          {t("hero.canvas")}
        </div>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
          <div key={i} style={{
            position: "absolute",
            ...(pos.includes("top") ? { top: 0 } : { bottom: 0 }),
            ...(pos.includes("left") ? { left: 0 } : { right: 0 }),
            width: 8, height: 8,
            borderTop: pos.includes("top") ? "1px solid hsl(323,100%,50%)" : "none",
            borderBottom: pos.includes("bottom") ? "1px solid hsl(323,100%,50%)" : "none",
            borderLeft: pos.includes("left") ? "1px solid hsl(323,100%,50%)" : "none",
            borderRight: pos.includes("right") ? "1px solid hsl(323,100%,50%)" : "none",
          }} />
        ))}
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ marginTop: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "hsl(0,0%,50%)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {t("hero.scroll")}
      </motion.p>
    </section>
  );
}
