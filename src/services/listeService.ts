// services/listeService.ts

// services/listeService.ts
import type { ListeDto } from "../types/liste"; // On va créer ce type juste après
 // On va créer ce type juste après

export interface MesListesResponse {
  messageRetour?: string;
  codeRetour?: number;
  listes: ListeDto[];
  favoris: ListeDto[];
}

export const listeService = {
  // GET /api/liste/mes-listes
  async getMesListes(): Promise<MesListesResponse> {
    const response = await fetch("/api/liste/mes-listes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "fr"
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des listes (${response.status})`);
    }

    return response.json();
  },
};
