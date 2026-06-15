// hooks/useListes.ts

import { useState, useEffect } from "react";
import { listeService } from "../services/listeService";
import type { ListeDto } from "../types/liste";

export function useListes() {
  const [listes, setListes] = useState<ListeDto[]>([]);
  const [favoris, setFavoris] = useState<ListeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  const fetchListes = async () => {
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
  };

  useEffect(() => {
    fetchListes();
  }, []);

  return { listes, favoris, loading, erreur, refresh: fetchListes };
}
