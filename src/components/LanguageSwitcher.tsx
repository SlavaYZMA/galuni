import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

const langs: Lang[] = ["en", "ru", "de"];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{
      display: "flex",
      gap: "0.25rem",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.55rem",
      letterSpacing: "0.1em",
    }}>
      {langs.map((l, i) => (
        <span key={l} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <button
            data-hover
            onClick={() => setLang(l)}
            style={{
              background: "none",
              border: "none",
              padding: "0.15rem 0.3rem",
              cursor: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: lang === l ? "hsl(323,100%,50%)" : "hsl(0,0%,50%)",
              borderBottom: lang === l ? "1px solid hsl(323,100%,50%)" : "1px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {l.toUpperCase()}
          </button>
          {i < langs.length - 1 && (
            <span style={{ color: "hsl(0,0%,80%)" }}>/</span>
          )}
        </span>
      ))}
    </div>
  );
}
