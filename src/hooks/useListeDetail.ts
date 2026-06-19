import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listeService } from "../services/listeService";
import type { DetailListeDto, CadeauDto } from "../types/liste";

export const useListeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liste, setListe] = useState<DetailListeDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [ordreTri, setOrdreTri] = useState<"asc" | "desc">("asc");

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
    if (!id) return;
    try {
      await Promise.resolve();
      setLoading(true);
      const data = await listeService.getUneListe(parseInt(id));
      setListe(data);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchListe();
  }, [fetchListe]);

  const handleToggleFavoris = async () => {
    if (!liste || !liste.listeCadeaux) return;
    try {
      await listeService.toggleFavoris(liste.listeCadeaux.idListe);
      fetchListe();
    } catch {
      alert("Erreur favoris");
    }
  };

  const handleToggleOffrir = async (idObjet: number) => {
    try {
      await listeService.toggleOffrirCadeau(idObjet);
      fetchListe();
    } catch {
      alert("Erreur action offrir");
    }
  };

  const handleDeleteObjet = async (idObjet: number) => {
    if (!window.confirm("Supprimer cet objet ?")) return;
    try {
      await listeService.supprimerCadeau(idObjet);
      fetchListe();
    } catch {
      alert("Erreur suppression");
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
    if (!id) return;
    try {
      if (editingObjet) {
        await listeService.modifierCadeau(formData);
      } else {
        await listeService.ajouterCadeau(parseInt(id), formData);
      }
      setShowModal(false);
      fetchListe();
    } catch {
      alert("Erreur enregistrement");
    }
  };

  const handleInputChange = <K extends keyof CadeauDto>(field: K, value: CadeauDto[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const copyLinkToClipboard = () => {
    if (!liste?.listeCadeaux?.urlPartage) return;
    navigator.clipboard.writeText(liste?.listeCadeaux?.urlPartage)
      .then(() => alert("Lien copié dans le presse-papier !"))
      .catch(() => alert("Erreur lors de la copie du lien"));
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
    handleToggleOffrir,
    handleDeleteObjet,
    toggleTri,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange,
    copyLinkToClipboard
  };
};
