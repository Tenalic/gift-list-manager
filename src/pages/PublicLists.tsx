import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listeService } from "../services/listeService";
import type { ListesDto } from "../types/liste";

export default function PublicLists() {
  const [listes, setListes] = useState<ListesDto>({ lisOfListesCadeaux: [] });
  const [recherche, setRecherche] = useState("");
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  const fetchPublicListes = async (searchTerm = "") => {
    // Évite les mises à jour d'état synchrones dans les effets en différant dans une microtâche
    await Promise.resolve();

    setLoading(true);
    setErreur("");
    try {
      const data = await listeService.getPublicListes(searchTerm);
      setListes(data || []);
    } catch {
      setErreur("Impossible de charger les listes publiques. Le backend est-il prêt ?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPublicListes();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPublicListes(recherche);
  };

  return (
    <main className="container py-5">
      {/* En-tête accrocheur avec un dégradé subtil en arrière-plan */}
      <div className="p-5 mb-4 bg-body-tertiary rounded-3 text-center border shadow-sm position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient opacity-10" style={{ backgroundImage: "linear-gradient(135deg, var(--accent) 0%, transparent 100%)" }}></div>
        <h1 className="display-5 fw-bold mb-3">Rechercher des Listes Publiques</h1>
        <p className="col-md-8 mx-auto fs-5 text-muted mb-4">
          Trouvez les listes de cadeaux partagées par vos amis et vos proches pour leur offrir le cadeau idéal.
        </p>

        {/* Formulaire de recherche moderne */}
        <form onSubmit={handleSearchSubmit} className="d-flex justify-content-center mx-auto" style={{ maxWidth: "500px" }}>
          <div className="input-group input-group-lg shadow-sm rounded">
            <input
              type="text"
              className="form-control border-end-0 bg-body"
              placeholder="Rechercher par nom de liste ou pseudo..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              aria-label="Recherche"
            />
            <button className="btn btn-primary px-4" type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "🔍 Rechercher"
              )}
            </button>
          </div>
        </form>
      </div>

      {erreur && (
        <div className="alert alert-warning text-center shadow-sm" role="alert">
          {erreur}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : listes?.lisOfListesCadeaux?.length === 0 ? (
        <div className="card text-center p-5 border-dashed bg-transparent shadow-sm">
          <div className="card-body">
            <h3 className="h5 text-muted mb-3">Aucune liste publique trouvée</h3>
            <p className="text-muted mb-0">
              {recherche 
                ? "Essayez d'autres mots clés comme le nom de la liste ou le pseudo du propriétaire."
                : "Il n'y a pas encore de liste publique disponible sur la plateforme."}
            </p>
            {recherche && (
              <button className="btn btn-outline-secondary mt-3 btn-sm" onClick={() => { setRecherche(""); fetchPublicListes(""); }}>
                Réinitialiser la recherche
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {listes?.lisOfListesCadeaux?.map((liste) => (
            <div key={liste.idListe} className="col">
              <div 
                className="card h-100 shadow-sm border-0 bg-body-tertiary transition-transform" 
                style={{ 
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold mb-0">{liste.nomListe}</h5>
                    <span className="badge bg-success">🌍 Publique</span>
                  </div>
                  <p className="card-text text-muted mb-3 small">
                    Créée par : <strong>  {liste.pseudoProprietaire || liste.proprietaire}</strong>
                  </p>
                  
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-muted small">
                      🎁 {liste.nombreObjet || 0} cadeau(x)
                    </span>
                    <Link to={`/liste/${liste.idListe}`} className="btn btn-outline-primary btn-sm px-3">
                      Voir la liste &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
