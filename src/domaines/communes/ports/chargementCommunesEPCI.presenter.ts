import { CommunesEPCI } from '@/domaines/communes/ports/communeRepository';

export interface CommunesEPCIViewModel {
  listeDeCommunes: CommunesEPCI;
  message: string;
}

export interface ChargementCommunesEPCIPresenter {
  presente(communes: CommunesEPCI): void;
}
