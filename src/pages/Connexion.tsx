import { Link } from "react-router-dom";
import { useConnexion } from "../hooks/useConnexion";

export default function Connexion() {
  const {
    email, setEmail,
    password, setPassword,
    erreur, message, loading,
    handleConnexion,
    showModal, setShowModal,
    emailOublie, setEmailOublie,
    messageOublie, erreurOublie,
    handleMotDePasseOublie,
  } = useConnexion();

  return (
    <main className="home-gaming-container">
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div className="card-gaming shadow">
          <header className="home-gaming-hero" style={{ marginBottom: "2rem" }}>
            <h1 className="home-gaming-title" style={{ fontSize: "2rem" }}>Connexion</h1>
            <p className="home-gaming-subtitle" style={{ fontSize: "0.95rem" }}>
              Entrez vos identifiants pour accéder à vos listes de cadeaux
            </p>
          </header>
          <h1>TEST</h1>

          <form onSubmit={handleConnexion}>
            <div className="form-gaming-group">
              <label htmlFor="email" className="form-gaming-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-gaming-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.nom@exemple.com"
                required
              />
            </div>

            <div className="form-gaming-group">
              <label htmlFor="password" className="form-gaming-label">Mot de passe</label>
              <input
                type="password"
                id="password"
                className="form-gaming-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {erreur && (
              <div className="alert-gaming alert-gaming-danger" role="alert">
                <span style={{ fontSize: "1.1rem" }}>⚠️</span>
                <span>{erreur}</span>
              </div>
            )}
            
            {message && (
              <div className="alert-gaming alert-gaming-info" role="alert">
                <span style={{ fontSize: "1.1rem" }}>ℹ️</span>
                <span>{message}</span>
              </div>
            )}

            <div className="text-center" style={{ marginTop: "2rem" }}>
              <button type="submit" className="btn-gaming btn-gaming-primary w-100" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="gaming-divider" style={{ margin: "1.5rem 0" }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
            <button
              className="btn-gaming btn-gaming-outline w-100"
              style={{ fontSize: "0.8rem", padding: "0.5rem" }}
              onClick={() => setShowModal(true)}
            >
              Mot de passe oublié ?
            </button>
            
            <p className="home-gaming-text-small" style={{ marginBottom: 0 }}>
              Pas encore de compte ?{" "}
              <Link to="/inscription" className="link-gaming">
                Créer un compte ici
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modale mot de passe oublié */}
      {showModal && (
        <>
          <div className="modal-gaming-backdrop" onClick={() => setShowModal(false)} />
          <div className="modal-gaming-dialog-wrapper">
            <div className="modal-gaming-content" role="dialog">
              <div className="modal-gaming-header">
                <h5 className="modal-gaming-title">Mot de passe oublié</h5>
                <button type="button" className="modal-gaming-close" aria-label="Fermer" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleMotDePasseOublie}>
                <div className="modal-gaming-body">
                  <p className="home-gaming-text" style={{ fontSize: "0.95rem", textAlign: "left", marginBottom: "1.5rem" }}>
                    Saisissez l'adresse email liée à votre compte. Un lien de réinitialisation vous sera envoyé.
                  </p>
                  
                  <div className="form-gaming-group">
                    <label htmlFor="emailForgot" className="form-gaming-label">Saisissez votre email</label>
                    <input
                      type="email"
                      id="emailForgot"
                      className="form-gaming-input"
                      value={emailOublie}
                      onChange={(e) => setEmailOublie(e.target.value)}
                      placeholder="votre.nom@exemple.com"
                      required
                    />
                  </div>
                  
                  {erreurOublie && (
                    <div className="alert-gaming alert-gaming-danger" role="alert" style={{ marginTop: "1rem", marginBottom: 0 }}>
                      <span>⚠️ {erreurOublie}</span>
                    </div>
                  )}
                  {messageOublie && (
                    <div className="alert-gaming alert-gaming-success" role="alert" style={{ marginTop: "1rem", marginBottom: 0 }}>
                      <span>✅ {messageOublie}</span>
                    </div>
                  )}
                </div>
                
                <div className="modal-gaming-footer">
                  <button type="button" className="btn-gaming btn-gaming-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="btn-gaming btn-gaming-primary">Envoyer</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

