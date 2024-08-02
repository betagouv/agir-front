import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface BilanCarbonePresenter {
  presente(question: BilanCarbone): void;
}
