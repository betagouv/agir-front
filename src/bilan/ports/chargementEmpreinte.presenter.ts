import { Empreinte } from "@/bilan/ports/empreinteRepository";

export interface ChargementEmpreintePresenter {
  presenteEmpreinte(empreinte: Empreinte): void;
}
