import { Recette } from '@/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';

export interface RecettePresenter {
  presente(recette: Recette): void;
}
