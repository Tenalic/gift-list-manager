// pages/Connexion.tsx
// Ce fichier ne contient QUE l'affichage.
// Analogie Java : c'est ton template Thymeleaf

import { Link } from "react-router-dom";
import { useConnexion } from "../hooks/useConnexion";

export default function Connexion() {
  // Une seule ligne pour récupérer tout ce dont on a besoin
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

                {erreur && <p className="alert alert-danger">{erreur}</p>}
                {message && <div className="alert alert-primary text-center">{message}</div>}

                <div className="text-center">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-center">
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

      {/* Modale mot de passe oublié */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} />
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Mot de passe oublié</h5>
                  <button type="button" className="btn-close" aria-label="Fermer" onClick={() => setShowModal(false)} />
                </div>
                <form onSubmit={handleMotDePasseOublie}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="emailForgot" className="form-label">Saisissez votre email</label>
                      <input
                        type="email"
                        id="emailForgot"
                        className="form-control"
                        value={emailOublie}
                        onChange={(e) => setEmailOublie(e.target.value)}
                        required
                      />
                    </div>
                    {erreurOublie && <p className="alert alert-danger">{erreurOublie}</p>}
                    {messageOublie && <p className="alert alert-success text-center">{messageOublie}</p>}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
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
