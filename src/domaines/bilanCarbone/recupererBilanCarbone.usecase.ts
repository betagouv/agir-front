import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';

interface BilanCarboneDetail {
  label: string;
  pourcentage: number;
  impactKgAnnuel: number;
  emoji: string;
}

interface BilanCarboneDetailParUnivers {
  universId: string;
  universLabel: string;
  pourcentage: number;
  impactKgAnnuel: number;
  details: BilanCarboneDetail[];
  emoji: string;
}

export interface BilanCompletCarbone {
  impactKgAnnuel: number;
  univers: BilanCarboneDetailParUnivers[];
  top3: {
    label: string;
    emoji: string;
    pourcentage: string;
  }[];
}
export interface BilanPartielCarbone {
  pourcentageCompletionTotal: number;
  transport: { niveau: 'moyen' | 'faible' | 'fort' | 'tres-fort' };
  alimentation: { niveau: 'moyen' | 'faible' | 'fort' | 'tres-fort' };
  logement: { niveau: 'moyen' | 'faible' | 'fort' | 'tres-fort' };
  consommation: { niveau: 'moyen' | 'faible' | 'fort' | 'tres-fort' };
  universBilan: {
    contentId: string;
    label: string;
    urlImage: string;
    estTermine: boolean;
    pourcentageProgression: number;
    nombreTotalDeQuestion: number;
  }[];
}
export interface BilanCarbone {
  pourcentageCompletionTotal: number;
  bilanComplet?: BilanCompletCarbone;
  bilanPartiel?: BilanPartielCarbone;
}

export class RecupererBilanCarboneUsecase {
  constructor(private readonly bilanCarboneRepository: BilanCarboneRepository) {}

  async execute(utilisateurId: string, presenter: BilanCarbonePresenter): Promise<void> {
    const bilanCarbone = await this.bilanCarboneRepository.recupererBilanCarbone(utilisateurId);
    if (bilanCarbone.bilanComplet && bilanCarbone.pourcentageCompletionTotal === 100) {
      presenter.presenteBilanComplet(bilanCarbone.bilanComplet);
    } else {
      presenter.presenteBilanPartiel(bilanCarbone.bilanPartiel!);
    }
  }
}
