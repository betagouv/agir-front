import { BilanCompletCarbone, BilanPartielCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface ThematiquesBilan {
  contentId: string;
  label: string;
  urlImage: string;
  estTermine: boolean;
  pourcentageProgression: number;
  nombreTotalDeQuestion: number;
  nomDeLunivers: string;
  clefUnivers: string;
}

export interface BilanCarbonePresenter {
  presenteBilanComplet(bilan: BilanCompletCarbone): void;
  presenteBilanPartiel(bilan: BilanPartielCarbone): void;
}
