import { Empreinte } from "@/empreinte/ports/empreinteRepository";

export interface ChargementEmpreintePresenter {
  presenteEmpreinte(empreinte: Empreinte): void;
}
