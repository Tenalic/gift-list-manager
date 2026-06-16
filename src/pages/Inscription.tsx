import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Inscription() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptCGU: false
  });
  
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErreur("");

    if (formData.password !== formData.confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!formData.acceptCGU) {
      setErreur("Vous devez accepter les CGU pour vous inscrire.");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.inscription(formData);
      if (result.erreur) {
        setErreur(result.erreur);
      } else {
        // En cas de succès, on peut soit rediriger vers connexion,
        // soit connecter l'utilisateur directement si ton API le permet.
        // Ici, on redirige vers l'accueil après avoir mis à jour l'état local.
        login();
        navigate("/");
      }
    } catch (err) {
      setErreur("Une erreur technique est survenue.");
    } finally {
      setLoading(false);
    }
  };

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
                    onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="acceptCGU"
                    required
                    checked={formData.acceptCGU}
                    onChange={(e) => setFormData({ ...formData, acceptCGU: e.target.checked })}
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
