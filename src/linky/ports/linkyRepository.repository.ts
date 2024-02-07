import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export interface LinkyRepository {
  recupererConsommationElectrique(
    idUtilsateur: string,
    comparaisonParAnnee: boolean
  ): Promise<ConsommationElectrique[]>;
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur>;
}
