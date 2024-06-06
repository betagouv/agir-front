import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/domaines/defi/ports/listeDefis.presenter';

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
  nombreDePersonnes: number;
}

export class RecupererTousLesDefisUsecase {
  constructor(private readonly defiRepository: DefiRepository) {}

  async execute(utilisateurId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defiRepository.recupererTousLesDefis(utilisateurId);
    presenter.presente(defis);
  }
}
