import {
  NouveauParcoursPresenter,
  NouveauParcoursViewModel,
} from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class NouveauParcoursPresenterImpl implements NouveauParcoursPresenter {
  constructor(private readonly viewModel: (nouveauParcoursViewModel: NouveauParcoursViewModel) => void) {}

  displayNouveauParcours(nouveauParcours: NouveauParcours): void {
    this.viewModel({
      nombreInscrits: nouveauParcours.nombreInscrits,
      nombrePointsMoyen: Math.round(nouveauParcours.nombrePointsMoyen),
      nombreArticlesLocaux: nouveauParcours.nombreArticlesLocaux,
      nombreArticlesTotal: nouveauParcours.nombreArticlesTotal,
      nombreDefiEnCours: nouveauParcours.nombreDefiEnCours,
      nombreDefiRealises: nouveauParcours.nombreDefiRealises,
      propositions: [
        {
          emoji: '📺',
          titre: 'Mes achats',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              valeur: nouveauParcours.longueVieAuxObjets.reparer,
              singulier: 'point de réparation',
              pluriel: 'points de réparations',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              valeur: nouveauParcours.longueVieAuxObjets.louer,
              singulier: 'point de location',
              pluriel: 'points de locations',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              valeur: nouveauParcours.longueVieAuxObjets.emprunter,
              singulier: "point d'emprunt",
              pluriel: "points d'emprunts",
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              valeur: nouveauParcours.longueVieAuxObjets.donner,
              singulier: 'point de don',
              pluriel: 'points de dons',
            },
            {
              template: valeurEtGroupePronominal => `Pour un ensemble de ${valeurEtGroupePronominal}`,
              valeur: nouveauParcours.longueVieAuxObjets.tout,
              singulier: 'point responsable',
              pluriel: 'points responsables',
            },
            {
              template: valeurEtGroupePronominal => `Et ${valeurEtGroupePronominal} pour la consommation`,
              valeur: nouveauParcours.thematiques.nombre_aides_consommation,
              singulier: 'aide recensée',
              pluriel: 'aides recensées',
            },
          ]),
          articles: nouveauParcours.articles.filter(article => article.thematique === ClefThematiqueAPI.consommation),
        },
        {
          emoji: '🍛',
          titre: 'Me nourrir',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              valeur: nouveauParcours.presDeChezNous.circuitCourt,
              singulier: 'point de circuit court',
              pluriel: 'points de circuit court',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              valeur: nouveauParcours.presDeChezNous.epicerieSuperette,
              singulier: 'épicerie ou supérette',
              pluriel: 'épiceries ou supérettes',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              valeur: nouveauParcours.presDeChezNous.marcheLocal,
              singulier: 'marché local',
              pluriel: 'marchés locaux',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} zéro-déchet à proximité`,
              valeur: nouveauParcours.presDeChezNous.zeroDechet,
              singulier: 'point',
              pluriel: 'points',
            },
            {
              template: valeurEtGroupePronominal => `Et ${valeurEtGroupePronominal} pour l'alimentation`,
              valeur: nouveauParcours.thematiques.nombre_aides_alimentation,
              singulier: 'aide recensée',
              pluriel: 'aides recensées',
            },
          ]),
          articles: nouveauParcours.articles.filter(article => article.thematique === ClefThematiqueAPI.alimentation),
        },
        {
          emoji: '🚲',
          titre: 'Me déplacer',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} aux transports`,
              valeur: nouveauParcours.thematiques.nombre_aides_transport,
              singulier: 'aide dédiée',
              pluriel: 'aides dédiées',
            },
          ]),
          articles: nouveauParcours.articles.filter(article => article.thematique === ClefThematiqueAPI.transports),
        },
        {
          emoji: '🧱',
          titre: 'Me loger',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} pour le logement`,
              valeur: nouveauParcours.thematiques.nombre_aides_logement,
              singulier: 'aide dédiée',
              pluriel: 'aides dédiées',
            },
          ]),
          articles: nouveauParcours.articles.filter(article => article.thematique === ClefThematiqueAPI.logement),
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

        const valeurAffichee = valeur === 200 ? 'plus de 200' : valeur;
        const valeurEnGrasEtSonGroupePronominal = `<span class="fr-text--bold">${valeurAffichee}</span> ${this.gererPluriel(
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
