// pages/GiftList.tsx

import { Link } from "react-router-dom";
import { useListes } from "../hooks/useListes";

export default function GiftList() {
  const { listes, favoris, loading, erreur } = useListes();

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

      {/* Section Favoris */}
      <section className="mb-5">
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

      {/* Section Mes Listes */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 text-success">Mes Propres Listes</h2>
          <button className="btn btn-success btn-sm">+ Créer une liste</button>
        </div>
        
        {listes.length === 0 ? (
          <div className="card p-4 text-center bg-light">
            <p className="mb-0">Vous n'avez pas encore créé de liste.</p>
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
                      <button className="btn btn-outline-danger btn-sm">Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
