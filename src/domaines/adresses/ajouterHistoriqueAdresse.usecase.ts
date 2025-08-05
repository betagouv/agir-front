import { HistoriqueAdresseRepository } from '@/domaines/adresses/ports/historiqueAdresse.repository';
import { AdresseHistorique } from '@/domaines/adresses/recupererHistoriqueAdresse.usecase';

export class AjouterHistoriqueAdresseUsecase {
  constructor(private readonly historiqueAdresseRepository: HistoriqueAdresseRepository) {}

  execute(idUtilisateur: string, adresse: AdresseHistorique): Promise<void> {
    return this.historiqueAdresseRepository.ajouterAdresseHistorique(idUtilisateur, adresse);
  }
}
