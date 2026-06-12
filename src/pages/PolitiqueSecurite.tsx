import { useNavigate } from "react-router-dom";

export default function PolitiqueSecurite() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center">
        <button className="btn btn-secondary" onClick={() => navigate("/cgu")}>
          Retour
        </button>
      </div>

      <h1 className="mb-4">Politique de Sécurité</h1>

      <h2>Protection des Données Personnelles :</h2>
      <ul>
        <li>
          Toutes les données personnelles collectées sont traitées de manière confidentielle
          et ne sont accessibles qu'aux membres autorisés de l'équipe informatique.
        </li>
        <li>
          Les données personnelles sont stockées de manière sécurisée sur nos serveurs et sont
          protégées contre tout accès non autorisé.
        </li>
      </ul>

      <h2>Sécurité des Systèmes Informatiques :</h2>
      <ul>
        <li>
          Les systèmes informatiques utilisés pour la gestion de vos listes sont régulièrement
          mis à jour avec les derniers correctifs de sécurité pour protéger contre les
          vulnérabilités connues.
        </li>
        <li>
          Des mesures de sécurité telles que les pare-feu et les outils de détection des
          intrusions sont utilisées pour protéger les systèmes contre les attaques externes.
        </li>
      </ul>

      <h2>Contrôle d'Accès :</h2>
      <ul>
        <li>
          L'accès aux données personnelles et aux systèmes informatiques est limité aux membres
          autorisés de l'équipe informatique.
        </li>
        <li>
          Des identifiants d'utilisateur uniques sont attribués à chaque membre de l'équipe,
          et l'accès est révoqué dès que celui-ci n'est plus nécessaire.
        </li>
      </ul>

      <h2>Sensibilisation à la Sécurité :</h2>
      <ul>
        <li>
          Tous les membres de l'équipe de gestion de listes sont formés aux bonnes pratiques
          de sécurité et sont tenus de suivre les directives de sécurité établies.
        </li>
      </ul>

      <h2>Gestion des Incidents de Sécurité :</h2>
      <ul>
        <li>
          En cas d'incident de sécurité, une équipe dédiée est chargée d'investiguer et de
          répondre rapidement pour minimiser les impacts potentiels.
        </li>
      </ul>

      <p>
        Cette politique de sécurité est sujette à des révisions périodiques pour s'assurer
        qu'elle reste alignée sur les meilleures pratiques de sécurité et les évolutions
        technologiques.
      </p>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate("/cgu")}>
          Retour
        </button>
      </div>
    </div>
  );
}
