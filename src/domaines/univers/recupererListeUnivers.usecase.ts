import { ListeUniversPresenter } from '@/domaines/univers/ports/listeUnivers.presenter';
import { UniversRepository } from '@/domaines/univers/ports/univers.repository';

export interface Univers {
  id: string;
  nom: string;
  urlImage: string;
  nombreDeDefisRealises: number;
}
export class RecupererListeUniversUsecase {
  constructor(private universRepository: UniversRepository) {}

  async execute(idUtilisateur: string, presenter: ListeUniversPresenter): Promise<void> {
    const univers = await this.universRepository.recupererLaListeDesUnivers(idUtilisateur);
    presenter.present(univers);
  }
}
