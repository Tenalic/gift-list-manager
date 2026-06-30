import { useModifierMotDePasse } from "../hooks/useModifierMotDePasse";

// Formulaire de modification du mot de passe, extrait pour être réutilisable.
// Réutilise le hook useModifierMotDePasse existant (logique + appel API inchangés).
export default function FormulaireMotDePasse() {
  const {
    ancienMotDePasse, setAncienMotDePasse,
    nouveauMotDePasse, setNouveauMotDePasse,
    confirmationMotDePasse, setConfirmationMotDePasse,
    erreur, message, loading,
    handleModifierMotDePasse,
  } = useModifierMotDePasse();

  return (
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
  );
}
