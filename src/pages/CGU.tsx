import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CGU() {
  const navigate = useNavigate();

  return (
    <main className="container py-5" style={{ padding: "0 1.5rem" }}>
      <div className="gaming-document-container">
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>A voir aussi :</p>
        <ol style={{ fontSize: "0.85rem", marginBottom: "2rem" }}>
          <li><Link to="/politique-confidentialite" className="link-gaming">Politique de Confidentialité</Link></li>
          <li><Link to="/politique-securite" className="link-gaming">Politique de Sécurité</Link></li>
        </ol>

        <h1>Conditions Générales d'Utilisation</h1>

        <p>Bienvenue sur cette plateforme de gestion de liste de cadeau !</p>
        <p>
          Veuillez lire attentivement ces Conditions Générales d'Utilisation ("CGU") avant
          d'utiliser notre site Web.
        </p>
        <p>
          En utilisant notre site, vous acceptez ces conditions dans leur intégralité. Si vous
          n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
        </p>

        <ol>
          <li>
            <strong>Collecte de données personnelles</strong><br />
            En utilisant notre site, vous consentez à la collecte et au traitement de vos données
            personnelles, y compris votre nom et prénom, ainsi que votre email, conformément à notre
            Politique de Confidentialité.
          </li>
          <li>
            <strong>Utilisation des données personnelles</strong><br />
            Nous utilisons vos données personnelles dans le seul but de fournir et de gérer vos
            listes. Vos données ne seront pas utilisées à des fins commerciales et ne seront pas
            partagées avec des tiers sans votre consentement, sauf exigence légale.
          </li>
          <li>
            <strong>Conservation des données</strong><br />
            Nous conservons vos données personnelles pendant la période d'activité de votre compte
            sauf indication contraire de votre part ou exigence légale.
          </li>
          <li>
            <strong>Sécurité des données</strong><br />
            Nous mettons en place des mesures de sécurité appropriées pour protéger vos données
            personnelles contre tout accès non autorisé, divulgation, altération ou destruction,
            conformément à notre Politique de Sécurité des Données.
          </li>
          <li>
            <strong>Cookies</strong><br />
            Nous utilisons des cookies pour améliorer votre expérience utilisateur et pour la gestion
            des sessions. En utilisant notre site Web, vous consentez à l'utilisation de cookies
            conformément à notre Politique de Cookies.
          </li>
          <li>
            <strong>Droit d'accès et de rectification</strong><br />
            Vous avez le droit d'accéder à vos données personnelles et de demander leur rectification
            si elles sont inexactes ou incomplètes.
          </li>
          <li>
            <strong>Modification des CGU</strong><br />
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications
            prendront effet dès leur publication sur le site. Il vous incombe de consulter
            régulièrement les CGU pour être informé de toute modification.
          </li>
          <li>
            <strong>Droit applicable et attribution de juridiction :</strong><br />
            Tout litige en relation avec l'utilisation de ce site est soumis au droit français.
            Il est fait attribution exclusive de juridiction aux tribunaux compétents.
          </li>
          <li>
            <strong>Les principales lois concernées :</strong><br />
            Loi n° 78-87 du 6 janvier 1978, notamment modifiée par la loi n° 2004-801 du 6 août 2004
            relative à l'informatique, aux fichiers et aux libertés.<br />
            Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
          </li>
        </ol>

        <p>En utilisant notre site, vous acceptez ces Conditions Générales d'Utilisation.</p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2rem" }}>Dernière mise à jour : 05/12/2024</p>

        <div className="text-center" style={{ marginTop: "2.5rem" }}>
          <button className="btn-gaming btn-gaming-secondary" onClick={() => navigate("/")}>
            Retour accueil
          </button>
        </div>
      </div>
    </main>
  );
}

