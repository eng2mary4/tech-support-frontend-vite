import { useState } from "react";
import "../styles/global.css";

export default function SupportForm({ t, isAr }) {
  const [form, setForm]     = useState({ senderEmail: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // ── Validation ──
  const validate = () => {
    const e = {};
    if (!form.senderEmail) e.senderEmail = t.errRequired;
    else if (!/\S+@\S+\.\S+/.test(form.senderEmail)) e.senderEmail = t.errEmail;
    if (!form.subject) e.subject = t.errRequired;
    if (!form.message) e.message = t.errRequired;
    else if (form.message.length < 10) e.message = t.errShort;
    return e;
  };

  // ── Handle Input Change ──
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  // ── Handle Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }

    setStatus("loading");
    try {
      const res  = await fetch("https://tech-support-api-jsf9.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ senderEmail: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main>
      <div className="card">
        <h1 className="card-title">{t.title}</h1>
        <p className="card-subtitle">{t.subtitle}</p>
        <div className="divider" />

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="field">
            <label>{t.emailLabel}</label>
            <input
              type="email"
              name="senderEmail"
              value={form.senderEmail}
              onChange={handleChange}
              placeholder={t.emailPlaceholder}
              className={errors.senderEmail ? "err" : ""}
              style={{ direction: isAr ? "rtl" : "ltr", fontFamily: "inherit" }}
            />
            {errors.senderEmail && <div className="err-msg">⚠ {errors.senderEmail}</div>}
          </div>

          {/* Subject */}
          <div className="field">
            <label>{t.subjectLabel}</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={t.subjectPlaceholder}
              className={errors.subject ? "err" : ""}
              style={{ direction: isAr ? "rtl" : "ltr", fontFamily: "inherit" }}
            />
            {errors.subject && <div className="err-msg">⚠ {errors.subject}</div>}
          </div>

          {/* Message */}
          <div className="field">
            <label>{t.messageLabel}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              className={errors.message ? "err" : ""}
              style={{ direction: isAr ? "rtl" : "ltr", fontFamily: "inherit" }}
            />
            {errors.message && <div className="err-msg">⚠ {errors.message}</div>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn"
            disabled={status === "loading"}
            style={{ fontFamily: "inherit" }}
          >
            {status === "loading"
              ? <><span className="spinner" />{t.sending}</>
              : t.submit}
          </button>

          {/* Success Alert */}
          {status === "success" && (
            <div className="alert alert-success">
              <strong>{t.success}</strong>
              {t.successSub}
            </div>
          )}

          {/* Error Alert */}
          {status === "error" && (
            <div className="alert alert-error">
              {t.error}
            </div>
          )}

        </form>
      </div>
    </main>
  );
}