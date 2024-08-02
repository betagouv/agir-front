import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';

interface BilanCarboneDetailParUnivers {
  universId: string;
  universLabel: string;
  pourcentage: number;
  impactKgAnnuel: number;
}

export interface BilanCarbone {
  impactKgAnnuel: number;
  details: BilanCarboneDetailParUnivers[];
}

export class RecupererBilanCarboneUsecase {
  constructor(private readonly bilanCarboneRepository: BilanCarboneRepository) {}

  async execute(utilisateurId: string, presenter: BilanCarbonePresenter): Promise<void> {
    const bilanCarbone = await this.bilanCarboneRepository.recupererBilanCarbone(utilisateurId);
    presenter.presente(bilanCarbone);
  }
}
