import { useNavigate } from "react-router-dom";

export default function Contact() {
  // useNavigate remplace <form action="/welcome" method="get">
  const navigate = useNavigate();

  return (
    <main className="container text-center mt-5">
      <h1 className="h1 mb-4">Contact</h1>
      <p>
        Vous avez une question, vous rencontrez un problème, ou vous avez des
        suggestions d'améliorations ?<br />
        N'hésitez pas à nous contacter.
      </p>

      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h5 className="card-title">Stéphane COCQUEBERT</h5>

          <div className="d-flex align-items-center justify-content-center mb-2">
            <img
              src="/images/linkedin.jpg"
              alt="LinkedIn"
              className="me-2"
              style={{ width: "24px", height: "24px" }}
            />
            <a
              className="btn btn-link"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/st%C3%A9phane-cocquebert-192196163"
            >
              LinkedIn
            </a>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <img
              src="/images/discord.jpg"
              alt="Discord"
              className="me-2"
              style={{ width: "24px", height: "24px" }}
            />
            <span>
              Discord : <strong>tenalic</strong>
            </span>
          </div>
        </div>
      </div>

      {/* useNavigate(-1) = retour à la page précédente, plus flexible qu'un lien fixe */}
      <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
        Retour
      </button>
    </main>
  );
}
