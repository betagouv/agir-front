import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanThematiquePresenter } from '@/domaines/bilanCarbone/ports/bilanThematique.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class DetailBilanThematique {
  constructor(
    readonly label: string,
    readonly emoji: string,
    readonly impactAnnuelEnKg: number,
  ) {}
}

export class BilanThematique {
  constructor(
    readonly impactAnnuelEnKg: number,
    readonly details: DetailBilanThematique[],
  ) {}

  getPourcenterDetail(detail: DetailBilanThematique) {
    return Math.round((detail.impactAnnuelEnKg / this.impactAnnuelEnKg) * 100);
  }
}

export class RecupererBilanDepuisThematiqueUsecase {
  constructor(private readonly repository: BilanCarboneRepository) {}

  async execute(
    idUtilisateur: string,
    thematique: ClefThematiqueAPI,
    presenter: BilanThematiquePresenter,
  ): Promise<void> {
    const bilan = await this.repository.recupererBilanDepuisThematique(idUtilisateur, thematique);
    presenter.presenteBilanThematique(bilan, thematique);
  }
}
