import { DefiPresenter } from '@/defi/ports/defi.presenter';
import { Defi } from '@/defi/recupererListeDefis.usecase';

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
}

export class DefiPresenterImpl implements DefiPresenter {
  constructor(private readonly questionViewModel: (viewModel: DefiViewModel) => void) {}

  presente(defi: Defi) {
    this.questionViewModel({
      id: defi.id,
      libelle: defi.libelle,
      points: `Récoltez vos + ${defi.points} points`,
      reponses_possibles: this.determinerReponsesPossible(defi.status),
      thematique: defi.thematique,
      description: defi.description,
      reponse: defi.status,
      astuces: defi.astuces,
      pourquoi: defi.pourquoi,
    });
  }

  private determinerReponsesPossible(
    status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait',
  ): ReponsePossible[] {
    if (status === 'en_cours') {
      return [
        { id: 'abondon', label: '❌ Abandonner' },
        { id: 'fait', label: '✅ Défi réalisé' },
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
