import { Bibliotheque } from '../ports/bibliotheque.repository';
import { BibliothequePresenter, BibliothequeViewModel } from '@/domaines/bibliotheque/ports/bibliotheque.presenter';
import { buildUrl } from '@/shell/buildUrl';

export class BibliothequePresenterImpl implements BibliothequePresenter {
  constructor(private readonly bibliothequeViewModel: (viewModel: BibliothequeViewModel) => void) {}

  presente(bibliotheque: Bibliotheque): void {
    const nombresArticle = bibliotheque.ressources.length;

    this.bibliothequeViewModel({
      phraseNombreArticles: `${nombresArticle} article${nombresArticle > 1 ? 's' : ''}`,
      articles: bibliotheque.ressources.map(ressource => ({
        idDuContenu: ressource.idDuContenu,
        titre: ressource.titre,
        thematique: ressource.thematique,
        description: ressource.description,
        url: `/article/${buildUrl(ressource.titre)}/${ressource.idDuContenu}`,
        image: ressource.image,
        favoris: ressource.favoris,
      })),
      filtres: bibliotheque.filtresThematiques.map(filtre => ({
        id: filtre.id,
        label: filtre.label,
        checked: false,
      })),
    });
  }
}
