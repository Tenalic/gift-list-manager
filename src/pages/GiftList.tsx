// pages/GiftList.tsx

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
  const [creationLoading, setCreationLoading] = useState(false);

  const handleCreerListe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauNom.trim()) return;

    setCreationLoading(true);
    try {
      await listeService.creerListe(nouveauNom);
      setNouveauNom("");
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
      <main className="container py-5 text-center">
        <div className="card p-5 shadow-sm border-0 bg-transparent">
          <h1 className="mb-4">Mes Listes de Cadeaux</h1>
          <p className="lead mb-4 opacity-75">
            Connectez-vous pour créer, gérer et partager vos listes de cadeaux avec vos proches.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/connexion" className="btn btn-primary btn-lg px-4 gap-3">
              Se connecter
            </Link>
            <Link to="/inscription" className="btn btn-outline-secondary btn-lg px-4">
              Créer un compte
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );

  if (erreur) return (
    <div className="container py-5">
      <div className="alert alert-danger">{erreur}</div>
    </div>
  );

  return (
    <main className="container py-5">
      <h1 className="mb-4">Mes Listes de Cadeaux</h1>

      {/* Section Mes Listes (Inversée, maintenant en premier) */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 text-success">Mes Propres Listes</h2>
          <button className="btn btn-success btn-sm" onClick={() => setShowModal(true)}>
            + Créer une liste
          </button>
        </div>
        
        {listes.length === 0 ? (
          <div className="card p-4 text-center">
            <p className="mb-0 opacity-75">Vous n'avez pas encore créé de liste.</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {listes.map((liste) => (
              <div key={liste.idListe} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{liste.nomListe}</h5>
                    <span className={`badge ${liste.urlPartage ? 'bg-info' : 'bg-secondary'}`}>
                      {liste.urlPartage ? 'Partagée' : 'Privée'}
                    </span>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="btn-group w-100">
                      <Link to={`/liste/${liste.idListe}`} className="btn btn-outline-secondary btn-sm">Gérer</Link>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleSupprimerListe(liste.idListe, liste.nomListe)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section Favoris (Inversée, maintenant en second) */}
      <section>
        <h2 className="h4 mb-3 text-primary">Mes Favoris</h2>
        {favoris.length === 0 ? (
          <p className="text-muted italic">Vous n'avez pas encore de listes favorites.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {favoris.map((liste) => (
              <div key={liste.idListe} className="col">
                <div className="card h-100 border-primary shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{liste.nomListe}</h5>
                    <p className="card-text text-muted small">Propriétaire : {liste.proprietaire}</p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <Link to={`/liste/${liste.idListe}`} className="btn btn-outline-primary btn-sm w-100">Voir la liste</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modale de création de liste */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Créer une nouvelle liste</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreerListe}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="nomListe" className="form-label">Nom de la liste</label>
                    <input
                      type="text"
                      id="nomListe"
                      className="form-control"
                      placeholder="Ex: Liste de Noël, Anniversaire..."
                      value={nouveauNom}
                      onChange={(e) => setNouveauNom(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="btn btn-success" disabled={creationLoading}>
                    {creationLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : null}
                    Créer la liste
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
