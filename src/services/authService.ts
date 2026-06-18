// services/authService.ts
export interface ConnexionRequest {
  email: string;
  password: string;
}

export interface ConnexionResponse {
  erreur?: string;
  message?: string;
  codeRetour?: number;
}

export interface GeneriqueResponse {
  messageRetour: string;
  codeRetour: number;
}

export interface MotDePasseOublieRequest {
  email: string;
}

export interface ModifierMotDePasseRequest {
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
  confirmationMotDePasse: string;
}

export interface InscriptionRequest {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptCGU: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const authService = {
  async connexion(data: ConnexionRequest): Promise<ConnexionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/compte/connexion`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept-Language": navigator.language.split("-")[0]
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        try {
          const err = await response.json();
          return { erreur: err.erreur || err.messageRetour || `Erreur serveur (${response.status})` };
        } catch {
          return { erreur: `Le serveur a répondu avec une erreur (${response.status}).` };
        }
      }
      return {};
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  },

  async motDePasseOublie(data: MotDePasseOublieRequest): Promise<ConnexionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/compte/mot-de-passe-oublie`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept-Language": navigator.language.split("-")[0]
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      let result: GeneriqueResponse;
      try {
        result = await response.json();
      } catch {
        return { erreur: `Erreur serveur (${response.status}).` };
      }

      if (!response.ok) {
        return { 
          erreur: result.messageRetour || "Une erreur est survenue.",
          codeRetour: result.codeRetour 
        };
      }
      return { 
        message: result.messageRetour,
        codeRetour: result.codeRetour 
      };
    } catch (error) {
      console.error("Erreur mot de passe oublié:", error);
      return { erreur: "Impossible de contacter le serveur." };
    }
  },

  async modifierMotDePasse(data: ModifierMotDePasseRequest): Promise<ConnexionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/compte/update-password`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept-Language": navigator.language.split("-")[0]
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      let result: GeneriqueResponse;
      try {
        result = await response.json();
      } catch {
        return { erreur: `Erreur serveur (${response.status}).` };
      }

      if (!response.ok) {
        return { 
          erreur: result.messageRetour || "Une erreur est survenue lors de la modification.",
          codeRetour: result.codeRetour 
        };
      }
      return { 
        message: result.messageRetour,
        codeRetour: result.codeRetour 
      };
    } catch (error) {
      console.error("Erreur modification mot de passe:", error);
      return { erreur: "Impossible de contacter le serveur." };
    }
  },

  async inscription(data: InscriptionRequest): Promise<ConnexionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/compte/inscription`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept-Language": navigator.language.split("-")[0]
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        try {
          const err = await response.json();
          return { erreur: err.erreur || err.messageRetour || "Une erreur est survenue lors de l'inscription." };
        } catch {
          return { erreur: "Erreur serveur lors de l'inscription." };
        }
      }
      return {};
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  },

  async deconnexion(): Promise<void> {
    await fetch(`${API_BASE_URL}/api/compte/deconnexion`, {
      method: "POST",
      credentials: "include",
    });
  },
};
