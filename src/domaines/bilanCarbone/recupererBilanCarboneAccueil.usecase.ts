import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarboneAccueilPresenter } from '@/domaines/bilanCarbone/ports/bilanCarboneAccueil.presenter';

export class RecupererBilanCarboneAccueilUsecase {
  constructor(private readonly bilanCarboneRepository: BilanCarboneRepository) {}

  async execute(utilisateurId: string, presenter: BilanCarboneAccueilPresenter): Promise<void> {
    const bilanCarbone = await this.bilanCarboneRepository.recupererBilanCarbone(utilisateurId);

    if (bilanCarbone.bilanComplet) {
      presenter.presenteBilanComplet(bilanCarbone);
    } else {
      presenter.presenteBilanAFaire(bilanCarbone);
    }
  }
}
