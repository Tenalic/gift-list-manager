// hooks/useConnexion.ts
// Ce fichier ne contient QUE la logique (états, handlers).
// Analogie Java : c'est ton @Service

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService.ts";

export function useConnexion() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // États du formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // États de la modale
  const [showModal, setShowModal] = useState(false);
  const [emailOublie, setEmailOublie] = useState("");
  const [messageOublie, setMessageOublie] = useState("");

  // Handler connexion : appelle le service, gère la réponse
  const handleConnexion = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErreur("");
    setMessage("");
    setLoading(true);

    try {
      const result = await authService.connexion({ email, password });
      if (result.erreur) {
        setErreur(result.erreur);
      } else {
        login();
        navigate("/mes-listes");
      }
    } catch {
      setErreur("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Handler mot de passe oublié
  const handleMotDePasseOublie = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageOublie("");

    try {
      const result = await authService.motDePasseOublie({ email: emailOublie });
      if (result.erreur) {
        setMessageOublie(result.erreur);
      } else {
        setMessageOublie(result.message ?? "");
        setEmailOublie("");
      }
    } catch {
      setMessageOublie("Impossible de contacter le serveur.");
    }
  };

  // On expose uniquement ce dont la page a besoin
  return {
    // Formulaire connexion
    email, setEmail,
    password, setPassword,
    erreur,
    message,
    loading,
    handleConnexion,
    // Modale
    showModal, setShowModal,
    emailOublie, setEmailOublie,
    messageOublie,
    handleMotDePasseOublie,
  };
}
