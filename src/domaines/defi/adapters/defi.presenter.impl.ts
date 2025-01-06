import { Defi } from '@/domaines/defi/defi';
import { DefiPresenter } from '@/domaines/defi/ports/defi.presenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';

export interface ReponsePossible {
  id: string;
  label: string;
}

export interface DefiViewModel {
  id: string;
  libelle: string;
  reponses_possibles: ReponsePossible[];
  points: string;
  thematiqueTag: { label: string; style: TagStyle };
  description: string;
  reponse: string;
  astuces: string;
  pourquoi: string;
  explicationRefus?: string;
  afficherNombreDePersonnes: boolean;
  nombreDePersonnes: number;
}

export class DefiPresenterImpl implements DefiPresenter {
  constructor(private readonly questionViewModel: (viewModel: DefiViewModel) => void) {}

  presente(defi: Defi) {
    this.questionViewModel({
      id: defi.id,
      libelle: defi.libelle,
      points: defi.points.toLocaleString(),
      reponses_possibles: this.determinerReponsesPossible(defi.status),
      thematiqueTag: {
        label: MenuThematiques.getThematiqueData(defi.thematique).labelDansLeMenu,
        style: TagThematique.getTagThematiqueUtilitaire(defi.thematique),
      },
      description: defi.description,
      reponse: defi.status,
      astuces: this.determinerParagrapheVide(defi.astuces),
      pourquoi: this.determinerParagrapheVide(defi.pourquoi),
      explicationRefus: defi.explicationRefus,
      afficherNombreDePersonnes: defi.nombreDePersonnes > 2,
      nombreDePersonnes: defi.nombreDePersonnes,
    });
  }

  private determinerReponsesPossible(
    status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait',
  ): ReponsePossible[] {
    if (status === 'en_cours' || status === 'abondon') {
      return [
        { id: 'fait', label: '<span aria-hidden="true">🏆</span> Défi réalisé' },
        { id: 'abondon', label: '<span aria-hidden="true">👎</span> Finalement, pas pour moi' },
      ];
    } else if (status === 'fait') {
      return [{ id: 'deja_fait', label: '<span aria-hidden="true">✅</span> Déjà fait' }];
    }

    return [
      { id: 'en_cours', label: '<span aria-hidden="true">👍</span> Je relève le défi' },
      { id: 'pas_envie', label: '<span aria-hidden="true">👎</span> Pas pour moi' },
    ];
  }

  private determinerParagrapheVide(html: string) {
    return html !== '<p></p>' ? html : '';
  }
}
