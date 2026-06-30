import { useThemeContext } from "../context/ThemeContext";

// Ce hook expose le thème et la fonction pour le changer
export function useTheme() {
  return useThemeContext();
}

