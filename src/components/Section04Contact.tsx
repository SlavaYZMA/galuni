import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const EMAIL = "slavasolen@gmail.com";
const INSTAGRAM = "@iconicyzma";
const INSTAGRAM_URL = "https://www.instagram.com/iconicyzma/";
const WEBSITE_URL = "https://slavasolen.netlify.app/";

export default function Section04Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.85rem",
    letterSpacing: "0.08em",
    color: "hsl(0,0%,0%)",
    textDecoration: "none",
    borderBottom: "1px solid hsl(0,0%,80%)",
    paddingBottom: "2px",
    transition: "all 0.2s",
    cursor: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.2em",
    color: "hsl(0,0%,50%)",
    marginBottom: "0.4rem",
  };

  const copyBtnStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.5rem",
    letterSpacing: "0.15em",
    color: "hsl(323,100%,50%)",
    background: "none",
    border: "1px solid hsl(323,100%,50%)",
    padding: "0.2rem 0.5rem",
    marginLeft: "0.75rem",
    cursor: "none",
    transition: "all 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "6rem 4rem",
        borderTop: "1px solid hsl(0,0%,88%)",
      }}
    >
      {/* Section label */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.25em",
        color: "hsl(0,0%,50%)",
        marginBottom: "2rem",
      }}>
        {t("s04.label")}
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 300,
        lineHeight: 1,
        marginBottom: "3rem",
        letterSpacing: "-0.02em",
      }}>
        {t("s04.title_1")}
        <span style={{ color: "hsl(323,100%,50%)" }}>{t("s04.title_2")}</span>
      </h2>

      {/* Contact items */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "600px",
      }}>
        {/* Email */}
        <div>
          <div style={labelStyle}>{t("s04.email")}</div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <a
              data-hover
              href={`mailto:${EMAIL}`}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(323,100%,50%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(0,0%,0%)")}
            >
              {EMAIL}
            </a>
            <button
              data-hover
              onClick={() => copyToClipboard(EMAIL, "email")}
              style={copyBtnStyle}
            >
              {copied === "email" ? t("s04.copied") : "COPY"}
            </button>
          </div>
        </div>

        {/* Instagram */}
        <div>
          <div style={labelStyle}>{t("s04.instagram")}</div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <a
              data-hover
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(323,100%,50%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(0,0%,0%)")}
            >
              {INSTAGRAM}
            </a>
            <button
              data-hover
              onClick={() => copyToClipboard(INSTAGRAM_URL, "instagram")}
              style={copyBtnStyle}
            >
              {copied === "instagram" ? t("s04.copied") : "COPY"}
            </button>
          </div>
        </div>

        {/* Website */}
        <div>
          <div style={labelStyle}>{t("s04.website")}</div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <a
              data-hover
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(323,100%,50%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(0,0%,0%)")}
            >
              {WEBSITE_URL.replace("https://", "")}
            </a>
            <button
              data-hover
              onClick={() => copyToClipboard(WEBSITE_URL, "website")}
              style={copyBtnStyle}
            >
              {copied === "website" ? t("s04.copied") : "COPY"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
