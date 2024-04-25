import { ListeUniversPresenter } from '@/univers/ports/listeUnivers.presenter';
import { UniversRepository } from '@/univers/ports/univers.repository';

export interface Univers {
  id: number;
  nom: string;
  urlImage: string;
  nombreDeDefisRealises: number;
}
export class RecupererListeUniversUsecase {
  constructor(private universRepository: UniversRepository) {}

  async execute(presenter: ListeUniversPresenter): Promise<void> {
    const univers = await this.universRepository.recupererLaListeDesUnivers();
    presenter.present(univers);
  }
}
