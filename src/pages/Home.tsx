import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SEO — Configuration centralisée
 * ─────────────────────────────────────────────────────────────────────────
 *  ⚠️ À AJUSTER : remplacez SITE_URL par le domaine de production réel.
 *  Cette constante alimente la balise <link rel="canonical"> et les URLs
 *  Open Graph / Twitter. Une seule ligne à modifier.
 */
const SITE_URL = "https://living-stevana-tenalic-07c42fee.koyeb.app/"; // ← REMPLACER par votre domaine

// Page d'accueil = racine du site → URL canonique = domaine racine.
const CANONICAL_URL = `${SITE_URL}/`;

// Image de partage social (déjà présente dans /public/images).
// Recommandé : 1200×630 px pour un rendu optimal sur les réseaux.
const OG_IMAGE = `${SITE_URL}/images/noel-cadeau.jpg`;

// Titre & description centralisés (réutilisés par <title>, OG et Twitter).
// title : ~55 caractères | description : ~155 caractères (cibles SEO).
const SEO_TITLE = "Gift List — Créez et partagez vos listes de cadeaux";
const SEO_DESCRIPTION =
  "Créez, gérez et partagez facilement vos listes de cadeaux pour Noël, " +
  "anniversaires et occasions spéciales. Simplifiez vos préparatifs avec Gift List.";

/**
 * Données structurées Schema.org (JSON-LD).
 * Type "WebApplication" : décrit une application web gratuite de gestion
 * de listes de souhaits → aide Google à comprendre la nature du service
 * et peut enrichir l'affichage dans les résultats de recherche.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gift List",
  url: SITE_URL,
  description: SEO_DESCRIPTION,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  inLanguage: "fr-FR",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

export default function Home() {
  const { isConnected } = useAuth();

  return (
    <>
      {/*
        ───────────────────────────────────────────────────────────────
         MÉTADONNÉES <head> — React 19 hoiste nativement ces balises
         vers le <head> du document (pas besoin de react-helmet-async).
        ───────────────────────────────────────────────────────────────
      */}
      {/* Titre unique et descriptif (50-60 caractères) */}
      <title>{SEO_TITLE}</title>

      {/* Meta description engageante (150-160 caractères) */}
      <meta name="description" content={SEO_DESCRIPTION} />

      {/* URL canonique : évite le contenu dupliqué */}
      <link rel="canonical" href={CANONICAL_URL} />

      {/* Open Graph (Facebook, LinkedIn, partages génériques) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Gift List" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={SEO_TITLE} />
      <meta property="og:description" content={SEO_DESCRIPTION} />
      <meta property="og:url" content={CANONICAL_URL} />
      <meta property="og:image" content={OG_IMAGE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SEO_TITLE} />
      <meta name="twitter:description" content={SEO_DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Données structurées JSON-LD (Schema.org / WebApplication) */}
      <script
        type="application/ld+json"
        // Injection contrôlée d'un objet JSON statique (aucune donnée utilisateur).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/*
        ───────────────────────────────────────────────────────────────
         CONTENU DE LA PAGE — design & comportement inchangés.
        ───────────────────────────────────────────────────────────────
      */}
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
          {/* Icône purement décorative : masquée aux lecteurs d'écran */}
          <span className="gaming-divider-icon" aria-hidden="true"></span>
        </div>

        <section className="home-gaming-content" aria-label="Présentation de Gift List">
          {/* h2 sémantique invisible : établit la hiérarchie SEO sans impact visuel */}
          <h2 className="visually-hidden">
            {isConnected ? "Votre espace de gestion de cadeaux" : "Bienvenue sur Gift List"}
          </h2>

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

                <div className="gaming-divider" style={{ margin: "1.5rem 0" }} aria-hidden="true"></div>

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
    </>
  );
}
