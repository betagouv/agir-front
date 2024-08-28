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

export interface BilanCarbone {
  impactKgAnnuel: number;
  univers: BilanCarboneDetailParUnivers[];
  top3: {
    label: string;
    emoji: string;
    pourcentage: string;
  }[];
}

export class RecupererBilanCarboneUsecase {
  constructor(private readonly bilanCarboneRepository: BilanCarboneRepository) {}

  async execute(utilisateurId: string, presenter: BilanCarbonePresenter): Promise<void> {
    const bilanCarbone = await this.bilanCarboneRepository.recupererBilanCarbone(utilisateurId);
    presenter.presente(bilanCarbone);
  }
}
