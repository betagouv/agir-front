import { Empreinte } from '@/domaines/bilan/ports/empreinteRepository';

export interface ChargementEmpreintePresenter {
  presenteEmpreinte(empreinte: Empreinte): void;
}
