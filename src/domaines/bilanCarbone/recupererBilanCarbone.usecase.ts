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

export type NiveauImpactBilanCarbone = 'faible' | 'moyen' | 'fort' | 'tres_fort';

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
  transport: { niveau: NiveauImpactBilanCarbone };
  alimentation: { niveau: NiveauImpactBilanCarbone };
  logement: { niveau: NiveauImpactBilanCarbone };
  consommation: { niveau: NiveauImpactBilanCarbone };
}

export interface BilanCarbone {
  pourcentageCompletionTotal: number;
  bilanComplet?: BilanCompletCarbone;
  bilanPartiel?: BilanPartielCarbone;
  thematiquesBilan: ThematiquesBilan[];
}

export class RecupererBilanCarboneUsecase {
  constructor(private readonly bilanCarboneRepository: BilanCarboneRepository) {}

  async execute(utilisateurId: string, presenter: BilanCarbonePresenter): Promise<void> {
    const bilanCarbone = await this.bilanCarboneRepository.recupererBilanCarbone(utilisateurId);

    if (bilanCarbone.bilanComplet) {
      presenter.presenteBilanComplet(bilanCarbone);
    } else if (bilanCarbone.bilanPartiel) {
      presenter.presenteBilanPartiel(bilanCarbone);
    }
  }
}
