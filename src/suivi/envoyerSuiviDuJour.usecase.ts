export interface SuiviAlimentationInput {
  valeurs: Map<string, string>;
}
export interface SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>);
  recupererResultat(): Resultat;
}
export interface SuiviTransportInput {
  valeurs: Map<string, string>;
}

export interface Resultat {
  valeur: string;
  enHausse: boolean;
}

export interface SuiviDuJourPresenter {
  presente(resultat: Resultat);
}
export class EnvoyerSuiviDuJourUsecase {
  private suiviRepository: SuiviRepository;
  constructor(suiviRepository: SuiviRepository) {
    this.suiviRepository = suiviRepository;
  }

  execute(suiviAlimentation: SuiviAlimentationInput, suiviTransport: SuiviTransportInput, presenter: SuiviDuJourPresenter) {
    this.suiviRepository.ajouter("alimentation", suiviAlimentation.valeurs);
    this.suiviRepository.ajouter("transport", suiviTransport.valeurs);
    const resultat = this.suiviRepository.recupererResultat();
    presenter.presente(resultat);
  }
}
