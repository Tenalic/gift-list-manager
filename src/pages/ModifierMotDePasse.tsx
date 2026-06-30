import { useModifierMotDePasse } from "../hooks/useModifierMotDePasse";

export default function ModifierMotDePasse() {
  const {
    ancienMotDePasse, setAncienMotDePasse,
    nouveauMotDePasse, setNouveauMotDePasse,
    confirmationMotDePasse, setConfirmationMotDePasse,
    erreur, message, loading,
    handleModifierMotDePasse,
  } = useModifierMotDePasse();

  return (
    <main className="home-gaming-container">
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div className="card-gaming shadow">
          <header className="home-gaming-hero" style={{ marginBottom: "2rem" }}>
            <h1 className="home-gaming-title" style={{ fontSize: "2rem" }}>Sécurité</h1>
            <p className="home-gaming-subtitle" style={{ fontSize: "0.95rem" }}>
              Modifiez votre mot de passe pour sécuriser votre compte
            </p>
          </header>

          <form onSubmit={handleModifierMotDePasse}>
            <div className="form-gaming-group">
              <label htmlFor="ancien" className="form-gaming-label">Ancien mot de passe</label>
              <input
                type="password"
                id="ancien"
                className="form-gaming-input"
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-gaming-group">
              <label htmlFor="nouveau" className="form-gaming-label">Nouveau mot de passe</label>
              <input
                type="password"
                id="nouveau"
                className="form-gaming-input"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-gaming-group">
              <label htmlFor="confirmation" className="form-gaming-label">Confirmation du nouveau mot de passe</label>
              <input
                type="password"
                id="confirmation"
                className="form-gaming-input"
                value={confirmationMotDePasse}
                onChange={(e) => setConfirmationMotDePasse(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {erreur && (
              <div className="alert-gaming alert-gaming-danger" role="alert">
                <span>⚠️ {erreur}</span>
              </div>
            )}
            
            {message && (
              <div className="alert-gaming alert-gaming-success" role="alert">
                <span>✅ {message}</span>
              </div>
            )}

            <div className="text-center" style={{ marginTop: "2rem" }}>
              <button type="submit" className="btn-gaming btn-gaming-primary w-100" disabled={loading}>
                {loading ? "Modification..." : "Modifier le mot de passe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

