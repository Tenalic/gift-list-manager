import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export default function Deconnexion() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // 1. Appel au backend pour détruire la session (et le cookie)
        await authService.deconnexion();
      } catch (error) {
        console.error("Erreur lors de la déconnexion serveur", error);
      } finally {
        // 2. Quoi qu'il arrive, on vide l'état React
        logout();
        // 3. Redirection
        navigate("/");
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="container py-5 text-center">
      <h2>Déconnexion en cours...</h2>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
