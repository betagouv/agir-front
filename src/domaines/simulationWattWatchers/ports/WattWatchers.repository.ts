export interface WattWatchersRepository {
  inscriptionParPrm(utilisateurId: string, prm: string, nom: string): Promise<void>;
}
