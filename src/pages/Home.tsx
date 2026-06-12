import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Ce composant remplace ta page welcome.html
export default function Home() {
  // On récupère l'état de connexion depuis le contexte
  const { isConnected } = useAuth();

  return (
    <main className="container my-5 text-center">

      <h1 className="display-4 mb-4">
        Organisez et partagez votre liste de Noël en toute simplicité !
      </h1>

      <img
        className="img-fluid mb-4"
        src="/images/noel-cadeau.jpg"
        alt="Liste de cadeaux de Noël : gérez vos idées simplement"
      />

      <div className="card mx-auto table-container" style={{ maxWidth: "600px" }}>

        {/* th:if="!${connected}" → bloc affiché si NON connecté */}
        {!isConnected && (
          <div className="card-body">
            <p className="mb-4">
              Bienvenue sur notre site, votre outil parfait pour gérer vos{" "}
              <strong>listes de cadeaux</strong>, qu'il s'agisse de{" "}
              <strong>cadeaux de Noël</strong>, d'anniversaires ou d'autres
              occasions spéciales. Inscrivez-vous dès aujourd'hui pour une
              expérience simplifiée et conviviale.
            </p>

            {/* En React, pas de <form action="..."> pour naviguer : on utilise Link */}
            <div className="mb-3">
              <Link to="/connexion" className="btn btn-primary">
                Connexion
              </Link>
            </div>

            <p className="mb-4">
              Pas de compte ? Créez-en un simplement avec le bouton ci-dessous !
            </p>

            <Link to="/inscription" className="btn btn-secondary">
              Inscription
            </Link>
          </div>
        )}

        {/* th:if="${connected}" → bloc affiché si connecté */}
        {isConnected && (
          <div className="card-body">
            <p className="mb-4">
              Bienvenue sur notre site, votre outil parfait pour gérer vos{" "}
              <strong>listes de cadeaux</strong>, qu'il s'agisse de{" "}
              <strong>cadeaux de Noël</strong>, d'anniversaires ou d'autres
              occasions spéciales.
            </p>
            <p className="mt-4">
              Découvrez nos fonctionnalités pour{" "}
              <Link to="/liste">gérer vos listes de cadeaux</Link>, ou consultez{" "}
              <Link to="/politique-confidentialite">
                notre politique de confidentialité
              </Link>
              .
            </p>
          </div>
        )}
      </div>

      {/* Bouton Contact (présent pour tous) */}
      <div className="mt-4">
        <Link to="/contact" className="btn btn-outline-secondary">
          Contact
        </Link>
      </div>

      {/* Liens en bas, visibles uniquement si NON connecté */}
      {!isConnected && (
        <p className="mt-4">
          Découvrez nos fonctionnalités pour{" "}
          <Link to="/liste">gérer vos listes de cadeaux</Link>, ou consultez{" "}
          <Link to="/politique-confidentialite">
            notre politique de confidentialité
          </Link>
          .
        </p>
      )}
    </main>
  );
}
