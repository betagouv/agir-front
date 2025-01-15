import {
  AideLocaleViewModel,
  ArticleLocalViewModel,
  DonneesCollectivitesPresenter,
  DonneesCollectivitesViewModel,
} from '@/domaines/collectivites/ports/donneesCollectivites.presenter';
import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteArticleName } from '@/router/articles/routes';

export class DonneesCollectivitesPresenterImpl implements DonneesCollectivitesPresenter {
  constructor(private readonly viewModel: (donneesCollectivitesViewModel: DonneesCollectivitesViewModel) => void) {}

  displayDonneesCollectivites(donneesCollectivites: DonneesCollectivites, codePostal: string): void {
    const aidesLocales: AideLocaleViewModel[] = donneesCollectivites.aidesLocales.map(aide => ({
      ...aide,
      url: { name: RouteAidesName.AIDE_PREVISUALISATION, params: { id: aide.id } },
    }));
    const filtrerAidesLocalesParThematique = (clef: ClefThematiqueAPI) =>
      aidesLocales.filter(aide => aide.thematiques.includes(clef));

    const articlesLocaux: ArticleLocalViewModel[] = donneesCollectivites.articles.map(article => ({
      ...article,
      url: { name: RouteArticleName.ARTICLE_PREVISUALISATION, params: { id: article.id } },
    }));
    const filtrerArticlesLocauxParThematique = (clef: ClefThematiqueAPI) =>
      articlesLocaux.filter(article => article.thematique === clef);

    this.viewModel({
      codePostal,
      propositions: [
        {
          emoji: '📺',
          titre: 'Mes achats',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              valeur: donneesCollectivites.longueVieAuxObjets.reparer,
              singulier: 'point de <span class="text--bold">réparation</span>',
              pluriel: 'points de <span class="text--bold">réparations</span>',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              valeur: donneesCollectivites.longueVieAuxObjets.louer,
              singulier: 'point de <span class="text--bold">location</span>',
              pluriel: 'points de <span class="text--bold">locations</span>',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              valeur: donneesCollectivites.longueVieAuxObjets.emprunter,
              singulier: "point <span class='text--bold'>d'emprunt</span>",
              pluriel: "points <span class='text--bold'>d'emprunts</span>",
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              valeur: donneesCollectivites.longueVieAuxObjets.donner,
              singulier: 'point de <span class="text--bold">don</span>',
              pluriel: 'points de <span class="text--bold">dons</span>',
            },
            {
              template: valeurEtGroupePronominal => `Pour un ensemble de ${valeurEtGroupePronominal}`,
              valeur: donneesCollectivites.longueVieAuxObjets.tout,
              singulier: 'point de consommation responsable',
              pluriel: 'points de consommations responsables',
            },
          ]),
          nombreDAides: donneesCollectivites.thematiques.nombre_aides_consommation,
          aides: filtrerAidesLocalesParThematique(ClefThematiqueAPI.consommation),
          articles: filtrerArticlesLocauxParThematique(ClefThematiqueAPI.consommation),
        },
        {
          emoji: '🍛',
          titre: 'Me nourrir',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              valeur: donneesCollectivites.presDeChezNous.circuitCourt,
              singulier: 'point de <span class="text--bold">circuit court</span>',
              pluriel: 'points de <span class="text--bold">circuit court</span>',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              valeur: donneesCollectivites.presDeChezNous.epicerieSuperette,
              singulier: '<span class="text--bold">épicerie ou supérette</span>',
              pluriel: '<span class="text--bold">épiceries ou supérettes</span>',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              valeur: donneesCollectivites.presDeChezNous.marcheLocal,
              singulier: '<span class="text--bold">marché local</span>',
              pluriel: '<span class="text--bold">marchés locaux</span>',
            },
            {
              template: valeurEtGroupePronominal =>
                `${valeurEtGroupePronominal} <span class="text--bold">zéro-déchet</span> à proximité`,
              valeur: donneesCollectivites.presDeChezNous.zeroDechet,
              singulier: 'point',
              pluriel: 'points',
            },
          ]),
          nombreDAides: donneesCollectivites.thematiques.nombre_aides_alimentation,
          aides: filtrerAidesLocalesParThematique(ClefThematiqueAPI.alimentation),
          articles: filtrerArticlesLocauxParThematique(ClefThematiqueAPI.alimentation),
        },
        {
          emoji: '🚲',
          titre: 'Me déplacer',
          lien: '#',
          contenu: [],
          nombreDAides: donneesCollectivites.thematiques.nombre_aides_transport,
          aides: filtrerAidesLocalesParThematique(ClefThematiqueAPI.transports),
          articles: filtrerArticlesLocauxParThematique(ClefThematiqueAPI.transports),
        },
        {
          emoji: '🧱',
          titre: 'Me loger',
          lien: '#',
          contenu: [],
          nombreDAides: donneesCollectivites.thematiques.nombre_aides_logement,
          aides: filtrerAidesLocalesParThematique(ClefThematiqueAPI.logement),
          articles: filtrerArticlesLocauxParThematique(ClefThematiqueAPI.logement),
        },
      ],
    });
  }

  private genererListe(
    mappingsInfo: {
      template: (valeurEtGroupePronominal: string) => string;
      valeur: number;
      singulier: string;
      pluriel: string;
    }[],
  ): string[] {
    return mappingsInfo
      .map(mapping => {
        const valeur = mapping.valeur;
        if (!valeur) {
          return null;
        }

        const valeurEnGrasEtSonGroupePronominal = `<span class="fr-text--bold">${valeur}</span> ${this.gererPluriel(
          valeur,
          mapping.singulier,
          mapping.pluriel,
        )}`;
        return mapping.template(valeurEnGrasEtSonGroupePronominal);
      })
      .filter((entry): entry is string => entry !== null);
  }

  private gererPluriel(nombre: number, singulier: string, pluriel: string): string {
    return `${nombre === 1 ? singulier : pluriel}`;
  }
}
