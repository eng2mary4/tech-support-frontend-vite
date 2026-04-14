'use client'
import { useState } from "react";

import content        from "./constants/content";
import Navbar         from "./components/Navbar";
import SupportForm    from "./components/SupportForm";

import "./styles/form.css";

export default function TechnicalSupportForm() {
  const [lang, setLang] = useState("ar");

  const t    = content[lang];
  const isAr = lang === "ar";

  return (
    <div
      className="page"
      style={{
        fontFamily: isAr ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
        direction:  isAr ? "rtl" : "ltr",
      }}
    >
      <Navbar
        lang={lang}
        setLang={setLang}
        institutionName={t.institutionName}
      />

      <SupportForm
        t={t}
        isAr={isAr}
      />
    </div>
  );
}