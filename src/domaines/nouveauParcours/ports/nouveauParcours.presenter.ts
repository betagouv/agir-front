import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

export interface NouveauParcoursViewModel {
  nombreInscrits: number;
  nombrePointsMoyen: number;
  propositions: {
    emoji: string;
    titre: string;
    contenu: string[];
    lien: string;
  }[];
}

export interface NouveauParcoursPresenter {
  displayNouveauParcours(nouveauParcours: NouveauParcours): void;
}
