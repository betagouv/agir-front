import { ServiceRechercheBase } from '@/domaines/serviceRecherche/catalogue/serviceRecherche';
import { ServiceRechercheRecettesPresenter } from '@/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.presenter';
import { ServiceRechercheRecettesRepository } from '@/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.repository';

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
  plusDeResultatsDisponibles: boolean;
  nombreMaxResultats: number;
  suggestions: ServiceRechercheRecettesResultat[];
  favoris: ServiceRechercheRecettesResultat[];
}

export class RecupererServiceRecettesUsecase {
  constructor(private serviceRechercheRecettesRepository: ServiceRechercheRecettesRepository) {}

  async execute(
    idUtilisateur: string,
    typeRecette: {
      categorie: string;
      sous_catagorie?: string;
    },
    nombreMaxResultats: number,
    recupererServiceRechercheRecettesPresenter: ServiceRechercheRecettesPresenter,
  ) {
    const service = await this.serviceRechercheRecettesRepository.recupererService(
      idUtilisateur,
      typeRecette,
      nombreMaxResultats,
    );

    recupererServiceRechercheRecettesPresenter.presente(service);
  }
}
