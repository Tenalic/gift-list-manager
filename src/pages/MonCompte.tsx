import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormulaireMotDePasse from "../components/FormulaireMotDePasse";

// Page centrale de gestion du compte utilisateur :
// - récapitulatif des informations du compte (lecture)
// - gestion de la sécurité (modification du mot de passe, déplacée ici)
export default function MonCompte() {
  const { isConnected, pseudo, loading } = useAuth();

  // Tant que la session se vérifie, on évite tout flash de contenu
  if (loading) {
    return (
      <main className="home-gaming-container">
        <p className="home-gaming-subtitle">Chargement de votre compte…</p>
      </main>
    );
  }

  // Si non connecté : on invite à se connecter (pattern cohérent avec le reste de l'app)
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
    <main className="home-gaming-container">
      <div style={{ width: "100%", maxWidth: "640px" }}>
        <header className="home-gaming-hero" style={{ marginBottom: "2rem" }}>
          <h1 className="home-gaming-title" style={{ fontSize: "2.2rem" }}>Mon compte</h1>
          <p className="home-gaming-subtitle" style={{ fontSize: "0.95rem" }}>
            Consultez vos informations et gérez la sécurité de votre compte
          </p>
        </header>

        {/* Récapitulatif des informations du compte (lecture) */}
        <section className="card-gaming shadow" style={{ marginBottom: "2rem" }} aria-labelledby="recap-titre">
          <h2 id="recap-titre" className="form-gaming-label" style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>
            Informations du compte
          </h2>
          <dl className="compte-info-list">
            <div className="compte-info-row">
              <dt className="compte-info-label">Pseudo</dt>
              <dd className="compte-info-value">{pseudo || "—"}</dd>
            </div>
            <div className="compte-info-row">
              <dt className="compte-info-label">Statut</dt>
              <dd className="compte-info-value">Connecté</dd>
            </div>
          </dl>

          <div className="home-gaming-actions-group" style={{ marginTop: "1.5rem" }}>
            <Link to="/mes-listes" className="btn-gaming btn-gaming-outline w-100">
              Accéder à mes listes
            </Link>
            <Link to="/deconnexion" className="btn-gaming btn-gaming-danger w-100">
              Déconnexion
            </Link>
          </div>
        </section>

        {/* Sécurité : modification du mot de passe (logique réutilisée, sans duplication) */}
        <section className="card-gaming shadow" aria-labelledby="securite-titre">
          <h2 id="securite-titre" className="form-gaming-label" style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            Sécurité
          </h2>
          <p className="home-gaming-text-small" style={{ marginBottom: "1.5rem" }}>
            Modifiez votre mot de passe pour sécuriser votre compte.
          </p>
          <FormulaireMotDePasse />
        </section>
      </div>
    </main>
  );
}
