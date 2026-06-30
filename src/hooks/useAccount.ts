import { useCallback, useEffect, useState } from "react";
import { accountService } from "../services/accountService";
import type { AccountInfo } from "../services/accountService";

// Hook de récupération des infos du compte (GET /api/compte/infos).
export function useAccount() {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    setErreur("");
    const result = await accountService.getInfos();
    if (result.erreur) {
      setErreur(result.erreur);
      setAccount(null);
    } else {
      setAccount(result.data ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return { account, erreur, loading, refetch: fetchAccount };
}
