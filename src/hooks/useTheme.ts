import { useEffect } from "react";

// Ce hook remplace ton script theme.js
// Il applique data-bs-theme="dark" ou "light" selon les préférences système
// et écoute les changements en temps réel
export function useTheme() {
  useEffect(() => {
    const applyTheme = (prefersDark: boolean) => {
      document.documentElement.setAttribute(
        "data-bs-theme",
        prefersDark ? "dark" : "light"
      );
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Application immédiate au chargement
    applyTheme(mediaQuery.matches);

    // Écoute les changements (si l'utilisateur change son thème système)
    const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Nettoyage quand le composant est démonté (bonne pratique React)
    return () => mediaQuery.removeEventListener("change", listener);
  }, []); // [] = s'exécute une seule fois au montage, comme DOMContentLoaded
}
