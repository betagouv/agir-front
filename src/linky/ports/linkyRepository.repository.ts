import { ConsommationElectrique } from '@/linky/obtenirConsommationElectriqueAnnuelle.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export interface LinkyRepository {
  recupererConsommationElectriqueAnnuelle(idUtilsateur: string): Promise<ConsommationElectrique>;
  recupererConsommationElectriqueDerniersJours(idUtilsateur: string): Promise<ConsommationElectrique>;
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur>;
}
