import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Ce composant remplace ton fragment Thymeleaf : fragments/header :: header
export default function Navbar() {
  // On récupère l'état de connexion depuis le contexte
  // C'est l'équivalent de th:if="${connected}" / th:if="!${connected}"
  const { isConnected } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* navbar-brand : équivalent de <a href="/welcome"> */}
        <Link className="navbar-brand" to="/">Accueil</Link>

        {/* Bouton hamburger pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* th:if="!${connected}" → on affiche seulement si NON connecté */}
            {!isConnected && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/connexion">Connexion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inscription">Inscription</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mes-listes">Mes listes</Link>
            </li>

            {/* th:if="${connected}" → on affiche seulement si connecté */}
            {isConnected && (
              <li className="nav-item">
                <Link className="nav-link" to="/modifier-password">Modifier mon mot de passe</Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/cgu">CGU</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/politique-confidentialite">Confidentialité</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/politique-securite">Sécurité</Link>
            </li>

            {isConnected && (
              <li className="nav-item">
                <Link className="nav-link" to="/deconnexion">Déconnexion</Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
