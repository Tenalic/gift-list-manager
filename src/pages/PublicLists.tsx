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
    <main className="container py-5" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
      {/* En-tête de recherche */}
      <div className="card-gaming text-center" style={{ padding: "3rem 1.5rem", marginBottom: "2.5rem" }}>
        <h1 className="home-gaming-title" style={{ fontSize: "2.5rem" }}>Listes Publiques</h1>
        <p className="home-gaming-subtitle" style={{ marginBottom: "2rem" }}>
          Trouvez les listes de cadeaux partagées par vos amis et vos proches pour leur offrir le cadeau idéal.
        </p>

        {/* Formulaire de recherche */}
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", justifyContent: "center", margin: "0 auto", maxWidth: "550px" }}>
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <input
              type="text"
              className="form-gaming-input"
              style={{ flex: 1 }}
              placeholder="Rechercher par nom de liste ou pseudo..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              aria-label="Recherche"
            />
            <button className="btn-gaming btn-gaming-primary" type="submit" disabled={loading} style={{ padding: "0.75rem 1.5rem" }}>
              {loading ? "Recherche..." : "🔍 Chercher"}
            </button>
          </div>
        </form>
      </div>

      {erreur && (
        <div className="alert-gaming alert-gaming-danger" role="alert" style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
          <span>⚠️ {erreur}</span>
        </div>
      )}

      {loading ? (
        <div className="loader-gaming-container">
          <div className="spinner-gaming"></div>
          <p className="home-gaming-text-small">Recherche dans le grimoire des listes...</p>
        </div>
      ) : listes?.lisOfListesCadeaux?.length === 0 ? (
        <div className="card-gaming text-center p-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h3 style={{ color: "var(--text-secondary)", fontSize: "1.25rem", marginBottom: "1rem" }}>Aucune liste publique trouvée</h3>
          <p className="home-gaming-text-small" style={{ marginBottom: "1.5rem" }}>
            {recherche 
              ? "Essayez d'autres mots clés comme le nom de la liste ou le pseudo du propriétaire."
              : "Il n'y a pas encore de liste publique disponible sur la plateforme."}
          </p>
          {recherche && (
            <button className="btn-gaming btn-gaming-outline btn-sm" onClick={() => { setRecherche(""); fetchPublicListes(""); }}>
              Réinitialiser la recherche
            </button>
          )}
        </div>
      ) : (
        <div className="gaming-grid">
          {listes?.lisOfListesCadeaux?.map((liste) => (
            <article 
              key={liste.idListe} 
              className="card-gaming"
              style={{ display: "flex", flexDirection: "column", minHeight: "180px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--text-primary)" }}>{liste.nomListe}</h3>
                <span className="badge-gaming badge-gaming-success">🌍 Publique</span>
              </div>
              
              <p className="home-gaming-text-small" style={{ margin: "0 0 1.5rem 0", color: "var(--text-secondary)" }}>
                Créée par : <strong>{liste.pseudoProprietaire || liste.proprietaire}</strong>
              </p>
              
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  🎁 {liste.nombreObjet || 0} cadeau(x)
                </span>
                <Link to={`/liste/${liste.idListe}`} className="btn-gaming btn-gaming-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}>
                  Voir la liste &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

