import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface ThematiqueBilanViewModel {
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

  presenteBilanAFaire(bilan: BilanCarbone): void;
}
