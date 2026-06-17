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
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Modifier mon mot de passe</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleModifierMotDePasse}>
                <div className="mb-3">
                  <label htmlFor="ancien" className="form-label">Ancien mot de passe</label>
                  <input
                    type="password"
                    id="ancien"
                    className="form-control"
                    value={ancienMotDePasse}
                    onChange={(e) => setAncienMotDePasse(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="nouveau" className="form-label">Nouveau mot de passe</label>
                  <input
                    type="password"
                    id="nouveau"
                    className="form-control"
                    value={nouveauMotDePasse}
                    onChange={(e) => setNouveauMotDePasse(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmation" className="form-label">Confirmation du nouveau mot de passe</label>
                  <input
                    type="password"
                    id="confirmation"
                    className="form-control"
                    value={confirmationMotDePasse}
                    onChange={(e) => setConfirmationMotDePasse(e.target.value)}
                    required
                  />
                </div>

                {erreur && <div className="alert alert-danger">{erreur}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <div className="text-center">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Modification..." : "Modifier le mot de passe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
