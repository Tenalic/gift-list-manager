import { useListeDetail } from "../hooks/useListeDetail";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ListeDetail() {
  const { isConnected, pseudo } = useAuth();
  const {
    liste,
    loading,
    erreur,
    ordreTri,
    showModal,
    editingObjet,
    formData,
    navigate,
    handleToggleFavoris,
    handleTogglePublique,
    handleToggleOffrir,
    handleDeleteObjet,
    toggleTri,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange,
    copyLinkToClipboard,
    isEditingNom,
    nouveauNom,
    setNouveauNom,
    setIsEditingNom,
    startEditingNom,
    handleModifierNom,
  } = useListeDetail();

  if (loading) return (
    <main className="home-gaming-container">
      <div className="loader-gaming-container">
        <div className="spinner-gaming"></div>
        <p className="home-gaming-text-small">Chargement des détails de la liste...</p>
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

  if (!liste) return null;

  return (
    <main className="container py-5" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
      {/* Alerte mode invité */}
      {!isConnected && (
        <div className="alert-gaming alert-gaming-info" role="alert" style={{ marginBottom: "2rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🛡️</span>
          <div>
            <strong>Mode Invité :</strong> Vous consultez cette liste en tant qu'invité.
            <Link to={`/connexion?redirect=/liste/${liste?.listeCadeaux?.shareToken}`} className="link-gaming" style={{ margin: "0 0.25rem", fontWeight: "bold" }}>Connectez-vous</Link>
            pour pouvoir offrir des cadeaux et participer !
          </div>
        </div>
      )}

      {/* En-tête de la liste */}
      <header className="gaming-flex-header" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <button 
            className="btn-gaming btn-gaming-outline" 
            style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem", marginBottom: "1rem" }} 
            onClick={() => navigate("/mes-listes")}
          >
            &larr; Retour à mes listes
          </button>

          {isEditingNom ? (
            <form onSubmit={(e) => { e.preventDefault(); handleModifierNom(nouveauNom); }} style={{ display: "flex", gap: "0.5rem", alignItems: "center", maxWidth: "450px" }}>
              <input
                type="text"
                className="form-gaming-input"
                style={{ fontSize: "1.25rem", padding: "0.5rem 0.75rem" }}
                value={nouveauNom}
                onChange={(e) => setNouveauNom(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className="btn-gaming btn-gaming-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>Enregistrer</button>
              <button type="button" className="btn-gaming btn-gaming-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }} onClick={() => setIsEditingNom(false)}>Annuler</button>
            </form>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 className="home-gaming-title" style={{ fontSize: "2rem", margin: 0 }}>{liste?.listeCadeaux?.nomListe}</h1>
              {liste.estProprietaire && (
                <button
                  className="btn-gaming btn-gaming-secondary"
                  style={{ padding: "0.3rem 0.5rem", border: "none", fontSize: "0.85rem" }}
                  onClick={startEditingNom}
                  title="Modifier le nom de la liste"
                >
                  ✏️
                </button>
              )}
            </div>
          )}
          <p className="home-gaming-text-small" style={{ margin: "0.25rem 0 0 0" }}>
            Propriétaire : <strong>{liste?.listeCadeaux?.proprietaire}</strong>
          </p>
        </div>

        {/* Actions principales de la liste */}
        <div style={{ display: "flex", gap: "0.75rem", alignSelf: "end" }}>
          {liste.estProprietaire && (
            <>
              <button
                className={`btn-gaming ${liste?.listeCadeaux?.publique ? 'btn-gaming-primary' : 'btn-gaming-secondary'}`}
                style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                onClick={handleTogglePublique}
                title={liste?.listeCadeaux?.publique ? "Cliquez pour rendre privée" : "Cliquez pour rendre publique"}
              >
                {liste?.listeCadeaux?.publique ? "🌍 Publique" : "🔒 Privée"}
              </button>
              <button className="btn-gaming btn-gaming-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }} onClick={copyLinkToClipboard}>
                🔗 Partager
              </button>
            </>
          )}
          {!liste.estProprietaire && isConnected && (
            <button
              className={`btn-gaming ${liste.estEnFavoris ? 'btn-gaming-primary' : 'btn-gaming-outline'}`}
              style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
              onClick={handleToggleFavoris}
            >
              {liste.estEnFavoris ? "⭐ Favoris" : "☆ Favoris"}
            </button>
          )}
        </div>
      </header>

      {/* Titre Cadeaux & Filtres */}
      <div className="gaming-flex-header" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)", margin: 0 }}>Grimoire des Cadeaux</h2>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn-gaming btn-gaming-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }} onClick={toggleTri}>
            Trier par priorité {ordreTri === "asc" ? "▲" : "▼"}
          </button>
          {liste.estProprietaire && (
            <button className="btn-gaming btn-gaming-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }} onClick={() => openModal()}>
              + Ajouter un objet
            </button>
          )}
        </div>
      </div>

      {/* Grille de Cadeaux */}
      {liste.listeCadeaux?.listeObjet?.length === 0 ? (
        <div className="card-gaming p-5 text-center">
          <p className="home-gaming-text-small" style={{ margin: 0 }}>Aucun cadeau n'a encore été ajouté à cette liste.</p>
        </div>
      ) : (
        <div className="gaming-grid">
          {liste.listeCadeaux?.listeObjet?.map((objet) => (
            <article key={objet.idObjet} className="card-gaming" style={{ display: "flex", flexDirection: "column", minHeight: "220px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", margin: 0, color: "var(--text-primary)" }}>{objet.titre}</h3>
                
                {/* Priorité sous forme de coeurs */}
                <span title={`Priorité: ${objet.priorite}`}>
                  {Array.from({ length: 6 - (parseInt(objet.priorite, 10) || 5) }).map((_, i) => (
                    <span key={i} style={{ color: "var(--danger)" }}>❤️</span>
                  ))}
                </span>
              </div>

              <p className="home-gaming-text-small" style={{ color: "var(--text-secondary)", marginBottom: "1rem", flexGrow: 1 }}>
                {objet.description || "Aucune description fournie."}
              </p>

              {objet.url && (
                <div style={{ marginBottom: "1rem" }}>
                  <a href={objet.url} target="_blank" rel="noopener noreferrer" className="link-gaming" style={{ fontSize: "0.85rem" }}>
                    Visiter le site marchand &rarr;
                  </a>
                </div>
              )}

              {/* État d'attribution du cadeau */}
              <div style={{ marginBottom: "1.5rem" }}>
                {!liste.estProprietaire && isConnected && (
                  objet.estPrit ? (
                    <span className="badge-gaming badge-gaming-success">
                      Offert par {objet.pseudoDetenteur || objet.detenteur || "quelqu'un"}
                    </span>
                  ) : (
                    <span className="badge-gaming badge-gaming-muted">Libre</span>
                  )
                )}
                {!isConnected && (
                  <span className="badge-gaming badge-gaming-muted" style={{ opacity: 0.7 }}>Statut invisible (invité)</span>
                )}
              </div>

              {/* Pied de la carte / Boutons d'action */}
              <div style={{ marginTop: "auto" }}>
                {liste.estProprietaire ? (
                  <div className="btn-group-gaming">
                    <button className="btn-gaming btn-gaming-secondary" style={{ padding: "0.4rem" }} onClick={() => openModal(objet)}>Modifier</button>
                    <button className="btn-gaming btn-gaming-danger" style={{ padding: "0.4rem" }} onClick={() => objet.idObjet && handleDeleteObjet(objet.idObjet)}>Supprimer</button>
                  </div>
                ) : (
                  <button
                    className={`btn-gaming w-100 ${!isConnected ? 'btn-gaming-outline' : (objet.estPrit ? (objet.pseudoDetenteur === pseudo || objet.detenteur === pseudo ? 'btn-gaming-danger' : 'btn-gaming-secondary disabled') : 'btn-gaming-primary')}`}
                    style={{ padding: "0.5rem" }}
                    onClick={() => {
                      if (!isConnected) {
                        navigate(`/connexion?redirect=/liste/${liste.listeCadeaux?.shareToken}`);
                      } else if (objet.idObjet) {
                        handleToggleOffrir(objet.idObjet);
                      }
                    }}
                    disabled={isConnected && objet.estPrit && (objet.pseudoDetenteur !== pseudo && objet.detenteur !== pseudo)}
                  >
                    {!isConnected
                      ? "Se connecter pour offrir"
                      : (objet.pseudoDetenteur === pseudo || objet.detenteur === pseudo)
                        ? "Ne plus offrir"
                        : (objet.estPrit ? "Déjà offert" : "Offrir ce cadeau")}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal Ajout/Modification Cadeau */}
      {showModal && (
        <>
          <div className="modal-gaming-backdrop" onClick={closeModal} />
          <div className="modal-gaming-dialog-wrapper">
            <div className="modal-gaming-content" role="dialog">
              <form onSubmit={handleSubmit}>
                <div className="modal-gaming-header">
                  <h5 className="modal-gaming-title">{editingObjet ? "Modifier l'objet" : "Ajouter un objet au grimoire"}</h5>
                  <button type="button" className="modal-gaming-close" onClick={closeModal}>&times;</button>
                </div>
                
                <div className="modal-gaming-body">
                  <div className="form-gaming-group">
                    <label className="form-gaming-label">Titre du cadeau</label>
                    <input
                      type="text"
                      className="form-gaming-input"
                      required
                      placeholder="Ex: Grimoire de sorts, Console..."
                      value={formData.titre}
                      onChange={(e) => handleInputChange("titre", e.target.value)}
                    />
                  </div>

                  <div className="form-gaming-group">
                    <label className="form-gaming-label">Description / Détails</label>
                    <textarea
                      className="form-gaming-input"
                      rows={3}
                      placeholder="Indiquez la couleur, la taille, ou tout détail utile..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-gaming-group">
                    <label className="form-gaming-label">URL du site marchand</label>
                    <input
                      type="url"
                      className="form-gaming-input"
                      placeholder="https://exemple.com/produit"
                      value={formData.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                    />
                  </div>

                  <div className="form-gaming-group">
                    <label className="form-gaming-label">Priorité / Rareté</label>
                    <select
                      className="form-gaming-input"
                      value={formData.valuePriorite}
                      onChange={(e) => handleInputChange("valuePriorite", parseInt(e.target.value, 10))}
                    >
                      <option value="5">❤️ (Faible)</option>
                      <option value="4">❤️❤️ (Modérée)</option>
                      <option value="3">❤️❤️❤️ (Importante)</option>
                      <option value="2">❤️❤️❤️❤️ (Élevée)</option>
                      <option value="1">❤️❤️❤️❤️❤️ (Légendaire)</option>
                    </select>
                  </div>
                </div>

                <div className="modal-gaming-footer">
                  <button type="button" className="btn-gaming btn-gaming-secondary" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn-gaming btn-gaming-primary">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
