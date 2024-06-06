import { Defi } from '@/domaines/defi/recupererDefisEnCoursOuAFaire.usecase';

export interface DefiRepository {
  recupererDefi(defiId: string, utilisateurId: string): Promise<Defi>;
  recupererDefisEnCoursOuAFaire(utilisateurId: string): Promise<Defi[]>;
  recupererTousLesDefis(utilisateurId: string): Promise<Defi[]>;
  envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication?: string): Promise<void>;
  recupererListeDefisParUnivers(utilisateurId: string, universId: string): Promise<Defi[]>;
}
