import {
  DonneesCollectivitesPresenter,
  DonneesCollectivitesViewModel,
} from '@/domaines/collectivites/ports/donneesCollectivites.presenter';
import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class DonneesCollectivitesPresenterImpl implements DonneesCollectivitesPresenter {
  constructor(private readonly viewModel: (donneesCollectivitesViewModel: DonneesCollectivitesViewModel) => void) {}

  displayDonneesCollectivites(donneesCollectivites: DonneesCollectivites, codePostal: string): void {
    this.viewModel({
      codePostal,
      nombreInscrits: donneesCollectivites.nombreInscrits,
      nombrePointsMoyen: Math.round(donneesCollectivites.nombrePointsMoyen),
      nombreArticlesLocaux: donneesCollectivites.nombreArticlesLocaux,
      nombreArticlesTotal: donneesCollectivites.nombreArticlesTotal,
      nombreDefiEnCours: donneesCollectivites.nombreDefiEnCours,
      nombreDefiRealises: donneesCollectivites.nombreDefiRealises,
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
          aides: donneesCollectivites.aidesLocales.filter(aide =>
            aide.thematiques.includes(ClefThematiqueAPI.consommation),
          ),
          articles: donneesCollectivites.articles.filter(
            article => article.thematique === ClefThematiqueAPI.consommation,
          ),
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
          aides: donneesCollectivites.aidesLocales.filter(aide =>
            aide.thematiques.includes(ClefThematiqueAPI.alimentation),
          ),
          articles: donneesCollectivites.articles.filter(
            article => article.thematique === ClefThematiqueAPI.alimentation,
          ),
        },
        {
          emoji: '🚲',
          titre: 'Me déplacer',
          lien: '#',
          contenu: this.genererListe([]),
          nombreDAides: donneesCollectivites.thematiques.nombre_aides_transport,
          aides: donneesCollectivites.aidesLocales.filter(aide =>
            aide.thematiques.includes(ClefThematiqueAPI.transports),
          ),
          articles: donneesCollectivites.articles.filter(
            article => article.thematique === ClefThematiqueAPI.transports,
          ),
        },
        {
          emoji: '🧱',
          titre: 'Me loger',
          lien: '#',
          contenu: this.genererListe([]),
          nombreDAides: donneesCollectivites.thematiques.nombre_aides_logement,
          aides: donneesCollectivites.aidesLocales.filter(aide =>
            aide.thematiques.includes(ClefThematiqueAPI.logement),
          ),
          articles: donneesCollectivites.articles.filter(article => article.thematique === ClefThematiqueAPI.logement),
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
