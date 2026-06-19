import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
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
import ModifierMotDePasse from "./pages/ModifierMotDePasse";
import PublicLists from "./pages/PublicLists";

// App.tsx est le point d'entrée de ton app React.
// Il remplace le rôle du dispatcher Spring MVC (les @GetMapping de tes controllers).
export default function App() {
  useTheme();

  return (
    // AuthProvider enveloppe tout : isConnected sera accessible partout
    <AuthProvider>
      {/* BrowserRouter active la navigation (comme les @GetMapping) */}
      <BrowserRouter>

        {/* Navbar est affichée sur toutes les pages, comme ton fragment Thymeleaf */}
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

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
            <Route path="/modifier-mot-de-passe" element={<ModifierMotDePasse />} />
            <Route path="/mes-listes" element={<GiftList />} />
            <Route path="/liste/:id" element={<ListeDetail />} />
            <Route path="/listes-publiques" element={<PublicLists />} />
          </Routes>
        </div>

      </BrowserRouter>
    </AuthProvider>
  );
}
