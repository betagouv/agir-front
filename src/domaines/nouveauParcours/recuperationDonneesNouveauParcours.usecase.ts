import { NouveauParcoursPresenter } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
import { NouveauParcoursRepository } from '@/domaines/nouveauParcours/ports/nouveauParcours.repository';

class RecuperationDonneesNouveauParcoursUsecase {
  constructor(private readonly nouveauParcoursRepository: NouveauParcoursRepository) {}

  async execute(codePostal: string, presenter: NouveauParcoursPresenter): Promise<void> {
    return this.nouveauParcoursRepository.getNouveauParcours();
  }
}
