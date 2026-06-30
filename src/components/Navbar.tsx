import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { isConnected } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => setIsExpanded(!isExpanded);
  const closeNavbar = () => setIsExpanded(false);

  return (
    <nav className="navbar-gaming-container">
      <div className="navbar-gaming-wrapper">
        {/* Logo / Accueil */}
        <Link className="navbar-gaming-brand" to="/" onClick={closeNavbar}>
          GIFT LIST
        </Link>

        {/* Bouton hamburger pour mobile */}
        <button
          className="navbar-gaming-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarMenu"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-gaming-toggler-icon"></span>
        </button>

        {/* Contenu de la navigation */}
        <div className={`navbar-gaming-collapse ${isExpanded ? 'show' : ''}`} id="navbarMenu">
          <ul className="navbar-gaming-nav">
            {!isConnected && (
              <>
                <li className="navbar-gaming-item">
                  <Link className="navbar-gaming-link" to="/connexion" onClick={closeNavbar}>Connexion</Link>
                </li>
                <li className="navbar-gaming-item">
                  <Link className="navbar-gaming-link" to="/inscription" onClick={closeNavbar}>Inscription</Link>
                </li>
              </>
            )}
            
            <li className="navbar-gaming-item">
              <Link className="navbar-gaming-link" to="/mes-listes" onClick={closeNavbar}>Mes listes</Link>
            </li>
            <li className="navbar-gaming-item">
              <Link className="navbar-gaming-link" to="/listes-publiques" onClick={closeNavbar}>Listes publiques</Link>
            </li>

            {isConnected && (
              <li className="navbar-gaming-item">
                <Link className="navbar-gaming-link" to="/mon-compte" onClick={closeNavbar}>Mon compte</Link>
              </li>
            )}

            {isConnected && (
              <li className="navbar-gaming-item">
                <Link className="navbar-gaming-link navbar-gaming-link-logout" to="/deconnexion" onClick={closeNavbar}>Déconnexion</Link>
              </li>
            )}
          </ul>

          {/* Sélecteur de thème */}
          <div className="navbar-gaming-actions">
            <button
              className="btn-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Passer au mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
              title={`Passer au mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            >
              {theme === "dark" ? (
                // Icône soleil pour passer au clair
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                // Icône lune pour passer au sombre
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
