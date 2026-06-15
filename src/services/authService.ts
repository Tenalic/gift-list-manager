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
};
