import { DefiRepository } from '@/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';

export interface Defi {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: string[];
  points: number;
  reponse: string[];
}

export class RecupererListeDefisUsecase {
  constructor(private readonly defiRepository: DefiRepository) {}

  async execute(utilisateurId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defiRepository.recupererDefis(utilisateurId);
    presenter.presente(defis.filter(defi => defi.reponse?.length > 0));
  }
}
