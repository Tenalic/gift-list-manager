import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Ce composant remplace ton fragment Thymeleaf : fragments/header :: header
export default function Navbar() {
  // On récupère l'état de connexion depuis le contexte
  // C'est l'équivalent de th:if="${connected}" / th:if="!${connected}"
  const { isConnected } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => setIsExpanded(!isExpanded);
  const closeNavbar = () => setIsExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* navbar-brand : équivalent de <a href="/welcome"> */}
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>Accueil</Link>

        {/* Bouton hamburger pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarMenu"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* th:if="!${connected}" → on affiche seulement si NON connecté */}
            {!isConnected && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/connexion" onClick={closeNavbar}>Connexion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inscription" onClick={closeNavbar}>Inscription</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/mes-listes" onClick={closeNavbar}>Mes listes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listes-publiques" onClick={closeNavbar}>Listes publiques</Link>
            </li>

            {/* th:if="${connected}" → on affiche seulement si connecté */}
            {isConnected && (
              <li className="nav-item">
                <Link className="nav-link" to="/modifier-mot-de-passe" onClick={closeNavbar}>Modifier mon mot de passe</Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/cgu" onClick={closeNavbar}>CGU</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/politique-confidentialite" onClick={closeNavbar}>Confidentialité</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/politique-securite" onClick={closeNavbar}>Sécurité</Link>
            </li>

            {isConnected && (
              <li className="nav-item">
                <Link className="nav-link" to="/deconnexion" onClick={closeNavbar}>Déconnexion</Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
