import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import { ConsommationElectriqueGlobal } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

export interface ServiceRechercheLinkyRepository {
  recupererConsommationElectrique(idUtilsateur: string): Promise<ConsommationElectriqueGlobal>;
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur>;
  seDesabonner(idUtilsateur: string): Promise<void>;
}
