import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isConnected } = useAuth();

  return (
    <main className="home-gaming-container">
      <header className="home-gaming-hero">
        <h1 className="home-gaming-title animate-fade-in">
          Partagez la magie des cadeaux
        </h1>
        <p className="home-gaming-subtitle animate-fade-in-delayed">
          Organisez vos listes de Noël et d'occasions spéciales en toute simplicité
        </p>
      </header>

      <div className="gaming-divider">
        <span className="gaming-divider-icon"></span>
      </div>

      <section className="home-gaming-content">
        <div className="card-gaming mx-auto" style={{ maxWidth: "620px" }}>
          
          {/* Bloc affiché si NON connecté */}
          {!isConnected && (
            <div className="home-gaming-body">
              <p className="home-gaming-text">
                Bienvenue sur <strong>Gift List</strong>, votre compagnon idéal pour créer, 
                gérer et partager vos listes de souhaits. Qu'il s'agisse de préparer un Noël féerique, 
                un anniversaire mémorable ou une fête unique, simplifiez vos préparatifs dès aujourd'hui.
              </p>

              <div className="home-gaming-actions-group">
                <Link to="/connexion" className="btn-gaming btn-gaming-primary w-100">
                  Débuter l'aventure (Connexion)
                </Link>
                <div className="home-gaming-or">
                  <span>ou</span>
                </div>
                <Link to="/inscription" className="btn-gaming btn-gaming-secondary w-100">
                  Créer un compte
                </Link>
              </div>
            </div>
          )}

          {/* Bloc affiché si connecté */}
          {isConnected && (
            <div className="home-gaming-body">
              <p className="home-gaming-text">
                Ravi de vous revoir ! Votre grimoire de cadeaux est prêt à être enrichi. 
                Consultez vos listes existantes ou commencez à planifier vos prochains présents de Noël.
              </p>
              
              <div className="home-gaming-actions-group">
                <Link to="/mes-listes" className="btn-gaming btn-gaming-primary w-100">
                  Accéder à mes listes
                </Link>
              </div>

              <div className="gaming-divider" style={{ margin: "1.5rem 0" }}></div>

              <p className="home-gaming-text-small">
                Besoin de revoir vos préférences ou la sécurité de votre compte ? 
                Visitez notre <Link to="/politique-confidentialite" className="link-gaming">politique de confidentialité</Link>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Liens secondaires en bas */}
      <footer className="home-gaming-footer">
        <Link to="/contact" className="btn-gaming btn-gaming-outline">
          Contacter les lutins (Support)
        </Link>
        
        {!isConnected && (
          <p className="home-gaming-footer-text">
            Découvrez nos fonctionnalités pour{" "}
            <Link to="/mes-listes" className="link-gaming">gérer vos listes de cadeaux</Link>, ou consultez{" "}
            <Link to="/politique-confidentialite" className="link-gaming">
              notre politique de confidentialité
            </Link>
            .
          </p>
        )}
      </footer>
    </main>
  );
}

