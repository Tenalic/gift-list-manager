import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listeService } from "../services/listeService";
import type { DetailListeDto, CadeauDto } from "../types/liste";

export const useListeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liste, setListe] = useState<DetailListeDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  // État pour le formulaire d'ajout/modification
  const [editingObjet, setEditingObjet] = useState<CadeauDto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CadeauDto>({
    titre: "",
    description: "",
    url: "",
    priorite: "❤️",
    estPrit: false
  });

  const fetchListe = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await listeService.getUneListe(parseInt(id));
      setListe(data);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListe();
  }, [id]);

  const handleToggleFavoris = async () => {
    if (!liste) return;
    try {
      await listeService.toggleFavoris(liste.idListe);
      fetchListe();
    } catch (err) {
      alert("Erreur favoris");
    }
  };

  const handleToggleOffrir = async (idObjet: number) => {
    try {
      await listeService.toggleOffrirCadeau(idObjet);
      fetchListe();
    } catch (err) {
      alert("Erreur action offrir");
    }
  };

  const handleDeleteObjet = async (idObjet: number) => {
    if (!window.confirm("Supprimer cet objet ?")) return;
    try {
      await listeService.supprimerCadeau(idObjet);
      fetchListe();
    } catch (err) {
      alert("Erreur suppression");
    }
  };

  const openModal = (objet?: CadeauDto) => {
    if (objet) {
      setEditingObjet(objet);
      setFormData({ ...objet });
    } else {
      setEditingObjet(null);
      setFormData({ titre: "", description: "", url: "", priorite: "❤️", estPrit: false });
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
    } catch (err) {
      alert("Erreur enregistrement");
    }
  };

  const handleInputChange = (field: keyof CadeauDto, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    liste,
    loading,
    erreur,
    showModal,
    editingObjet,
    formData,
    navigate,
    handleToggleFavoris,
    handleToggleOffrir,
    handleDeleteObjet,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange
  };
};
