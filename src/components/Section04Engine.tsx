import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@gradio/client"; 

// ТУТ ТОЛЬКО БАЗОВАЯ ССЫЛКА (без /api/generate)
const GRADIO_BASE_URL = "https://5af0dcce33a8f83be4.gradio.live";

const DEFAULT_PARAMS = {
  prompt: "(completely naked:1.4), detailed belly button, chest, natural lighting",
  negative_prompt: "cartoon, painting, illustration, airbrushed, doll",
  steps: 30,
  cfg_scale: 8.5,
  controlnet_scale: 0.85,
  hires_strength: 0.4,
  canny_low: 100,
  canny_high: 200,
  abject_strength: 0.45,
  final_refine: 0.2,
};

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit?: string;
}

function ClinicSlider({ label, value, min, max, step, onChange, unit = "" }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "hsl(0,0%,50%)" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", fontWeight: 700, color: "hsl(323,100%,50%)" }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ position: "relative", height: "1px", background: "hsl(0,0%,88%)" }}>
        <div style={{
          position: "absolute", left: 0, top: 0,
          width: `${pct}%`, height: "100%",
          background: "hsl(323,100%,50%)",
        }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          data-hover
          style={{
            position: "absolute", top: "-6px", left: 0,
            width: "100%", opacity: 0,
            cursor: "none", height: "14px",
          }}
        />
        <div style={{
          position: "absolute", left: `${pct}%`, top: "50%",
          transform: "translate(-50%, -50%)",
          width: 8, height: 8, background: "hsl(0,0%,96%)",
          border: "1px solid hsl(323,100%,50%)", borderRadius: "50%",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

export default function Section04Engine() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = useCallback((key: keyof typeof DEFAULT_PARAMS) => (v: number | string) => {
    setParams((p) => ({ ...p, [key]: v }));
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const res = ev.target?.result as string;
      setImagePreview(res);
      setImageBase64(res);
    };
    reader.readAsDataURL(file);
  };

  const simulate = () => {
    setProgress(0);
    let p = 0;
    const tick = () => {
      p += Math.random() * 8 + 2;
      setProgress(Math.min(p, 95));
      if (p < 95) progressRef.current = setTimeout(tick, 200);
    };
    tick();
  };

  const generate = async () => {
    setError(null);
    setResult(null);
    setIsGenerating(true);
    simulate();

    try {
      if (!imageBase64) {
        throw new Error("Сначала загрузите изображение (INPUT IMAGE)!");
      }

      console.log("Устанавливаем связь с Gradio через официальный клиент...");
      
      const response = await fetch(imageBase64);
      const blob = await response.blob();

      // ИСПРАВЛЕНИЕ: Используем функцию client (с маленькой буквы)
      const app = await client(GRADIO_BASE_URL);

      console.log("Задача отправлена. Ожидаем результат...");

      const output = await app.predict("/generate", [
        blob,
        params.prompt,
        params.negative_prompt,
        params.steps,
        params.cfg_scale,
        params.controlnet_scale,
        params.hires_strength,
        params.canny_low,
        params.canny_high,
        params.abject_strength,
        params.final_refine,
      ]);

      console.log("Успешный ответ получен!", output);

      // @ts-ignore
      const finalImageOutput = output?.data?.[0];
      
      if (typeof finalImageOutput === 'string') {
        setResult(finalImageOutput);
      } else if (finalImageOutput && typeof finalImageOutput === 'object' && finalImageOutput.url) {
        setResult(finalImageOutput.url);
      } else {
        throw new Error("Сервер прислал неизвестный формат данных.");
      }
    } catch (err) {
      console.error("Ошибка генерации:", err);
      setError(err instanceof Error ? err.message : "Связь прервана.");
    } finally {
      if (progressRef.current) clearTimeout(progressRef.current);
      setProgress(100);
      setTimeout(() => setIsGenerating(false), 400);
    }
  };

  return (
    <section id="engine" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
      <AnimatePresence>
        {isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 5000, background: "hsl(0,0%,96%,0.95)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
            <div style={{ width: "300px", height: "300px", border: "1px solid hsl(0,0%,88%)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, hsl(323,100%,50%), transparent)", animation: "scan-down 1.8s linear infinite", boxShadow: "0 0 20px hsl(323,100%,50%)" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, hsl(323,100%,50%,0.04) 5px, hsl(323,100%,50%,0.04) 6px)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "hsl(323,100%,50%)", textAlign: "center" }}>STERILE<br />SCANNING</span>
              </div>
            </div>
            <div style={{ width: "300px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: "hsl(0,0%,50%)", marginBottom: "0.75rem", textAlign: "center" }}>STERILE SCANNING IN PROGRESS...</p>
              <div style={{ height: "2px", background: "hsl(0,0%,88%)", position: "relative" }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} style={{ height: "100%", background: "hsl(323,100%,50%)", boxShadow: "0 0 8px hsl(323,100%,50%)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", color: "hsl(0,0%,60%)" }}>STEP {Math.round(progress / 100 * params.steps)}/{params.steps}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", color: "hsl(323,100%,50%)" }}>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ padding: "5rem 4rem", borderRight: "1px solid hsl(0,0%,88%)", overflowY: "auto" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "hsl(323,100%,50%)", textTransform: "uppercase", marginBottom: "1rem" }}>SECTION 04 / THE ENGINE</p>
        <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "3rem" }}>STERILE<br /><span style={{ color: "hsl(323,100%,50%)" }}>CONTROL</span><br />PANEL</h2>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)", marginBottom: "0.75rem" }}>INPUT IMAGE / BODY SCAN</p>
          <div data-hover onClick={() => fileRef.current?.click()} style={{ border: "1px dashed hsl(0,0%,78%)", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", position: "relative", overflow: "hidden", transition: "border-color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "hsl(323,100%,50%)")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(0,0%,78%)")}>
            {imagePreview ? <img src={imagePreview} alt="upload" style={{ height: "100%", width: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "hsl(0,0%,60%)", letterSpacing: "0.15em" }}>+ UPLOAD SPECIMEN</span>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>

        {(["prompt", "negative_prompt"] as const).map((key) => (
          <div key={key} style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "hsl(0,0%,50%)", marginBottom: "0.4rem" }}>{key === "prompt" ? "PROMPT" : "NEGATIVE PROMPT"}</p>
            <textarea value={params[key]} onChange={(e) => set(key)(e.target.value)} rows={2} data-hover style={{ width: "100%", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", border: "1px solid hsl(0,0%,88%)", background: "hsl(0,0%,100%)", padding: "0.75rem", resize: "vertical", outline: "none", color: "hsl(0,0%,0%)", lineHeight: 1.6 }} onFocus={(e) => (e.target.style.borderColor = "hsl(323,100%,50%)")} onBlur={(e) => (e.target.style.borderColor = "hsl(0,0%,88%)")} />
          </div>
        ))}

        <div style={{ borderTop: "1px solid hsl(0,0%,88%)", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
          <ClinicSlider label="STEPS" value={params.steps} min={10} max={60} step={1} onChange={(v) => set("steps")(v)} />
          <ClinicSlider label="CFG SCALE" value={params.cfg_scale} min={1} max={20} step={0.1} onChange={(v) => set("cfg_scale")(v)} />
          <ClinicSlider label="CONTROLNET SCALE" value={params.controlnet_scale} min={0} max={2} step={0.05} onChange={(v) => set("controlnet_scale")(v)} />
          <ClinicSlider label="HIRES STRENGTH" value={params.hires_strength} min={0} max={1} step={0.01} onChange={(v) => set("hires_strength")(v)} />
          <ClinicSlider label="CANNY LOW" value={params.canny_low} min={0} max={255} step={1} onChange={(v) => set("canny_low")(v)} />
          <ClinicSlider label="CANNY HIGH" value={params.canny_high} min={0} max={255} step={1} onChange={(v) => set("canny_high")(v)} />
          <ClinicSlider label="ABJECT STRENGTH" value={params.abject_strength} min={0} max={1} step={0.01} onChange={(v) => set("abject_strength")(v)} />
          <ClinicSlider label="FINAL REFINE" value={params.final_refine} min={0} max={1} step={0.01} onChange={(v) => set("final_refine")(v)} />
        </div>

        <button data-hover onClick={generate} disabled={isGenerating} style={{ width: "100%", padding: "1.25rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", background: isGenerating ? "hsl(0,0%,80%)" : "hsl(0,0%,0%)", color: "hsl(0,0%,96%)", border: "none", cursor: "none", transition: "background 0.2s", position: "relative", overflow: "hidden", marginTop: "0.5rem" }} onMouseEnter={(e) => !isGenerating && ((e.currentTarget.style.background = "hsl(323,100%,50%)"))} onMouseLeave={(e) => !isGenerating && ((e.currentTarget.style.background = "hsl(0,0%,0%)"))}>
          {isGenerating ? "SCANNING..." : "— GENERATE —"}
        </button>
      </div>

      <div style={{ padding: "5rem 4rem", display: "flex", flexDirection: "column" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)", marginBottom: "2rem" }}>OUTPUT / ULTRA-HD GROTESQUE</p>
        <div style={{ flex: 1, border: "1px solid hsl(0,0%,88%)", minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", ...(i < 2 ? { top: 0 } : { bottom: 0 }), ...([0, 2].includes(i) ? { left: 0 } : { right: 0 }), width: 12, height: 12, borderTop: i < 2 ? "1px solid hsl(323,100%,50%)" : "none", borderBottom: i >= 2 ? "1px solid hsl(323,100%,50%)" : "none", borderLeft: [0, 2].includes(i) ? "1px solid hsl(323,100%,50%)" : "none", borderRight: [1, 3].includes(i) ? "1px solid hsl(323,100%,50%)" : "none" }} />)}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "2rem" }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "hsl(323,100%,50%)", marginBottom: "0.5rem", letterSpacing: "0.2em" }}>CONNECTION ERROR</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(0,0%,50%)" }}>{error}</p>
              </motion.div>
            )}
            {result && !error && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                <img src={result.startsWith("http") || result.startsWith("data:") ? result : `data:image/png;base64,${result}`} alt="generated result" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </motion.div>
            )}
            {!result && !error && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center" }}>
                <div style={{ width: "80px", height: "80px", border: "1px solid hsl(0,0%,88%)", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 24, height: 24, border: "1px solid hsl(0,0%,78%)", borderTop: "1px solid hsl(323,100%,50%)", borderRadius: "50%" }} /></div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "hsl(0,0%,60%)", letterSpacing: "0.2em" }}>AWAITING INPUT</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
