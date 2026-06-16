// pages/GiftList.tsx

import { Link } from "react-router-dom";
import { useListes } from "../hooks/useListes";
import { useAuth } from "../context/AuthContext";

export default function GiftList() {
  const { isConnected } = useAuth();
  const { listes, favoris, loading, erreur } = useListes();

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
