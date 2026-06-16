import { useListeDetail } from "../hooks/useListeDetail";

export default function ListeDetail() {
  const {
    liste,
    loading,
    erreur,
    showModal,
    editingObjet,
    formData,
    navigate,
    handleToggleFavoris,
    handleToggleOffrir,
    handleDeleteObjet,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange
  } = useListeDetail();

  if (loading) return <div className="container py-5 text-center">Chargement...</div>;
  if (erreur) return <div className="container py-5 alert alert-danger">{erreur}</div>;
  if (!liste) return null;

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button className="btn btn-link p-0 mb-2" onClick={() => navigate("/mes-listes")}>
            &larr; Retour à mes listes
          </button>
          <h1>{liste.nomListe}</h1>
          <p className="text-muted">Propriétaire : {liste?.listeCadeaux?.proprietaire}</p>
        </div>
        {!liste.estProprietaire && (
          <button 
            className={`btn ${liste.estFavoris ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={handleToggleFavoris}
          >
            {liste.estFavoris ? "⭐ En favoris" : "☆ Ajouter aux favoris"}
          </button>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Cadeaux</h2>
        {liste.estProprietaire && (
          <button className="btn btn-primary" onClick={() => openModal()}>
            + Ajouter un objet
          </button>
        )}
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {liste.listeCadeaux?.listeObjet?.map((objet) => (
          <div key={objet.idObjet} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{objet.titre}</h5>
                  <span className="fs-4">{objet.priorite}</span>
                </div>
                <p className="card-text">{objet.description}</p>
                {objet.url && (
                  <a href={objet.url} target="_blank" rel="noopener noreferrer" className="btn btn-link btn-sm p-0">
                    Voir le site
                  </a>
                )}
                <div className="mt-3">
                  {!liste.estProprietaire && (objet.estPrit  ? (
                    <span className="badge bg-success">Offert par {objet.pseudoDetenteur || objet.detenteur || "quelqu'un"}</span>
                  ) : (
                    <span className="badge bg-light text-dark">Libre</span>
                  ))}
                </div>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                {liste.estProprietaire ? (
                  <div className="btn-group w-100">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => openModal(objet)}>Modifier</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => objet.idObjet && handleDeleteObjet(objet.idObjet)}>Supprimer</button>
                  </div>
                ) : (
                  <button 
                    className={`btn btn-sm w-100 ${objet.estPrit ? (objet.pseudoDetenteur === "Moi" || objet.detenteur === "Moi" ? 'btn-danger' : 'btn-secondary disabled') : 'btn-success'}`}
                    onClick={() => objet.idObjet && handleToggleOffrir(objet.idObjet)}
                    disabled={objet.estPrit && (objet.pseudoDetenteur !== "Moi" && objet.detenteur !== "Moi")}
                  >
                    {(objet.pseudoDetenteur === "Moi" || objet.detenteur === "Moi") ? "Ne plus offrir" : (objet.estPrit ? "Déjà offert" : "Offrir")}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajout/Modif */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editingObjet ? "Modifier l'objet" : "Ajouter un objet"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      value={formData.titre}
                      onChange={(e) => handleInputChange("titre", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      value={formData.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priorité</label>
                    <select 
                      className="form-select"
                      value={formData.valuePriorite}
                      onChange={(e) => handleInputChange("valuePriorite", e.target.value)}
                    >
                      <option value="5">❤️</option>
                      <option value="4">❤️❤️</option>
                      <option value="3">❤️❤️❤️</option>
                      <option value="2">❤️❤️❤️❤️</option>
                      <option value="1">❤️❤️❤️❤️❤️</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn btn-primary">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
