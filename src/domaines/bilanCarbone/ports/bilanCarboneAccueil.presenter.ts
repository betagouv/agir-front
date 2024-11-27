import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface BilanCarboneAccueilPresenter {
  presenteBilanComplet(bilan: BilanCarbone): void;

  presenteBilanAFaire(bilan: BilanCarbone): void;
}
