import { BilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface BilanThematiquePresenter {
  presenteBilanThematique(bilan: BilanThematique, thematique: ClefThematiqueAPI): void;
}
