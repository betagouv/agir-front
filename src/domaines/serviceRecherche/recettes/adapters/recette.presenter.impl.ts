import { RecettePresenter } from '@/domaines/serviceRecherche/recettes/ports/recette.presenter';
import { Recette } from '@/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';

export interface RecetteViewModel {
  titre: string;
  image?: string;
  tempsDePreparation: string;
  description?: string;
  ingredients: string[];
  etapes: string[];
  tag?: {
    label: string;
    style: string;
  };
}
export class RecettePresenterImpl implements RecettePresenter {
  constructor(private readonly recetteViewModel: (viewModel: RecetteViewModel) => void) {}

  presente(recette: Recette): void {
    const recetteViewModel: RecetteViewModel = {
      titre: recette.titre,
      image: recette.image,
      tempsDePreparation: `Temps de préparation : ${recette.tempsDePreparation} min`,
      ingredients: recette.ingredients.map(ingredient =>
        ingredient.unite
          ? `${ingredient.quantite} ${ingredient.unite} de ${ingredient.nom}`
          : `${ingredient.quantite} ${ingredient.nom}`,
      ),
      etapes: recette.etapes,
      tag: this.determineTag(recette.difficulte),
    };

    this.recetteViewModel(recetteViewModel);
  }

  private determineTag(difficulte: string): { label: string; style: string } | undefined {
    switch (difficulte) {
      case 'Facile':
        return {
          label: 'Facile',
          style: 'background--vert-bourgeon',
        };
      case 'Intérmédiaire':
        return {
          label: 'Intermédiaire',
          style: 'background--bleu-ecume-hover',
        };
      case 'Avancé':
        return {
          label: 'Avancé',
          style: 'background--glycine',
        };
      default:
        return undefined;
    }
  }
}
