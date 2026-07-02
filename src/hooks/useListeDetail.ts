import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listeService } from "../services/listeService";
import { useToast } from "./useToast";
import type { DetailListeDto, CadeauDto } from "../types/liste";

export const useListeDetail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { success, error: toastError, confirm } = useToast();
  const [liste, setListe] = useState<DetailListeDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [ordreTri, setOrdreTri] = useState<"asc" | "desc">("asc");
  const [isEditingNom, setIsEditingNom] = useState(false);
  const [nouveauNom, setNouveauNom] = useState("");

  // État pour le formulaire d'ajout/modification
  const [editingObjet, setEditingObjet] = useState<CadeauDto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CadeauDto>({
    titre: "",
    description: "",
    url: "",
    priorite: "❤️",
    valuePriorite: 5,
    estPrit: false
  });

  const sortedListe = liste ? {
    ...liste,
    listeCadeaux: {
      ...liste.listeCadeaux,
      listeObjet: [...(liste.listeCadeaux?.listeObjet || [])].sort((a, b) => {
        const valA = a.valuePriorite ?? 0;
        const valB = b.valuePriorite ?? 0;
        return ordreTri === "asc" ? valA - valB : valB - valA;
      })
    }
  } : null;

  const toggleTri = () => {
    setOrdreTri(prev => prev === "asc" ? "desc" : "asc");
  };

  const fetchListe = useCallback(async () => {
    if (!token) return;
    try {
      await Promise.resolve();
      setLoading(true);
      const data = await listeService.getUneListe(token);
      setListe(data);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchListe();
  }, [fetchListe]);

  const handleToggleFavoris = async () => {
    if (!liste || !liste.listeCadeaux) return;
    try {
      await listeService.toggleFavoris(liste.listeCadeaux.shareToken);
      fetchListe();
    } catch {
      toastError("Erreur favoris");
    }
  };

  const handleTogglePublique = async () => {
    if (!liste || !liste.listeCadeaux) return;
    try {
      await listeService.updatePublique(liste.listeCadeaux.shareToken, !liste.listeCadeaux.publique);
      fetchListe();
    } catch {
      toastError("Erreur de modification de la visibilité");
    }
  };

  const handleToggleOffrir = async (idObjet: number) => {
    try {
      await listeService.toggleOffrirCadeau(idObjet);
      fetchListe();
    } catch {
      toastError("Erreur action offrir");
    }
  };

  const handleDeleteObjet = async (idObjet: number) => {
    const confirmed = await confirm({
      title: "Supprimer l'objet",
      message: "Supprimer cet objet ?",
      confirmLabel: "Supprimer",
      danger: true,
    });
    if (!confirmed) return;
    try {
      await listeService.supprimerCadeau(idObjet);
      fetchListe();
    } catch {
      toastError("Erreur suppression");
    }
  };

  const openModal = (objet?: CadeauDto) => {
    if (objet) {
      setEditingObjet(objet);
      setFormData({ ...objet });
    } else {
      setEditingObjet(null);
      setFormData({ titre: "", description: "", url: "", priorite: "❤️", valuePriorite: 5, estPrit: false });
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      if (editingObjet) {
        await listeService.modifierCadeau(formData);
      } else {
        await listeService.ajouterCadeau(token, formData);
      }
      setShowModal(false);
      fetchListe();
    } catch {
      toastError("Erreur enregistrement");
    }
  };

  const handleInputChange = <K extends keyof CadeauDto>(field: K, value: CadeauDto[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const copyLinkToClipboard = () => {
    if (!liste?.listeCadeaux?.urlPartage) return;
    navigator.clipboard.writeText(liste?.listeCadeaux?.urlPartage)
      .then(() => success("Lien copié dans le presse-papier !"))
      .catch(() => toastError("Erreur lors de la copie du lien"));
  };

  const startEditingNom = () => {
    if (liste?.listeCadeaux) {
      setNouveauNom(liste.listeCadeaux.nomListe);
      setIsEditingNom(true);
    }
  };

  const handleModifierNom = async (nom: string) => {
    if (!liste?.listeCadeaux) return;
    if (!nom.trim()) return;
    try {
      await listeService.modifierNom(liste.listeCadeaux.shareToken, nom.trim());
      setIsEditingNom(false);
      fetchListe();
    } catch {
      toastError("Erreur lors de la modification du nom de la liste");
    }
  };

  return {
    liste: sortedListe,
    loading,
    erreur,
    ordreTri,
    showModal,
    editingObjet,
    formData,
    navigate,
    handleToggleFavoris,
    handleTogglePublique,
    handleToggleOffrir,
    handleDeleteObjet,
    toggleTri,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange,
    copyLinkToClipboard,
    isEditingNom,
    nouveauNom,
    setNouveauNom,
    setIsEditingNom,
    startEditingNom,
    handleModifierNom
  };
};
