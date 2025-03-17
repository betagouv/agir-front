import { BilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';

export interface BilanThematiquePresenter {
  presenteBilanThematique(bilan: BilanThematique): void;
}
