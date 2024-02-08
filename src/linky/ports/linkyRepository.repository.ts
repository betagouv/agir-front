import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export interface LinkyRepository {
  recupererConsommationElectrique(idUtilsateur: string): Promise<ConsommationElectrique[]>;
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur>;
}
