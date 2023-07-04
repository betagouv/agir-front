import { SuiviRepository } from "@/suivi/ports/suivi.repository";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export interface SuiviAlimentationInput {
  valeurs: Map<string, string>;
}

export interface SuiviTransportInput {
  valeurs: Map<string, string>;
}

export interface Resultat {
  valeur: string;
  enHausse: boolean;
}

export class EnvoyerSuiviDuJourUsecase {
  private suiviRepository: SuiviRepository;
  constructor(suiviRepository: SuiviRepository) {
    this.suiviRepository = suiviRepository;
  }

  execute(suiviAlimentation: SuiviAlimentationInput, suiviTransport: SuiviTransportInput, presenter: SuiviDuJourPresenter, idUtilisateur: string) {
    this.suiviRepository.ajouter("alimentation", suiviAlimentation.valeurs, idUtilisateur);
    this.suiviRepository.ajouter("transport", suiviTransport.valeurs, idUtilisateur);
    const resultat = this.suiviRepository.recupererResultat();
    presenter.presente(resultat);
  }
}
