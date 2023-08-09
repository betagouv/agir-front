import { SuiviRepository } from "@/suivi/ports/suivi.repository";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export class ResultatSuiviDuJourUsecase {
  private suiviRepository: SuiviRepository;
  constructor(suiviRepository: SuiviRepository) {
    this.suiviRepository = suiviRepository;
  }

  async execute(presenter: SuiviDuJourPresenter, idUtilisateur: string): Promise<void> {
    const resultat = await this.suiviRepository.recupererResultat(idUtilisateur);
    if (resultat) {
      presenter.presente(resultat);
    }
  }
}
