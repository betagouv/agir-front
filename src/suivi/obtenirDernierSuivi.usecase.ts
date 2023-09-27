import { DernierSuivi, SuiviRepository } from '@/suivi/ports/suivi.repository';

export interface DernierSuiviPresenter {
  presente(suivi: DernierSuivi);
}
export class ObtenirDernierSuiviUsecase {
  private suiviRepository: SuiviRepository;
  constructor(suiviRepository: SuiviRepository) {
    this.suiviRepository = suiviRepository;
  }

  async execute(idUtilisateur: string, typeDeSuivi: string, presenter: DernierSuiviPresenter): Promise<void> {
    const dernierSuivi = await this.suiviRepository.recupererDernierSuivi(idUtilisateur, typeDeSuivi);
    if (dernierSuivi) {
      presenter.presente(dernierSuivi);
    }
  }
}
