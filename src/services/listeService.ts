import type { ListeDto, ListesDto, DetailListeDto, CadeauDto } from "../types/liste";

export interface MesListesResponse {
  messageRetour?: string;
  codeRetour?: number;
  listes: ListeDto[];
  favoris: ListeDto[];
}

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Accept-Language": navigator.language.split("-")[0]
});

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const listeService = {
  async getMesListes(): Promise<MesListesResponse> {
    const response = await fetch(`${API_BASE_URL}/api/liste/mes-listes`, {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Erreur (${response.status})`);
    return response.json();
  },

  async creerListe(nomListe: string, publique: boolean): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/liste/creer`, {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify({ nomListe, publique }),
    });
    if (!response.ok) throw new Error("Erreur lors de la création");
  },

  async updatePublique(idListe: number, publique: boolean): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/liste/${idListe}/publique`, {
      method: "PUT",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify({ publique }),
    });
    if (!response.ok) throw new Error("Erreur de modification de la visibilité");
  },

  async modifierNom(idListe: number, nomListe: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/liste/${idListe}/nom`, {
      method: "PUT",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify({ nomListe }),
    });
    if (!response.ok) throw new Error("Erreur de modification du nom de la liste");
  },


  async getPublicListes(recherche?: string): Promise<ListesDto> {
    const query = recherche ? `?recherche=${encodeURIComponent(recherche)}` : "";
    const response = await fetch(`${API_BASE_URL}/api/liste/publiques${query}`, {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Erreur (${response.status})`);
    return response.json();
  },

  async supprimerListe(idListe: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/liste/${idListe}`, {
      method: "DELETE",
      headers: { "Accept-Language": navigator.language.split("-")[0] },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression");
  },

  async getUneListe(idListe: number): Promise<DetailListeDto> {
    const response = await fetch(`${API_BASE_URL}/api/liste/${idListe}`, {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erreur de récupération");
    return response.json();
  },

  async ajouterCadeau(idListe: number, objet: CadeauDto): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/liste/${idListe}/cadeau`, {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(objet),
    });
    if (!response.ok) throw new Error("Erreur lors de l'ajout");
  },

  async modifierCadeau(objet: CadeauDto): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/cadeau/${objet.idObjet}`, {
      method: "PUT",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(objet),
    });
    if (!response.ok) throw new Error("Erreur de modification");
  },

  async supprimerCadeau(idObjet: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/cadeau/${idObjet}`, {
      method: "DELETE",
      headers: { "Accept-Language": navigator.language.split("-")[0] },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erreur de suppression");
  },

  async toggleFavoris(idListe: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/liste/${idListe}/favoris`, {
      method: "POST",
      headers: { "Accept-Language": navigator.language.split("-")[0] },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erreur favoris");
  },

  async toggleOffrirCadeau(idObjet: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/cadeau/${idObjet}/offrir`, {
      method: "POST",
      headers: { "Accept-Language": navigator.language.split("-")[0] },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erreur action offrir");
  },
};
