import { RecettePresenter } from '@/domaines/serviceRecherche/recettes/ports/recette.presenter';
import { ServiceRechercheRecettesRepository } from '@/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.repository';

export interface Recette {
  titre: string;
  image?: string;
  tempsDePreparation: number;
  ingredients: {
    nom: string;
    quantite: string;
    unite?: string;
  }[];
  etapes: string[];
  difficulte: string;
}
export class RecupererDetailServiceRecettesUsecase {
  constructor(private readonly repository: ServiceRechercheRecettesRepository) {}

  async execute(utilisateurId: string, recetteId: string, recettePresenter: RecettePresenter) {
    const recette = await this.repository.recupererDetailRecette(utilisateurId, recetteId);
    recettePresenter.presente(recette);
  }
}
