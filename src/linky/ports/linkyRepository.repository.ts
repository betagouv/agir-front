import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export interface LinkyRepository {
  recupererConsommationElectrique(idUtilsateur: string): Promise<ConsommationElectrique[]>;
  recupererConsommationElectriqueDerniersJours(idUtilsateur: string): Promise<void>;
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur>;
}
