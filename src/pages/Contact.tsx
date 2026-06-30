import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <main className="home-gaming-container">
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <header className="home-gaming-hero" style={{ marginBottom: "2rem" }}>
          <h1 className="home-gaming-title">Contact</h1>
          <p className="home-gaming-subtitle">
            Vous avez une question, vous rencontrez un problème, ou vous avez des suggestions ?
            N'hésitez pas à nous contacter.
          </p>
        </header>

        <div className="card-gaming shadow text-center" style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--accent-gold)", marginBottom: "1.5rem" }}>Stéphane COCQUEBERT</h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <img
              src="/images/linkedin.jpg"
              alt="LinkedIn"
              style={{ width: "20px", height: "20px", borderRadius: "2px" }}
            />
            <a
              className="link-gaming"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/st%C3%A9phane-cocquebert-192196163"
              style={{ fontWeight: "600" }}
            >
              LinkedIn
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <img
              src="/images/discord.jpg"
              alt="Discord"
              style={{ width: "20px", height: "20px" }}
            />
            <span style={{ color: "var(--text-secondary)" }}>
              Discord : <strong style={{ color: "var(--text-primary)" }}>tenalic</strong>
            </span>
          </div>
        </div>

        <div className="text-center">
          <button className="btn-gaming btn-gaming-secondary" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </div>
    </main>
  );
}

