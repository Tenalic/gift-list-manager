import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Footer global multi-colonnes affiché sur toutes les pages (comme la Navbar).
// Regroupe les liens vers toutes les routes de l'application en colonnes thématiques.
export default function Footer() {
  const { isConnected } = useAuth();
  const annee = new Date().getFullYear();

  return (
    <footer className="footer-gaming" aria-labelledby="footer-titre">
      <h2 id="footer-titre" className="visually-hidden">
        Pied de page et navigation
      </h2>

      <div className="footer-gaming-grid">
        {/* Colonne Navigation */}
        <nav className="footer-gaming-col" aria-label="Navigation principale">
          <h3 className="footer-gaming-heading">Navigation</h3>
          <ul className="footer-gaming-list">
            <li><Link className="footer-gaming-link" to="/">Accueil</Link></li>
            <li><Link className="footer-gaming-link" to="/mes-listes">Mes listes</Link></li>
            <li><Link className="footer-gaming-link" to="/listes-publiques">Listes publiques</Link></li>
          </ul>
        </nav>

        {/* Colonne Mon compte (liens conditionnels selon l'état de connexion) */}
        <nav className="footer-gaming-col" aria-label="Gestion du compte">
          <h3 className="footer-gaming-heading">Mon compte</h3>
          <ul className="footer-gaming-list">
            {isConnected ? (
              <>
                <li><Link className="footer-gaming-link" to="/mon-compte">Mon compte</Link></li>
                <li><Link className="footer-gaming-link" to="/mon-compte?tab=securite">Modifier le mot de passe</Link></li>
                <li><Link className="footer-gaming-link" to="/deconnexion">Déconnexion</Link></li>
              </>
            ) : (
              <>
                <li><Link className="footer-gaming-link" to="/connexion">Connexion</Link></li>
                <li><Link className="footer-gaming-link" to="/inscription">Inscription</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Colonne Informations */}
        <nav className="footer-gaming-col" aria-label="Informations légales">
          <h3 className="footer-gaming-heading">Informations</h3>
          <ul className="footer-gaming-list">
            <li><Link className="footer-gaming-link" to="/cgu">CGU</Link></li>
            <li><Link className="footer-gaming-link" to="/politique-confidentialite">Politique de confidentialité</Link></li>
            <li><Link className="footer-gaming-link" to="/politique-securite">Politique de sécurité</Link></li>
          </ul>
        </nav>

        {/* Colonne Aide */}
        <nav className="footer-gaming-col" aria-label="Aide et support">
          <h3 className="footer-gaming-heading">Aide</h3>
          <ul className="footer-gaming-list">
            <li><Link className="footer-gaming-link" to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Ligne de bas de page : copyright + mentions légales */}
      <div className="footer-gaming-bottom">
        <p className="footer-gaming-copyright">
          © {annee} Gift List — Tous droits réservés.
        </p>
        <nav className="footer-gaming-legal" aria-label="Mentions légales">
          <Link className="footer-gaming-legal-link" to="/cgu">CGU</Link>
          <span aria-hidden="true">·</span>
          <Link className="footer-gaming-legal-link" to="/politique-confidentialite">Confidentialité</Link>
          <span aria-hidden="true">·</span>
          <Link className="footer-gaming-legal-link" to="/politique-securite">Sécurité</Link>
        </nav>
      </div>
    </footer>
  );
}
