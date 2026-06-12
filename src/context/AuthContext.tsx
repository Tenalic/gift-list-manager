import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// --- Types TypeScript ---
// On décrit la "forme" de ce que le contexte va fournir
interface AuthContextType {
  isConnected: boolean;
  login: () => void;
  logout: () => void;
}

// --- Création du contexte ---
// On passe le type à createContext pour que TypeScript sache ce qu'il contient
// "undefined" par défaut : sera remplacé dès que AuthProvider est monté
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider ---
// "children: ReactNode" = n'importe quel contenu React (JSX, texte, composants...)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const login = () => setIsConnected(true);
  const logout = () => setIsConnected(false);

  return (
    <AuthContext.Provider value={{ isConnected, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- Hook personnalisé ---
// Le "if (!context)" protège contre un useAuth() utilisé hors du Provider
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}
