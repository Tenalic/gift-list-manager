import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export function useInscription() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptCGU: false
  });
  
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErreur("");

    if (formData.password !== formData.confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!formData.acceptCGU) {
      setErreur("Vous devez accepter les CGU pour vous inscrire.");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.inscription(formData);
      if (result.erreur) {
        setErreur(result.erreur);
      } else {
        login(result?.pseudo || '');
        navigate("/");
      }
    } catch (err) {
      setErreur("Une erreur technique est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    loading,
    erreur,
    handleSubmit,
    handleInputChange
  };
}
