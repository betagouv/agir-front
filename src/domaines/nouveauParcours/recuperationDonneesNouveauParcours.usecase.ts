import { NouveauParcoursPresenter } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
import { NouveauParcoursRepository } from '@/domaines/nouveauParcours/ports/nouveauParcours.repository';

export interface NouveauParcours {
  nombreInscrits: number;
  nombrePointsMoyen: number;
  aides: {
    nombreAidesTotal: number;
    nombreAidesNatTotal: number;
    nombreAidesRegionTotal: number;
    nombreAidesDepartementTotal: number;
    nombreAidesCommuneTotal: number;
  };
  longueVieAuxObjets: {
    tout: number;
    donner: number;
    reparer: number;
    louer: number;
    emprunter: number;
  };
  presDeChezNous: {
    circuitCourt: number;
    epicerieSuperette: number;
    marcheLocal: number;
    zeroDechet: number;
  };
}

class RecuperationDonneesNouveauParcoursUsecase {
  constructor(private readonly nouveauParcoursRepository: NouveauParcoursRepository) {}

  async execute(codePostal: string, presenter: NouveauParcoursPresenter): Promise<void> {
    const nouveauParcours = await this.nouveauParcoursRepository.getNouveauParcours(codePostal);
    presenter.displayNouveauParcours(nouveauParcours);
  }
}
