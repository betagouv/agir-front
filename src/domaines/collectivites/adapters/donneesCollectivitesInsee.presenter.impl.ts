import {
  ArticleOuAideCollectiviteViewModel,
  DonneesCollectivitesInseePresenter,
  DonneesCollectivitesInseeViewModel,
} from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
import {
  AideOuArticleDeCollectivite,
  DonneesCollectivitesINSEE,
} from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteArticleName } from '@/router/articles/routes';

export class DonneesCollectivitesInseePresenterImpl implements DonneesCollectivitesInseePresenter {
  constructor(
    private readonly viewModel: (donneesCollectivitesViewModel: DonneesCollectivitesInseeViewModel) => void,
  ) {}

  afficherDonneesInsee(donneesCollectivites: DonneesCollectivitesINSEE) {
    const listeCommunesPourEPCI = donneesCollectivites.listeCommunesPourEPCI.join(', ');

    const indicationNombreUtilisateurs = this.genererIndicationNombreDUtilisateurs(donneesCollectivites);
    const indicationAidesEtArticles = this.genererIndicationAidesEtArticles(donneesCollectivites);

    const aides: ArticleOuAideCollectiviteViewModel[] = [
      ...this.mapToAideViewModel(donneesCollectivites.aides.nationales),
      ...this.mapToAideViewModel(donneesCollectivites.aides.regionales),
      ...this.mapToAideViewModel(donneesCollectivites.aides.departementales),
      ...this.mapToAideViewModel(donneesCollectivites.aides.locales),
    ];
    const articles: ArticleOuAideCollectiviteViewModel[] = [
      ...this.mapToArticleViewModel(donneesCollectivites.articles.regionales),
      ...this.mapToArticleViewModel(donneesCollectivites.articles.departementales),
      ...this.mapToArticleViewModel(donneesCollectivites.articles.locales),
    ];

    this.viewModel({
      nom: donneesCollectivites.nom,
      departement: donneesCollectivites.departement,
      region: donneesCollectivites.region,
      listeCommunesPourEPCI: donneesCollectivites.estEPCI ? listeCommunesPourEPCI : undefined,

      indicationNombreUtilisateurs,
      indicationAidesEtArticles,

      cartesThematiques: [
        {
          emoji: '📺',
          titre: 'Mes achats',
          aides: aides.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.consommation)),
          articles: articles.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.consommation)),
        },
        {
          emoji: '🍛',
          titre: 'Me nourrir',
          aides: aides.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.alimentation)),
          articles: articles.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.alimentation)),
        },
        {
          emoji: '🚲',
          titre: 'Me déplacer',
          aides: aides.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.transports)),
          articles: articles.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.transports)),
        },
        {
          emoji: '🧱',
          titre: 'Me loger',
          aides: aides.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.logement)),
          articles: articles.filter(aide => aide.thematiques.includes(ClefThematiqueAPI.logement)),
        },
      ],

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

    const aides = aidesDisponibles
      ? `<span class="text--bold">${aidesDisponibles}</span> ${aidesDisponibles === 1 ? 'aide' : 'aides'}`
      : undefined;
    const articles = articlesDisponibles
      ? `<span class="text--bold">${articlesDisponibles}</span> ${articlesDisponibles === 1 ? 'article' : 'articles'}`
      : undefined;

    let indicationAidesEtArticles = `<i>J'agis</i> recense ${aides}`;
    if (articlesDisponibles) {
      indicationAidesEtArticles += `, ainsi que ${articles}`;
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
      url: { name: RouteArticleName.ARTICLE_PREVISUALISATION, params: { id: article.id } },
    }));
  }
}
