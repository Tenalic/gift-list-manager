// services/authService.ts
// Ce fichier ne contient QUE les appels réseau vers ton backend Java.
// Analogie Java : c'est ton RestTemplate / WebClient

// --- Types ---
export interface ConnexionRequest {
  email: string;
  password: string;
}

export interface ConnexionResponse {
  erreur?: string;
  message?: string;
}

export interface MotDePasseOublieRequest {
  email: string;
}

export interface InscriptionRequest {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptCGU: boolean;
}

// --- Appels API ---
export const authService = {

  // POST /api/connexion
  async connexion(data: ConnexionRequest): Promise<ConnexionResponse> {
    try {
      const response = await fetch("/api/compte/connexion", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept-Language": "fr"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Tentative de lecture du JSON, sinon message d'erreur générique
        try {
          const err = await response.json();
          // On cherche 'erreur' (notre convention React) ou 'messageRetour' (ta convention Java)
          return { erreur: err.erreur || err.messageRetour || `Erreur serveur (${response.status})` };
        } catch {
          return { erreur: `Le serveur a répondu avec une erreur (${response.status}).` };
        }
      }

      return {};
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error; // Sera rattrapé par le hook useConnexion
    }
  },

  // POST /api/mot-de-passe-oublie
  async motDePasseOublie(data: MotDePasseOublieRequest): Promise<ConnexionResponse> {
    const response = await fetch("/api/mot-de-passe-oublie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { erreur: "Aucun compte trouvé avec cet email." };
    }

    return { message: "Un email de réinitialisation a été envoyé." };
  },

  // POST /api/compte/inscription
  async inscription(data: InscriptionRequest): Promise<ConnexionResponse> {
    try {
      const response = await fetch("/api/compte/inscription", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept-Language": "fr"
        },
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

  // POST /api/compte/deconnexion
  async deconnexion(): Promise<void> {
    await fetch("/api/compte/deconnexion", {
      method: "POST",
    });
  },
};
