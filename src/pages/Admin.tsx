import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Session } from "@supabase/supabase-js";

interface Imprint {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  shadow_image_url: string;
  result_image_url: string;
}

export default function Admin() {
  const { t } = useLanguage();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Upload state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shadowFile, setShadowFile] = useState<File | null>(null);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Imprints list
  const [imprints, setImprints] = useState<Imprint[]>([]);

  const shadowRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchImprints();
  }, [session]);

  const fetchImprints = async () => {
    const { data } = await supabase
      .from("imprints")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setImprints(data as Imprint[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const uploadImage = async (file: File, prefix: string) => {
    const ext = file.name.split(".").pop();
    const path = `${prefix}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("imprints").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("imprints").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shadowFile || !resultFile || !title) return;
    setUploading(true);
    setMessage("");
    try {
      const [shadowUrl, resultUrl] = await Promise.all([
        uploadImage(shadowFile, "shadows"),
        uploadImage(resultFile, "results"),
      ]);
      const { error } = await supabase.from("imprints").insert({
        title,
        description: description || null,
        shadow_image_url: shadowUrl,
        result_image_url: resultUrl,
      });
      if (error) throw error;
      setMessage(t("admin.success"));
      setTitle("");
      setDescription("");
      setShadowFile(null);
      setResultFile(null);
      fetchImprints();
    } catch (err: any) {
      setMessage(`${t("admin.error")}: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("imprints").delete().eq("id", id);
    fetchImprints();
  };

  if (loading) return null;

  const mono = "'JetBrains Mono', monospace";
  const pink = "hsl(323,100%,50%)";

  if (!session) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(0,0%,96%)" }}>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          style={{ width: "340px", display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <p style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: pink }}>{t("admin.login")}</p>
          <h1 style={{ fontFamily: mono, fontSize: "1.5rem", fontWeight: 800 }}>{t("admin.title")}</h1>

          <div>
            <label style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)" }}>{t("admin.email")}</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
              style={{ width: "100%", fontFamily: mono, fontSize: "0.7rem", padding: "0.75rem", border: "1px solid hsl(0,0%,88%)", background: "hsl(0,0%,100%)", outline: "none", marginTop: "0.25rem" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)" }}>{t("admin.password")}</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required
              style={{ width: "100%", fontFamily: mono, fontSize: "0.7rem", padding: "0.75rem", border: "1px solid hsl(0,0%,88%)", background: "hsl(0,0%,100%)", outline: "none", marginTop: "0.25rem" }}
            />
          </div>

          {authError && <p style={{ fontFamily: mono, fontSize: "0.55rem", color: pink }}>{authError}</p>}

          <button type="submit" style={{ fontFamily: mono, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", padding: "1rem", background: "hsl(0,0%,0%)", color: "hsl(0,0%,96%)", border: "none", cursor: "none" }}>
            {t("admin.signin")}
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "hsl(0,0%,96%)", padding: "4rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", borderBottom: "1px solid hsl(0,0%,88%)", paddingBottom: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: pink }}>{t("admin.login")}</p>
            <h1 style={{ fontFamily: mono, fontSize: "1.5rem", fontWeight: 800 }}>{t("admin.title")}</h1>
          </div>
          <button data-hover onClick={handleLogout} style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.15em", color: "hsl(0,0%,50%)", background: "none", border: "1px solid hsl(0,0%,88%)", padding: "0.5rem 1rem", cursor: "none" }}>
            {t("admin.logout")}
          </button>
        </div>

        {/* Upload form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "4rem" }}>
          <div>
            <label style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)" }}>{t("admin.upload_title")}</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required
              style={{ width: "100%", fontFamily: mono, fontSize: "0.7rem", padding: "0.75rem", border: "1px solid hsl(0,0%,88%)", background: "hsl(0,0%,100%)", outline: "none", marginTop: "0.25rem" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)" }}>{t("admin.upload_desc")}</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              style={{ width: "100%", fontFamily: mono, fontSize: "0.7rem", padding: "0.75rem", border: "1px solid hsl(0,0%,88%)", background: "hsl(0,0%,100%)", outline: "none", resize: "vertical", marginTop: "0.25rem" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)" }}>{t("admin.shadow")}</label>
              <div data-hover onClick={() => shadowRef.current?.click()}
                style={{ border: "1px dashed hsl(0,0%,78%)", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", marginTop: "0.25rem", overflow: "hidden" }}>
                {shadowFile ? (
                  <img src={URL.createObjectURL(shadowFile)} alt="shadow" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%)" }} />
                ) : (
                  <span style={{ fontFamily: mono, fontSize: "0.55rem", color: "hsl(0,0%,60%)" }}>+ UPLOAD</span>
                )}
              </div>
              <input ref={shadowRef} type="file" accept="image/*" onChange={(e) => setShadowFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </div>
            <div>
              <label style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.2em", color: "hsl(0,0%,50%)" }}>{t("admin.result")}</label>
              <div data-hover onClick={() => resultRef.current?.click()}
                style={{ border: "1px dashed hsl(0,0%,78%)", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", marginTop: "0.25rem", overflow: "hidden" }}>
                {resultFile ? (
                  <img src={URL.createObjectURL(resultFile)} alt="result" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%)" }} />
                ) : (
                  <span style={{ fontFamily: mono, fontSize: "0.55rem", color: "hsl(0,0%,60%)" }}>+ UPLOAD</span>
                )}
              </div>
              <input ref={resultRef} type="file" accept="image/*" onChange={(e) => setResultFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </div>
          </div>

          {message && <p style={{ fontFamily: mono, fontSize: "0.55rem", color: pink, letterSpacing: "0.15em" }}>{message}</p>}

          <button type="submit" disabled={uploading || !shadowFile || !resultFile || !title}
            style={{ fontFamily: mono, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", padding: "1rem", background: uploading ? "hsl(0,0%,80%)" : "hsl(0,0%,0%)", color: "hsl(0,0%,96%)", border: "none", cursor: "none", transition: "background 0.2s" }}>
            {uploading ? t("admin.uploading") : t("admin.submit")}
          </button>
        </form>

        {/* Imprints list */}
        <div>
          <p style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: pink, marginBottom: "1.5rem" }}>{t("admin.manage")}</p>
          {imprints.length === 0 && (
            <p style={{ fontFamily: mono, fontSize: "0.6rem", color: "hsl(0,0%,50%)" }}>{t("admin.no_imprints")}</p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {imprints.map((imp) => (
              <div key={imp.id} style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid hsl(0,0%,88%)", paddingTop: "1rem" }}>
                <img src={imp.shadow_image_url} alt="" style={{ width: 60, height: 60, objectFit: "cover", filter: "grayscale(80%)" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: mono, fontSize: "0.65rem", fontWeight: 700 }}>{imp.title}</p>
                  <p style={{ fontFamily: mono, fontSize: "0.5rem", color: "hsl(0,0%,50%)" }}>{new Date(imp.created_at).toLocaleDateString()}</p>
                </div>
                <button data-hover onClick={() => handleDelete(imp.id)}
                  style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.15em", color: pink, background: "none", border: "1px solid " + pink, padding: "0.3rem 0.6rem", cursor: "none" }}>
                  {t("admin.delete")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
