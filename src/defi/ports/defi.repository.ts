import { Defi } from '@/defi/recupererListeDefis.usecase';

export interface DefiRepository {
  recupererDefi(defiId: string, utilisateurId: string): Promise<Defi>;
  recupererDefis(utilisateurId: string): Promise<Defi[]>;

  envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication?: string): Promise<void>;
  recupererListeDefisParUnivers(utilisateurId: string, universId: string): Promise<Defi[]>;
}
