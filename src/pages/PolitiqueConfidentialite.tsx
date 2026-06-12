import { useNavigate } from "react-router-dom";

export default function PolitiqueConfidentialite() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center">
        <button className="btn btn-secondary" onClick={() => navigate("/cgu")}>
          Retour
        </button>
      </div>

      <h1 className="mb-4">Politique de Confidentialité</h1>
      <p>
        Cette Politique de Confidentialité décrit comment ce site collecte, utilise et protège
        les données personnelles des utilisateurs de notre site Web.
      </p>

      <h2>Collecte et Utilisation des Données Personnelles</h2>
      <p>
        Nous collectons et traitons les données personnelles suivantes lorsque vous utilisez
        notre site Web :
      </p>
      <ul>
        <li>Email : mail renseigné lors de votre inscription</li>
      </ul>
      <p>
        Nous utilisons vos données personnelles uniquement dans le but de fournir et de gérer
        vos listes que vous créez. Vos données ne seront pas utilisées à des fins commerciales
        et ne seront pas partagées avec des tiers sans votre consentement, sauf indication
        contraire de votre part ou exigence légale.
      </p>

      <h2>Conservation des Données</h2>
      <p>
        Nous conservons vos données personnelles pendant la période d'existance de votre compte,
        sauf indication contraire de votre part ou exigence légale.
      </p>

      <h2>Sécurité des Données</h2>
      <p>
        Nous mettons en place des mesures de sécurité appropriées pour protéger vos données
        personnelles contre tout accès non autorisé, divulgation, altération ou destruction.
      </p>

      <h2>Cookies</h2>
      <p>
        Nous utilisons des cookies pour améliorer votre expérience utilisateur et pour la gestion
        des sessions. En utilisant notre site Web, vous consentez à l'utilisation de cookies
        conformément à notre Politique de Cookies.
      </p>

      <h2>Droit d'Accès et de Rectification</h2>
      <p>
        Vous avez le droit d'accéder à vos données personnelles et de demander leur rectification
        si elles sont inexactes ou incomplètes. Pour exercer ce droit, veuillez nous contacter à
        [adresse e-mail].
      </p>

      <h2>Modifications de la Politique de Confidentialité</h2>
      <p>
        Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment.
        Les modifications prendront effet dès leur publication sur le site. Il vous incombe de
        consulter régulièrement la Politique de Confidentialité pour être informé de toute
        modification.
      </p>

      <p>En utilisant notre site Web, vous acceptez cette Politique de Confidentialité.</p>
      <p className="mb-0">Dernière mise à jour : 05/12/2024</p>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate("/cgu")}>
          Retour
        </button>
      </div>
    </div>
  );
}
