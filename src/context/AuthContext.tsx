import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";

// --- Types TypeScript ---
interface AuthContextType {
  isConnected: boolean;
  pseudo: string;
  login: (pseudo: string) => void;
  logout: () => void;
  loading: boolean;
}

// --- Création du contexte ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider ---
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [pseudo, setPseudo] = useState<string>("");

  // Vérifier la session au chargement (refresh)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await authService.getMe();
        if (!result.erreur) {
          setIsConnected(true);
        }
      } catch (err) {
        console.error("Session check failed", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = (pseudo: string) => { setIsConnected(true); setPseudo(pseudo); };
  const logout = () => { setIsConnected(false); setPseudo(""); };

  return (
    <AuthContext.Provider value={{ isConnected, pseudo, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- Hook personnalisé ---
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}
