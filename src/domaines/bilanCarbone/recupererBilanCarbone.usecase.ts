import { BilanCarbonePresenter, ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
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
  universBilan: ThematiquesBilan[];
}
export interface BilanPartielCarbone {
  pourcentageCompletionTotal: number;
  transport: { niveau: 'moyen' | 'faible' | 'fort' | 'tres_fort' };
  alimentation: { niveau: 'moyen' | 'faible' | 'fort' | 'tres_fort' };
  logement: { niveau: 'moyen' | 'faible' | 'fort' | 'tres_fort' };
  consommation: { niveau: 'moyen' | 'faible' | 'fort' | 'tres_fort' };
  universBilan: ThematiquesBilan[];
}
export interface BilanCarbone {
  // bilanCompletEstDispo: boolean;
  pourcentageCompletionTotal: number;
  bilanComplet?: BilanCompletCarbone;
  bilanPartiel?: BilanPartielCarbone;
}

export class RecupererBilanCarboneUsecase {
  constructor(private readonly bilanCarboneRepository: BilanCarboneRepository) {}

  async execute(utilisateurId: string, presenter: BilanCarbonePresenter): Promise<void> {
    const bilanCarbone = await this.bilanCarboneRepository.recupererBilanCarbone(utilisateurId);

    if (bilanCarbone.bilanComplet) {
      presenter.presenteBilanComplet(bilanCarbone.bilanComplet);
    } else if (bilanCarbone.bilanPartiel) {
      presenter.presenteBilanPartiel(bilanCarbone.bilanPartiel);
    }
  }
}
