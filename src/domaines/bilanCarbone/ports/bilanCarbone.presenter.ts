import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface ThematiquesBilan {
  contentId: string;
  label: string;
  urlImage: string;
  estTermine: boolean;
  pourcentageProgression: number;
  nombreTotalDeQuestion: number;
  clefUnivers: string;
}

export interface BilanCarbonePresenter {
  presenteBilanComplet(bilan: BilanCarbone): void;
  presenteBilanPartiel(bilan: BilanCarbone): void;
}
