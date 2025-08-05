import { AdresseHistorique } from '@/domaines/adresses/recupererHistoriqueAdresse.usecase';

export interface HistoriqueAdresseRepository {
  recupererHistoriqueAdresse(idUtilisateur: string): Promise<AdresseHistorique[]>;

  ajouterAdresseHistorique(idUtilisateur: string, adresse: AdresseHistorique): Promise<void>;

  supprimerAdresseHistorique(idUtilisateur: string, idAdresseASupprimer: string): Promise<void>;
}
