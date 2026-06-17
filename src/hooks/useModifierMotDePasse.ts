import { useState } from "react";
import { authService } from "../services/authService";

export function useModifierMotDePasse() {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModifierMotDePasse = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");
    setMessage("");

    if (nouveauMotDePasse !== confirmationMotDePasse) {
      setErreur("Le nouveau mot de passe et sa confirmation ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.modifierMotDePasse({
        ancienMotDePasse,
        nouveauMotDePasse,
        confirmationMotDePasse,
      });

      if (result.erreur) {
        setErreur(result.erreur);
      } else {
        setMessage(result.message || "Mot de passe modifié avec succès.");
        setAncienMotDePasse("");
        setNouveauMotDePasse("");
        setConfirmationMotDePasse("");
      }
    } catch {
      setErreur("Une erreur technique est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return {
    ancienMotDePasse, setAncienMotDePasse,
    nouveauMotDePasse, setNouveauMotDePasse,
    confirmationMotDePasse, setConfirmationMotDePasse,
    erreur, message, loading,
    handleModifierMotDePasse,
  };
}
