import type { ListeDto, DetailListeDto, ObjetDto } from "../types/liste";

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

  // GET /api/liste/{id}
  async getUneListe(idListe: number): Promise<DetailListeDto> {
    const response = await fetch(`/api/liste/${idListe}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "fr"
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de la liste (${response.status})`);
    }

    return response.json();
  },

  // POST /api/liste/{id}/cadeau
  async ajouterCadeau(idListe: number, objet: ObjetDto): Promise<void> {
    const response = await fetch(`/api/liste/${idListe}/cadeau`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objet),
    });
    if (!response.ok) throw new Error("Erreur lors de l'ajout du cadeau");
  },

  // PUT /api/cadeau/{id}
  async modifierCadeau(objet: ObjetDto): Promise<void> {
    const response = await fetch(`/api/cadeau/${objet.idObjet}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objet),
    });
    if (!response.ok) throw new Error("Erreur lors de la modification du cadeau");
  },

  // DELETE /api/cadeau/{id}
  async supprimerCadeau(idObjet: number): Promise<void> {
    const response = await fetch(`/api/cadeau/${idObjet}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression du cadeau");
  },

  // POST /api/liste/{id}/favoris
  async toggleFavoris(idListe: number): Promise<void> {
    const response = await fetch(`/api/liste/${idListe}/favoris`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Erreur lors de la modification des favoris");
  },

  // POST /api/cadeau/{id}/offrir
  async toggleOffrirCadeau(idObjet: number): Promise<void> {
    const response = await fetch(`/api/cadeau/${idObjet}/offrir`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Erreur lors de l'action offrir");
  },
};
