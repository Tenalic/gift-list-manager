import { useState } from "react";
import { Link } from "react-router-dom";
import { useListes } from "../hooks/useListes";
import { useAuth } from "../context/AuthContext";
import { listeService } from "../services/listeService";

export default function GiftList() {
  const { isConnected } = useAuth();
  const { listes, favoris, loading, erreur, refresh } = useListes();

  // État pour la modale de création
  const [showModal, setShowModal] = useState(false);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPublique, setNouveauPublique] = useState(false);
  const [creationLoading, setCreationLoading] = useState(false);

  const handleCreerListe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauNom.trim()) return;

    setCreationLoading(true);
    try {
      await listeService.creerListe(nouveauNom, nouveauPublique);
      setNouveauNom("");
      setNouveauPublique(false);
      setShowModal(false);
      refresh(); // On rafraîchit la vue pour voir la nouvelle liste
    } catch {
      alert("Erreur lors de la création de la liste");
    } finally {
      setCreationLoading(false);
    }
  };

  const handleSupprimerListe = async (idListe: number, nomListe: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer la liste "${nomListe}" ?`)) return;

    try {
      await listeService.supprimerListe(idListe);
      refresh();
    } catch {
      alert("Erreur lors de la suppression de la liste");
    }
  };

  if (!isConnected) {
    return (
      <main className="home-gaming-container">
        <div className="card-gaming p-5 text-center" style={{ maxWidth: "700px" }}>
          <h1 className="home-gaming-title">Mes Listes de Cadeaux</h1>
          <p className="home-gaming-subtitle mb-4">
            Connectez-vous pour créer, gérer et partager vos listes de cadeaux avec vos proches.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
            <Link to="/connexion" className="btn-gaming btn-gaming-primary">
              Se connecter
            </Link>
            <Link to="/inscription" className="btn-gaming btn-gaming-outline">
              Créer un compte
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) return (
    <main className="home-gaming-container">
      <div className="loader-gaming-container">
        <div className="spinner-gaming"></div>
        <p className="home-gaming-text-small">Chargement de vos listes...</p>
      </div>
    </main>
  );

  if (erreur) return (
    <main className="home-gaming-container">
      <div style={{ width: "100%", maxWidth: "700px" }}>
        <div className="alert-gaming alert-gaming-danger" role="alert">
          <span>⚠️ {erreur}</span>
        </div>
      </div>
    </main>
  );

  return (
    <main className="container py-5" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
      <header className="gaming-flex-header" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
        <div>
          <h1 className="home-gaming-title" style={{ fontSize: "2.25rem", margin: 0 }}>Mes Listes de Cadeaux</h1>
          <p className="home-gaming-text-small" style={{ margin: 0 }}>Gérez vos grimoires de cadeaux de Noël et d'anniversaires</p>
        </div>
      </header>

      {/* Section Mes Listes */}
      <section className="mb-5" style={{ marginTop: "2rem" }}>
        <div className="gaming-flex-header">
          <h2 style={{ fontSize: "1.5rem", color: "var(--accent-gold)", margin: 0 }}>Mes Propres Listes</h2>
          <button className="btn-gaming btn-gaming-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }} onClick={() => setShowModal(true)}>
            + Créer une liste
          </button>
        </div>

        {listes.length === 0 ? (
          <div className="card-gaming p-4 text-center">
            <p className="home-gaming-text-small" style={{ margin: 0 }}>Vous n'avez pas encore créé de liste.</p>
          </div>
        ) : (
          <div className="gaming-grid">
            {listes.map((liste) => (
              <article key={liste.idListe} className="card-gaming" style={{ display: "flex", flexDirection: "column", justifyContent: "between", minHeight: "180px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--text-primary)" }}>{liste.nomListe}</h3>
                  <span className={`badge-gaming ${liste.publique ? 'badge-gaming-success' : 'badge-gaming-muted'}`}>
                    {liste.publique ? 'Publique' : 'Privée'}
                  </span>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    🎁 {liste.nombreObjet || 0} cadeau(x)
                  </span>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <div className="btn-group-gaming">
                    <Link to={`/liste/${liste.idListe}`} className="btn-gaming btn-gaming-secondary" style={{ padding: "0.4rem" }}>Gérer</Link>
                    <button
                      className="btn-gaming btn-gaming-danger"
                      style={{ padding: "0.4rem" }}
                      onClick={() => handleSupprimerListe(liste.idListe, liste.nomListe)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Section Favoris */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--info)", marginBottom: "1.5rem" }}>Mes Favoris</h2>
        {favoris.length === 0 ? (
          <div className="card-gaming p-4 text-center">
            <p className="home-gaming-text-small" style={{ margin: 0 }}>Vous n'avez pas encore de listes favorites.</p>
          </div>
        ) : (
          <div className="gaming-grid">
            {favoris.map((liste) => (
              <article key={liste.idListe} className="card-gaming" style={{ display: "flex", flexDirection: "column", minHeight: "180px" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--text-primary)" }}>{liste.nomListe}</h3>
                  <p className="home-gaming-text-small" style={{ margin: "0.25rem 0 0 0", color: "var(--text-muted)" }}>
                    Propriétaire : {liste.proprietaire}
                  </p>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    🎁 {liste.nombreObjet || 0} cadeau(x)
                  </span>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <Link to={`/liste/${liste.idListe}`} className="btn-gaming btn-gaming-outline w-100" style={{ padding: "0.4rem" }}>
                    Voir la liste
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modale de création de liste */}
      {showModal && (
        <>
          <div className="modal-gaming-backdrop" onClick={() => { setShowModal(false); setNouveauPublique(false); }} />
          <div className="modal-gaming-dialog-wrapper">
            <div className="modal-gaming-content" role="dialog">
              <div className="modal-gaming-header">
                <h5 className="modal-gaming-title">Créer une nouvelle liste</h5>
                <button type="button" className="modal-gaming-close" onClick={() => { setShowModal(false); setNouveauPublique(false); }}>&times;</button>
              </div>
              <form onSubmit={handleCreerListe}>
                <div className="modal-gaming-body">
                  <div className="form-gaming-group">
                    <label htmlFor="nomListe" className="form-gaming-label">Nom de la liste</label>
                    <input
                      type="text"
                      id="nomListe"
                      className="form-gaming-input"
                      placeholder="Ex: Liste de Noël, Anniversaire de Maman..."
                      value={nouveauNom}
                      onChange={(e) => setNouveauNom(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="form-gaming-group" style={{ marginTop: "1.5rem" }}>
                    <label htmlFor="nouveauPublique" className="form-gaming-checkbox">
                      <input
                        type="checkbox"
                        id="nouveauPublique"
                        checked={nouveauPublique}
                        onChange={(e) => setNouveauPublique(e.target.checked)}
                      />
                      <span>Rendre cette liste publique (visible par tout le monde)</span>
                    </label>
                  </div>
                </div>
                <div className="modal-gaming-footer">
                  <button type="button" className="btn-gaming btn-gaming-secondary" onClick={() => { setShowModal(false); setNouveauPublique(false); }}>Annuler</button>
                  <button type="submit" className="btn-gaming btn-gaming-primary" disabled={creationLoading}>
                    {creationLoading ? "Création..." : "Créer la liste"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

