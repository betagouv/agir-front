import { SuiviRepository } from '@/suivi/ports/suivi.repository';
import { SuiviDuJourPresenter } from '@/suivi/ports/suiviDuJour.presenter';

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
  constructor(private suiviRepository: SuiviRepository) {}

  private isListeDesValeursVide(listeDesValeurs: Map<string, string>): boolean {
    return listeDesValeurs.size === 0;
  }

  async execute(
    suiviAlimentation: SuiviAlimentationInput,
    suiviTransport: SuiviTransportInput,
    presenter: SuiviDuJourPresenter,
    idUtilisateur: string
  ): Promise<void> {
    if (!this.isListeDesValeursVide(suiviAlimentation.valeurs)) {
      await this.suiviRepository.ajouter('alimentation', suiviAlimentation.valeurs, idUtilisateur);
    }
    if (!this.isListeDesValeursVide(suiviTransport.valeurs)) {
      await this.suiviRepository.ajouter('transport', suiviTransport.valeurs, idUtilisateur);
    }
    const resultat = await this.suiviRepository.recupererResultat(idUtilisateur);
    if (resultat) {
      presenter.presente(resultat);
    }
  }
}
