import '../styles/navbar.css';
import logo from "../assets/logo.png";

export default function Navbar({ lang, setLang, institutionName }) {
  return (
    <nav>
      <div className="nav-logo">
        <div className="logo-img">
          <img
            src={logo}
            alt="logo"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML =
                '<span class="logo-img-fallback">🏛️</span>';
            }}
          />
        </div>
        <div className="logo-name">{institutionName}</div>
      </div>

      <button
        className="lang-toggle"
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
      >
        {lang === "en" ? "🌐 العربية" : "🌐 English"}
      </button>
    </nav>
  );
}