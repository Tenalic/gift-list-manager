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
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Inscription</h2>
            </div>
            <div className="card-body p-4">
              {erreur && (
                <div className="alert alert-danger mb-4" role="alert">
                  {erreur}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Pseudo</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.pseudo}
                    onChange={(e) => handleInputChange("pseudo", e.target.value)}
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="exemple@email.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="acceptCGU"
                    required
                    checked={formData.acceptCGU}
                    onChange={(e) => handleInputChange("acceptCGU", e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="acceptCGU">
                    J'accepte les <Link to="/cgu" target="_blank" rel="noopener noreferrer">CGU</Link>
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : "S'inscrire"}
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-center">
              <Link to="/connexion" className="text-decoration-none">
                Déjà un compte ? Connectez-vous ici
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
