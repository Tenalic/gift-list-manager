import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MonCompte from "./pages/MonCompte";
import Home from "./pages/Home";
import { useTheme } from "./hooks/useTheme";
import Contact from "./pages/Contact";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import PolitiqueSecurite from "./pages/PolitiqueSecurite";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import GiftList from "./pages/GiftList";
import ListeDetail from "./pages/ListeDetail";
import Deconnexion from "./pages/Deconnexion";
import PublicLists from "./pages/PublicLists";

// App.tsx est le point d'entrée de ton app React.
// Il remplace le rôle du dispatcher Spring MVC (les @GetMapping de tes controllers).
function AppContent() {
  useTheme(); // Applique le thème initialement et écoute

  return (
    // AuthProvider enveloppe tout : isConnected sera accessible partout
    <AuthProvider>
      {/* ToastProvider : notifications in-page accessibles depuis toutes les pages */}
      <ToastProvider>
      {/* BrowserRouter active la navigation (comme les @GetMapping) */}
      <BrowserRouter>

        {/* Navbar est affichée sur toutes les pages, comme ton fragment Thymeleaf */}
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

          {/* Contenu principal : prend l'espace dispo pour pousser le footer en bas */}
          <div className="d-flex flex-column flex-grow-1">
            {/* Routes = le routeur : selon l'URL, il affiche le bon composant */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/politique-securite" element={<PolitiqueSecurite />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/deconnexion" element={<Deconnexion />} />
              <Route path="/mon-compte" element={<MonCompte />} />
              {/* Ancienne route conservée : redirige vers la page Mon compte */}
              <Route path="/modifier-mot-de-passe" element={<Navigate to="/mon-compte" replace />} />
              <Route path="/mes-listes" element={<GiftList />} />
              <Route path="/liste/:token" element={<ListeDetail />} />
              <Route path="/listes-publiques" element={<PublicLists />} />
            </Routes>
          </div>

          {/* Footer global affiché sur toutes les pages */}
          <Footer />
        </div>

      </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

