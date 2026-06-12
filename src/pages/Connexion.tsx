import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // --- États du formulaire de connexion ---
  // Remplacent les variables Thymeleaf ${erreur} et ${message}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --- État de la modale ---
  // Remplace data-bs-toggle="modal" : pas besoin de JS Bootstrap, React gère ça
  const [showModal, setShowModal] = useState(false);
  const [emailOublie, setEmailOublie] = useState("");
  const [messageOublie, setMessageOublie] = useState("");

  // --- Soumission du formulaire de connexion ---
  // Remplace <form action="/connexion" method="post">
  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de la page (équivalent du comportement SPA)
    setErreur("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        login();            // met isConnected = true dans le contexte global
        navigate("/");      // redirige vers l'accueil
      } else {
        // Le serveur a renvoyé une erreur (ex: mauvais mot de passe)
        const data = await response.json();
        setErreur(data.erreur || "Email ou mot de passe incorrect.");
      }
    } catch {
      setErreur("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // --- Soumission du formulaire mot de passe oublié ---
  const handleMotDePasseOublie = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageOublie("");

    try {
      const response = await fetch("/api/mot-de-passe-oublie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOublie }),
      });

      if (response.ok) {
        setMessageOublie("Un email de réinitialisation a été envoyé.");
        setEmailOublie("");
      } else {
        setMessageOublie("Aucun compte trouvé avec cet email.");
      }
    } catch {
      setMessageOublie("Impossible de contacter le serveur.");
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Connexion</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleConnexion}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* th:if="${erreur}" → affiché seulement si erreur non vide */}
                {erreur && (
                  <p className="alert alert-danger">{erreur}</p>
                )}

                {/* th:if="${message}" → affiché seulement si message non vide */}
                {message && (
                  <div className="alert alert-primary text-center" role="alert">
                    {message}
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? "Connexion..." : "Se connecter"}
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-center">
              {/* Remplace data-bs-toggle="modal" : on passe showModal à true */}
              <button
                className="btn btn-link text-decoration-none p-0"
                onClick={() => setShowModal(true)}
              >
                Mot de passe oublié ?
              </button>
              <br />
              <Link to="/inscription" className="text-decoration-none">
                Pas de compte ? Inscrivez-vous ici
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modale mot de passe oublié --- */}
      {/* Remplace la modale Bootstrap JS par du JSX conditionnel */}
      {showModal && (
        <>
          {/* Fond semi-transparent derrière la modale */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          />

          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Mot de passe oublié</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Fermer"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <form onSubmit={handleMotDePasseOublie}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="emailForgot" className="form-label">
                        Saisissez votre email
                      </label>
                      <input
                        type="email"
                        id="emailForgot"
                        className="form-control"
                        value={emailOublie}
                        onChange={(e) => setEmailOublie(e.target.value)}
                        required
                      />
                    </div>
                    {messageOublie && (
                      <p className="alert alert-info">{messageOublie}</p>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Envoyer
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
