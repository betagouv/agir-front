import { SuiviRepository } from "@/suivi/ports/suivi.repository";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export interface SuiviAlimentationInput {
  valeurs: Map<string, string>;
}

export interface SuiviTransportInput {
  valeurs: Map<string, string>;
}

export interface ElementSuiviCarbone {
  titre: string;
  valeur: number;
  impactCarbone: number;
}
export interface Resultat {
  impactCarbonDuJour: {
    valeur: number;
    enHausse: boolean;
    variation: number;
  };
  suivisPrecedent: {
    datesDesSuivis: string[];
    valeursDesSuivis: number[];
    moyenneDesSuivis: number;
  };
  additionCarboneDuJour: ElementSuiviCarbone[];
}

export class EnvoyerSuiviDuJourUsecase {
  private suiviRepository: SuiviRepository;
  constructor(suiviRepository: SuiviRepository) {
    this.suiviRepository = suiviRepository;
  }

  async execute(
    suiviAlimentation: SuiviAlimentationInput,
    suiviTransport: SuiviTransportInput,
    presenter: SuiviDuJourPresenter,
    idUtilisateur: string
  ): Promise<void> {
    this.suiviRepository.ajouter("alimentation", suiviAlimentation.valeurs, idUtilisateur);
    this.suiviRepository.ajouter("transport", suiviTransport.valeurs, idUtilisateur);
    const resultat = await this.suiviRepository.recupererResultat(idUtilisateur);
    presenter.presente(resultat);
  }
}
