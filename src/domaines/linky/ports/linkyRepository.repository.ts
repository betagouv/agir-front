import { InformationCompteur } from '@/domaines/linky/obtenirInformationCompteur.usecase';

export interface ConsommationElectrique {
  commentaires: string[];
  data: {
    valeur: number;
    mois: string;
    annee: string;
    date: string;
  }[];
}

export interface LinkyRepository {
  recupererConsommationElectriqueAnnuelle(idUtilsateur: string): Promise<ConsommationElectrique>;
  recupererConsommationElectriqueQuatorzeJours(idUtilsateur: string): Promise<ConsommationElectrique>;
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur>;
  marqueLeServiceCommeConsulte(idUtilsateur: string): Promise<void>;
}
