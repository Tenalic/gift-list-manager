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
  publique: boolean;
  urlPartage: string;
  listeObjet: CadeauDto[];
  nombreObjet: number;
  pseudoProprietaire: string;
}

export interface ListesDto {
  lisOfListesCadeaux: ListeDto[];
}

export interface DetailListeDto extends ListeDto {
  listeCadeaux: ListeDto;
  estProprietaire: boolean;
  estEnFavoris: boolean;
}
