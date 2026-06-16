// types/liste.ts

export interface CadeauDto {
  idObjet?: number;
  titre: string;
  description: string;
  url: string;
  priorite: string;
  valuePriorite?: number;
  offertPar?: string;
  estPrit?: boolean;
  detenteur?: string;
  pseudoDetenteur?: string;
}

export interface ListeDto {
  idListe: number;
  nomListe: string;
  proprietaire: string;
  partagee: boolean;
  urlPartage: string;
  listeObjet: CadeauDto[];
  pseudoProprietaire: string;
}

export interface DetailListeDto extends ListeDto {
  listeCadeaux: ListeDto;
  estProprietaire: boolean;
  estFavoris: boolean;
}
