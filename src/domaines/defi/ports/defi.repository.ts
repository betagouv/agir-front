import { Defi } from '@/domaines/defi/defi';

export interface DefiRepository {
  recupererDefi(defiId: string, utilisateurId: string): Promise<Defi>;
  recupererTousLesDefis(utilisateurId: string): Promise<Defi[]>;
  envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication?: string): Promise<void>;
  recupererListeDefisParThematique(utilisateurId: string, thematiqueId: string): Promise<Defi[]>;
}
