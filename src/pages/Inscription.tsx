import { Link } from "react-router-dom";
import { useInscription } from "../hooks/useInscription";

export default function Inscription() {
  const {
    formData,
    loading,
    erreur,
    handleSubmit,
    handleInputChange
  } = useInscription();

  return (
    <main className="home-gaming-container">
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div className="card-gaming shadow">
          <header className="home-gaming-hero" style={{ marginBottom: "2rem" }}>
            <h1 className="home-gaming-title" style={{ fontSize: "2rem" }}>Inscription</h1>
            <p className="home-gaming-subtitle" style={{ fontSize: "0.95rem" }}>
              Créez un compte pour commencer à organiser vos listes de cadeaux
            </p>
          </header>

          {erreur && (
            <div className="alert-gaming alert-gaming-danger" role="alert" style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "1.1rem" }}>⚠️</span>
              <span>{erreur}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-gaming-group">
              <label className="form-gaming-label">Pseudo</label>
              <input
                type="text"
                className="form-gaming-input"
                required
                value={formData.pseudo}
                onChange={(e) => handleInputChange("pseudo", e.target.value)}
                placeholder="Votre nom de héros ou de lutin"
              />
            </div>

            <div className="form-gaming-group">
              <label className="form-gaming-label">Email</label>
              <input
                type="email"
                className="form-gaming-input"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="exemple@email.com"
              />
            </div>

            <div className="form-gaming-group">
              <label className="form-gaming-label">Mot de passe</label>
              <input
                type="password"
                className="form-gaming-input"
                required
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="form-gaming-group">
              <label className="form-gaming-label">Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-gaming-input"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="form-gaming-group" style={{ margin: "1.5rem 0" }}>
              <label className="form-gaming-checkbox" htmlFor="acceptCGU">
                <input
                  type="checkbox"
                  id="acceptCGU"
                  required
                  checked={formData.acceptCGU}
                  onChange={(e) => handleInputChange("acceptCGU", e.target.checked)}
                />
                <span>
                  J'accepte les{" "}
                  <Link to="/cgu" target="_blank" rel="noopener noreferrer" className="link-gaming">
                    CGU
                  </Link>
                </span>
              </label>
            </div>

            <div className="text-center" style={{ marginTop: "2rem" }}>
              <button
                type="submit"
                className="btn-gaming btn-gaming-primary w-100"
                disabled={loading}
              >
                {loading ? "Création du compte..." : "S'inscrire"}
              </button>
            </div>
          </form>

          <div className="gaming-divider" style={{ margin: "1.5rem 0" }}></div>

          <div className="text-center">
            <p className="home-gaming-text-small" style={{ marginBottom: 0 }}>
              Déjà inscrit ?{" "}
              <Link to="/connexion" className="link-gaming">
                Connectez-vous ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

