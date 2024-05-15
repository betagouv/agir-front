import { DefiPresenter } from '@/domaines/defi/ports/defi.presenter';
import { Defi } from '@/domaines/defi/recupererListeDefis.usecase';

export interface ReponsePossible {
  id: string;
  label: string;
}
export interface DefiViewModel {
  id: string;
  libelle: string;
  reponses_possibles: ReponsePossible[];
  points: string;
  thematique: string;
  description: string;
  reponse: string;
  astuces: string;
  pourquoi: string;
  explicationRefus?: string;
}

export class DefiPresenterImpl implements DefiPresenter {
  constructor(private readonly questionViewModel: (viewModel: DefiViewModel) => void) {}

  presente(defi: Defi) {
    this.questionViewModel({
      id: defi.id,
      libelle: defi.libelle,
      points: defi.points.toLocaleString(),
      reponses_possibles: this.determinerReponsesPossible(defi.status),
      thematique: defi.thematique,
      description: defi.description,
      reponse: defi.status,
      astuces: defi.astuces,
      pourquoi: defi.pourquoi,
      explicationRefus: defi.explicationRefus,
    });
  }

  private determinerReponsesPossible(
    status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait',
  ): ReponsePossible[] {
    if (status === 'en_cours' || status === 'abondon') {
      return [
        { id: 'fait', label: '🏆 Défi réalisé' },
        { id: 'en_cours', label: '⏱️ Je relance le défi' },
        { id: 'abondon', label: '❌ Abandonner' },
      ];
    } else if (status === 'fait') {
      return [{ id: 'deja_fait', label: '✅ Déjà fait' }];
    }

    return [
      { id: 'en_cours', label: '👍 Défi accepté' },
      { id: 'pas_envie', label: '👎 Pas envie' },
      { id: 'deja_fait', label: '✅ Déjà fait' },
    ];
  }
}
