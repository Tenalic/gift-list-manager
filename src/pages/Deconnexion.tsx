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
    <div className="loader-gaming-container">
      <h2>Déconnexion en cours...</h2>
      <div className="spinner-gaming" role="status" aria-live="polite">
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Déconnexion en cours
        </span>
      </div>
    </div>
  );
}
