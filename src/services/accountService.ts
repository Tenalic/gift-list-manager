// services/accountService.ts
// Service dédié aux informations du compte (nouvel endpoint GET /api/compte/infos).

// Objet de sortie du endpoint (LocalDateTime sérialisé en chaîne ISO-8601 côté back).
export interface AccountInfo {
  pseudo: string;
  email: string;
  lastLoginDate: string;
  lastPasswordChangeDate: string;
}

export interface AccountInfoResponse {
  data?: AccountInfo;
  erreur?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const accountService = {
  // GET /api/compte/infos — renvoie les infos du compte connecté.
  async getInfos(): Promise<AccountInfoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/compte/infos`, {
        method: "GET",
        headers: {
          "Accept-Language": navigator.language.split("-")[0],
        },
        credentials: "include",
      });

      if (!response.ok) {
        try {
          const err = await response.json();
          return { erreur: err.erreur || err.messageRetour || `Erreur serveur (${response.status}).` };
        } catch {
          return { erreur: `Le serveur a répondu avec une erreur (${response.status}).` };
        }
      }

      const data: AccountInfo = await response.json();
      return { data };
    } catch (error) {
      console.error("Erreur récupération infos compte:", error);
      return { erreur: "Impossible de contacter le serveur." };
    }
  },
};
