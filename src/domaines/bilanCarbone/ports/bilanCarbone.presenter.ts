import { BilanCompletCarbone, BilanPartielCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface BilanCarbonePresenter {
  presenteBilanComplet(bilan: BilanCompletCarbone): void;
  presenteBilanPartiel(bilan: BilanPartielCarbone): void;
}
