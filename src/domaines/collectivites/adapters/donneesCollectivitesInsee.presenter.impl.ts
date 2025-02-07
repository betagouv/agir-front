import { SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';
import {
  ArticleOuAideCollectiviteViewModel,
  CarteThematique,
  ContenuSupplementaireCollectivitesViewModel,
  DonneesCollectivitesInseePresenter,
  DonneesCollectivitesInseeViewModel,
  IndicationGeoArticleOuAideViewModel,
} from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
import {
  AideOuArticleDeCollectivite,
  DonneesCollectivitesINSEE,
} from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteArticleName } from '@/router/articles/routes';

export class DonneesCollectivitesInseePresenterImpl implements DonneesCollectivitesInseePresenter {
  constructor(private readonly viewModel: (vm: DonneesCollectivitesInseeViewModel) => void) {}

  afficherDonneesInsee(donnees: DonneesCollectivitesINSEE, simulationVelo: SimulationVelo) {
    const scope: IndicationGeoArticleOuAideViewModel = {
      nom: donnees.nom,
      departement: donnees.departement,
      region: donnees.region,
    };
    const aides = this.transformerObjetEnViewModel(donnees.aides, RouteAidesName.AIDE_PREVISUALISATION, scope);
    const articles = this.transformerObjetEnViewModel(
      donnees.articles,
      RouteArticleName.ARTICLE_PREVISUALISATION,
      scope,
    );

    const aidesVelo = this.transformerAidesVeloEnViewModel(simulationVelo);
    const contenuSupplementaires = [aidesVelo];

    this.viewModel({
      ...scope,
      indicationNombreUtilisateurs: this.genererIndicationNombreUtilisateurs(donnees),
      indicationAidesEtArticles: this.genererIndicationAidesEtArticles(donnees),
      cartesThematiques: this.genererCartesThematiques(aides, articles, contenuSupplementaires),
      nombreInscrits: { total: donnees.nombreInscrits, local: donnees.nombreInscritsLocaux },
    });
  }

  private transformerAidesVeloEnViewModel(simulationVelo: SimulationVelo): ContenuSupplementaireCollectivitesViewModel {
    const listeAidesVelo = Object.entries(simulationVelo)
      .filter(([, aidesList]) => aidesList.length > 0)
      .map(([type, aidesList]) => {
        const maxMontant = Math.max(...aidesList.map(aide => aide.plafond));
        const typeVelo = type.charAt(0).toUpperCase() + type.slice(1);
        return `<span class="text--bold">Vélo ${typeVelo}</span>: ${aidesList.length} aide(s) jusqu'à ${maxMontant} euros.`;
      });

    return {
      emoji: '🚲',
      thematiques: [ClefThematiqueAPI.transports],
      titre: 'Les <span class="text--bold">aides vélo</span> :',
      liste: listeAidesVelo,
    };
  }

  private genererIndicationAidesEtArticles(donnees: DonneesCollectivitesINSEE): string {
    const nombreDaides = this.compterTotal(donnees.aides);
    const nombreDarticles = this.compterTotal(donnees.articles);

    const aides = nombreDaides
      ? `<span class="text--bold">${nombreDaides}</span> ${nombreDaides === 1 ? 'aide' : 'aides'}`
      : undefined;
    const articles = nombreDarticles
      ? `<span class="text--bold">${nombreDarticles}</span> ${nombreDarticles === 1 ? 'article' : 'articles'}`
      : undefined;

    let indicationAidesEtArticles = `<i>J'agis</i> recense ${aides}`;
    if (nombreDarticles) {
      indicationAidesEtArticles += `, ainsi que ${articles}`;
    }
    indicationAidesEtArticles += ` pour vos habitants !`;
    return indicationAidesEtArticles;
  }

  private genererIndicationNombreUtilisateurs(donnees: DonneesCollectivitesINSEE): string {
    const { nombreInscrits, nombreInscritsLocaux } = donnees;
    if (!nombreInscritsLocaux)
      return `La collectivité ne compte <span class="text--bold">aucun</span> utilisateur inscrit parmi les <span class="text--bold">${nombreInscrits}</span> utilisateurs.`;
    return `La collectivité compte <span class="text--bold">${nombreInscritsLocaux}</span> utilisateur(s) inscrit(s) parmi les <span class="text--bold">${nombreInscrits}</span> utilisateurs.`;
  }

  private genererCartesThematiques(
    aides: ArticleOuAideCollectiviteViewModel[],
    articles: ArticleOuAideCollectiviteViewModel[],
    contenuSupplementaires: ContenuSupplementaireCollectivitesViewModel[],
  ): CarteThematique[] {
    return [
      { emoji: '📺', titre: 'Mes achats', thematique: ClefThematiqueAPI.consommation },
      { emoji: '🍛', titre: 'Me nourrir', thematique: ClefThematiqueAPI.alimentation },
      { emoji: '🚲', titre: 'Me déplacer', thematique: ClefThematiqueAPI.transports },
      { emoji: '🧱', titre: 'Me loger', thematique: ClefThematiqueAPI.logement },
      { emoji: '☀️', titre: 'Environnement', thematique: ClefThematiqueAPI.climat },
    ].map(({ emoji, titre, thematique }) => ({
      emoji,
      titre,
      aides: aides.filter(a => a.thematiques.includes(thematique)),
      articles: articles.filter(a => a.thematiques.includes(thematique)),
      contenusSupplementaires: contenuSupplementaires.filter(a => a.thematiques.includes(thematique)),
    }));
  }

  private transformerObjetEnViewModel(
    data: Record<string, AideOuArticleDeCollectivite[]>,
    route: string,
    geographieDuContenu: IndicationGeoArticleOuAideViewModel,
  ): ArticleOuAideCollectiviteViewModel[] {
    return Object.entries(data).flatMap(([indicationGeographique, contenus]) => {
      return contenus.map(item => ({
        ...item,
        url: { name: route, params: { id: item.id } },
        indicationGeographique: this.recupererPrecisionGeographique(geographieDuContenu, indicationGeographique),
      }));
    });
  }

  private recupererPrecisionGeographique(
    geographieDuContenu: IndicationGeoArticleOuAideViewModel,
    indicationGeographique: string,
  ) {
    if (indicationGeographique === 'regionales') return geographieDuContenu.region;
    if (indicationGeographique === 'departementales') return geographieDuContenu.departement;
    if (indicationGeographique === 'locales') return geographieDuContenu.nom;
    return '🇫🇷';
  }

  private compterTotal(data: Record<string, AideOuArticleDeCollectivite[]>): number {
    return Object.values(data).flat().length;
  }
}
