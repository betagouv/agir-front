import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarboneDetailViewModel {
  universLabel: string;
  impactKgAnnuel: string;
  pourcentage: number;
}

export interface BilanCarboneViewModel {
  impactKgAnnuel: string;
  impactKgHebdomadaire: string;
  details: BilanCarboneDetailViewModel[];
}

enum UniversIdInterne {
  TRANSPORT = 'transport',
  ALIMENTATION = 'alimentation',
  LOGEMENT = 'logement',
  CONSOMMATION = 'consommation',
  SERVICE_SOCIETAUX = 'services_societaux',
}

export class BilanCarbonePresenterImpl implements BilanCarbonePresenter {
  constructor(private readonly bilanCarboneViewModel: (viewModel: BilanCarboneViewModel) => void) {}

  presente(bilanCarbone: BilanCarbone): void {
    const NOMBRE_SEMAINES_PAR_AN = 52;
    const pictoLabels = {
      [UniversIdInterne.TRANSPORT]: '🚙',
      [UniversIdInterne.ALIMENTATION]: '🍛',
      [UniversIdInterne.LOGEMENT]: '🏡',
      [UniversIdInterne.CONSOMMATION]: '👕',
      [UniversIdInterne.SERVICE_SOCIETAUX]: '🏥',
    };

    this.bilanCarboneViewModel({
      impactKgAnnuel: this.formateKg(bilanCarbone.impactKgAnnuel),
      impactKgHebdomadaire: this.formateKg(bilanCarbone.impactKgAnnuel / NOMBRE_SEMAINES_PAR_AN),
      details: bilanCarbone.details.map(detail => ({
        universLabel: `${pictoLabels[detail.universId] || ''} ${detail.universLabel}`,
        impactKgAnnuel: this.formateKg(detail.impactKgAnnuel),
        pourcentage: detail.pourcentage,
      })),
    });
  }

  private formateKg(nombreDeKg: number): string {
    return nombreDeKg >= 1000 ? `${(nombreDeKg / 1000).toFixed(1)} tonnes` : `${nombreDeKg.toFixed(0)} kg`;
  }
}
