import {
  ArticleOuAideCollectiviteViewModel,
  DonneesCollectivitesInseePresenter,
  DonneesCollectivitesInseeViewModel,
} from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
import {
  AideOuArticleDeCollectivite,
  DonneesCollectivitesINSEE,
} from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { RouteAidesName } from '@/router/aides/routeAidesName';

export class DonneesCollectivitesInseePresenterImpl implements DonneesCollectivitesInseePresenter {
  constructor(
    private readonly viewModel: (donneesCollectivitesViewModel: DonneesCollectivitesInseeViewModel) => void,
  ) {}

  // TODO: enlever param insee ?
  afficherDonneesInsee(donneesCollectivites: DonneesCollectivitesINSEE, insee: string) {
    const listeCommunesPourEPCI = donneesCollectivites.listeCommunesPourEPCI.join(', ');

    const indicationNombreUtilisateurs = this.genererIndicationNombreDUtilisateurs(donneesCollectivites);
    const indicationAidesEtArticles = this.genererIndicationAidesEtArticles(donneesCollectivites);

    this.viewModel({
      nom: donneesCollectivites.nom,
      departement: donneesCollectivites.departement,
      region: donneesCollectivites.region,
      listeCommunesPourEPCI: donneesCollectivites.estEPCI ? listeCommunesPourEPCI : undefined,

      indicationNombreUtilisateurs,
      indicationAidesEtArticles,

      aides: this.retirerCategoriesVides([
        {
          titre: 'Les aides nationales',
          id: 'aides-nationales',
          contenu: this.mapToAideViewModel(donneesCollectivites.aides.nationales),
        },
        {
          titre: 'Les aides régionales',
          id: 'aides-regionales',
          contenu: this.mapToAideViewModel(donneesCollectivites.aides.regionales),
        },
        {
          titre: 'Les aides départementales',
          id: 'aides-departementales',
          contenu: this.mapToAideViewModel(donneesCollectivites.aides.departementales),
        },
        {
          titre: 'Les aides locales',
          id: 'aides-locales',
          contenu: this.mapToAideViewModel(donneesCollectivites.aides.locales),
        },
      ]),
      articles: this.retirerCategoriesVides([
        {
          titre: 'Les articles régionaux',
          id: 'articles-regionaux',
          contenu: this.mapToArticleViewModel(donneesCollectivites.articles.regionales),
        },
        {
          titre: 'Les articles départementaux',
          id: 'articles-departementaux',
          contenu: this.mapToArticleViewModel(donneesCollectivites.articles.departementales),
        },
        {
          titre: 'Les articles locaux',
          id: 'articles-locaux',
          contenu: this.mapToArticleViewModel(donneesCollectivites.articles.locales),
        },
      ]),
      nombreDeDefi: {
        enCours: donneesCollectivites.nombreDefisEnCours,
        realises: donneesCollectivites.nombreDefisRealises,
      },
      nombreInscrits: {
        total: donneesCollectivites.nombreInscrits,
        local: donneesCollectivites.nombreInscritsLocaux,
      },
    });
  }

  private genererIndicationAidesEtArticles(donneesCollectivites: DonneesCollectivitesINSEE) {
    const aidesDisponibles =
      donneesCollectivites.aides.nationales.length +
      donneesCollectivites.aides.regionales.length +
      donneesCollectivites.aides.departementales.length +
      donneesCollectivites.aides.locales.length;
    const articlesDisponibles =
      donneesCollectivites.articles.regionales.length +
      donneesCollectivites.articles.departementales.length +
      donneesCollectivites.articles.locales.length;

    let indicationAidesEtArticles = `<i>J'agis</i> recense <span class="text--bold">${aidesDisponibles}</span> aides`;
    if (articlesDisponibles) {
      indicationAidesEtArticles += `, ainsi que <span class="text--bold">${articlesDisponibles}</span> articles`;
    }
    indicationAidesEtArticles += ` pour vos habitants !`;
    return indicationAidesEtArticles;
  }

  private genererIndicationNombreDUtilisateurs(donneesCollectivites: DonneesCollectivitesINSEE) {
    if (donneesCollectivites.nombreInscritsLocaux === 0) {
      return `La collectivité ne compte <span class="text--bold">aucun</span> utilisateur inscrit à hauteur des <span class="text--bold">${donneesCollectivites.nombreInscrits}</span> inscrits.`;
    }

    if (donneesCollectivites.nombreInscritsLocaux === 1) {
      return `La collectivité dispose d'<span class="text--bold">un</span> utilisateur inscrit à hauteur des <span class="text--bold">${donneesCollectivites.nombreInscrits}</span> inscrits.`;
    }

    return `La collectivité dispose de <span class="text--bold">${donneesCollectivites.nombreInscritsLocaux}</span> utilisateurs inscrits parmi les <span class="text--bold">${donneesCollectivites.nombreInscrits}</span> utilisateurs.`;
  }

  private mapToAideViewModel(aides: AideOuArticleDeCollectivite[]): ArticleOuAideCollectiviteViewModel[] {
    return aides.map(aide => ({
      ...aide,
      url: { name: RouteAidesName.AIDE_PREVISUALISATION, params: { id: aide.id } },
    }));
  }

  private mapToArticleViewModel(articles: AideOuArticleDeCollectivite[]): ArticleOuAideCollectiviteViewModel[] {
    return articles.map(article => ({
      ...article,
      url: { name: RouteAidesName.AIDE_PREVISUALISATION, params: { id: article.id } },
    }));
  }

  private retirerCategoriesVides(aides) {
    return aides.filter(aide => aide.contenu && aide.contenu.length > 0);
  }
}
