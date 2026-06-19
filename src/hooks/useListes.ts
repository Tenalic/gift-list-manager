// hooks/useListes.ts

import { useState, useEffect, useCallback } from "react";
import { listeService } from "../services/listeService";
import { useAuth } from "../context/AuthContext";
import type { ListeDto } from "../types/liste";

export function useListes() {
  const { isConnected } = useAuth();
  const [listes, setListes] = useState<ListeDto[]>([]);
  const [favoris, setFavoris] = useState<ListeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  const fetchListes = useCallback(async () => {
    // Évite les mises à jour d'état synchrones dans les effets en différant dans une microtâche
    await Promise.resolve();

    if (!isConnected) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await listeService.getMesListes();
      setListes(data.listes || []);
      setFavoris(data.favoris || []);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchListes();
  }, [fetchListes]);

  return { listes, favoris, loading, erreur, refresh: fetchListes };
}
