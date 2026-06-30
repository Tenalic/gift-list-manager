import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAccount } from "../hooks/useAccount";
import FormulaireMotDePasse from "../components/FormulaireMotDePasse";
import Avatar from "../components/Avatar";

// Identifiants des onglets de la page compte (extensible).
type OngletId = "informations" | "securite";

const ONGLETS: { id: OngletId; label: string; icone: string }[] = [
  { id: "informations", label: "Informations", icone: "👤" },
  { id: "securite", label: "Sécurité", icone: "🔒" },
];

// Formate une date ISO (LocalDateTime) en date/heure locale lisible. Tolère null/invalide.
function formaterDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function MonCompte() {
  const { isConnected, pseudo, loading: authLoading } = useAuth();
  const [ongletActif, setOngletActif] = useState<OngletId>("informations");

  // Tant que la session se vérifie, on évite tout flash de contenu.
  if (authLoading) {
    return (
      <main className="home-gaming-container">
        <p className="home-gaming-subtitle">Chargement de votre compte…</p>
      </main>
    );
  }

  // Si non connecté : invitation à se connecter (pattern cohérent avec le reste de l'app).
  if (!isConnected) {
    return (
      <main className="home-gaming-container">
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <div className="card-gaming shadow text-center">
            <h1 className="home-gaming-title" style={{ fontSize: "2rem" }}>Mon compte</h1>
            <p className="home-gaming-subtitle" style={{ fontSize: "0.95rem" }}>
              Vous devez être connecté pour accéder à votre compte.
            </p>
            <div className="home-gaming-actions-group" style={{ marginTop: "1.5rem" }}>
              <Link to="/connexion" className="btn-gaming btn-gaming-primary w-100">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="compte-gaming-container">
      <header className="home-gaming-hero" style={{ marginBottom: "2rem" }}>
        <h1 className="home-gaming-title" style={{ fontSize: "2.2rem" }}>Mon compte</h1>
        <p className="home-gaming-subtitle" style={{ fontSize: "0.95rem" }}>
          Gérez vos informations et la sécurité de votre compte
        </p>
      </header>

      <div className="compte-gaming-layout">
        {/* Colonne gauche : sidebar de navigation par onglets */}
        <aside className="compte-gaming-sidebar">
          <div className="compte-gaming-identity">
            <Avatar pseudo={pseudo} size={56} />
            <span className="compte-gaming-pseudo">{pseudo || "—"}</span>
          </div>

          <nav
            className="compte-gaming-tabs"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Sections du compte"
          >
            {ONGLETS.map((onglet) => (
              <button
                key={onglet.id}
                type="button"
                role="tab"
                id={`tab-${onglet.id}`}
                aria-selected={ongletActif === onglet.id}
                aria-controls={`panel-${onglet.id}`}
                tabIndex={ongletActif === onglet.id ? 0 : -1}
                className={`compte-gaming-tab ${ongletActif === onglet.id ? "is-active" : ""}`}
                onClick={() => setOngletActif(onglet.id)}
              >
                <span aria-hidden="true" className="compte-gaming-tab-icon">{onglet.icone}</span>
                {onglet.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Colonne droite : contenu de l'onglet sélectionné */}
        <section className="compte-gaming-content">
          {ongletActif === "informations" && (
            <div role="tabpanel" id="panel-informations" aria-labelledby="tab-informations">
              <OngletInformations />
            </div>
          )}

          {ongletActif === "securite" && (
            <div role="tabpanel" id="panel-securite" aria-labelledby="tab-securite">
              <div className="card-gaming shadow">
                <h2 className="form-gaming-label" style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  Sécurité
                </h2>
                <p className="home-gaming-text-small" style={{ marginBottom: "1.5rem" }}>
                  Modifiez votre mot de passe pour sécuriser votre compte.
                </p>
                <FormulaireMotDePasse />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// Onglet "Informations" : récap des infos du compte via le nouveau service.
function OngletInformations() {
  const { account, erreur, loading } = useAccount();

  return (
    <div className="card-gaming shadow">
      <h2 className="form-gaming-label" style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>
        Informations du compte
      </h2>

      {loading && <p className="home-gaming-text-small">Chargement des informations…</p>}

      {!loading && erreur && (
        <div className="alert-gaming alert-gaming-danger" role="alert">
          <span>⚠️ {erreur}</span>
        </div>
      )}

      {!loading && !erreur && account && (
        <dl className="compte-info-list">
          <div className="compte-info-row">
            <dt className="compte-info-label">Pseudo</dt>
            <dd className="compte-info-value">{account.pseudo || "—"}</dd>
          </div>
          <div className="compte-info-row">
            <dt className="compte-info-label">E-mail</dt>
            <dd className="compte-info-value">{account.email || "—"}</dd>
          </div>
          <div className="compte-info-row">
            <dt className="compte-info-label">Dernière connexion</dt>
            <dd className="compte-info-value">{formaterDate(account.lastLoginDate)}</dd>
          </div>
          <div className="compte-info-row">
            <dt className="compte-info-label">Dernier changement de mot de passe</dt>
            <dd className="compte-info-value">{formaterDate(account.lastPasswordChangeDate)}</dd>
          </div>
        </dl>
      )}

      <div className="home-gaming-actions-group" style={{ marginTop: "1.5rem" }}>
        <Link to="/mes-listes" className="btn-gaming btn-gaming-outline w-100">
          Accéder à mes listes
        </Link>
        <Link to="/deconnexion" className="btn-gaming btn-gaming-danger w-100">
          Déconnexion
        </Link>
      </div>
    </div>
  );
}
