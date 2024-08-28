import { ServiceRechercheRecettesPresenter } from '@/domaines/serviceRecherche/ports/serviceRechercheRecettes.presenter';
import { ServiceRechercheRecettesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheRecettes.repository';
import { ServiceRechercheBase } from '@/domaines/serviceRecherche/serviceRecherche';

interface ServiceRechercheRecettesResultat {
  id: string;
  titre: string;
  difficulte: string;
  img: string;
  nombreFavoris: number;
  tempsDePreparation: number;
  typeDePlat: string;
}

export interface ServiceRechercheRecettes extends ServiceRechercheBase {
  suggestions: ServiceRechercheRecettesResultat[];
  favoris: ServiceRechercheRecettesResultat[];
}

export class RecupererServiceRecettesUsecase {
  constructor(private serviceRechercheRecettesRepository: ServiceRechercheRecettesRepository) {}

  async execute(
    idUtilisateur: string,
    typeRecette: string,
    recupererServiceRechercheRecettesPresenter: ServiceRechercheRecettesPresenter,
  ) {
    const service = await this.serviceRechercheRecettesRepository.recupererService(idUtilisateur, typeRecette);
    recupererServiceRechercheRecettesPresenter.presente(service);
  }
}
