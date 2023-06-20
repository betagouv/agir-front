import { Empreinte } from "@/empreinte/ports/empreinteRepository.ts";

export interface ChargementEmpreintePresenter {
  presenteEmpreinte(empreinte: Empreinte): void;
}
