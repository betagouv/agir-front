import { DefiRepository } from '@/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';

export interface Defi {
  description: string;
  thematique: string;
  id: string;
  libelle: string;
  points: number;
  status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
  astuces: string;
  pourquoi: string;
  explicationRefus?: string;
}

export class RecupererListeDefisUsecase {
  constructor(private readonly defiRepository: DefiRepository) {}

  async execute(utilisateurId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defiRepository.recupererDefis(utilisateurId);
    presenter.presente(defis);
  }
}
