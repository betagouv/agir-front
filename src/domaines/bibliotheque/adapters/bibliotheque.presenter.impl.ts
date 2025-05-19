import { Bibliotheque } from '../ports/bibliotheque.repository';
import { BibliothequePresenter, BibliothequeViewModel } from '@/domaines/bibliotheque/ports/bibliotheque.presenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';
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
        thematique: {
          label: MenuThematiques.getThematiqueData(ressource.thematique).labelDansLeMenu,
          style: this.tweakTagStyle(ressource.thematique),
        },
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

  tweakTagStyle(clefTechniqueAPI: string): TagStyle {
    const tagThematique = TagThematique.getTagThematiqueUtilitaire(clefTechniqueAPI);
    return {
      backgroundColor: '#D2E9FF',
      color: '#021952',
      emoji: tagThematique.emoji,
    };
  }
}
