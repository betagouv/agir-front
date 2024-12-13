import {
  NouveauParcoursPresenter,
  NouveauParcoursViewModel,
} from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

export class NouveauParcoursPresenterImpl implements NouveauParcoursPresenter {
  constructor(private readonly viewModel: (nouveauParcoursViewModel: NouveauParcoursViewModel) => void) {}

  displayNouveauParcours(nouveauParcours: NouveauParcours): void {
    this.viewModel({
      nombreInscrits: nouveauParcours.nombreInscrits,
      nombrePointsMoyen: Math.round(nouveauParcours.nombrePointsMoyen),
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
              singulier: 'point',
              pluriel: 'points',
            },
          ]),
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
          ]),
        },
        {
          emoji: '💸',
          titre: 'Vos aides',
          lien: '#',
          contenu: this.genererListe([
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              valeur: nouveauParcours.aides.nombreAidesNatTotal,
              singulier: 'aide nationale',
              pluriel: 'aides nationales',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              valeur: nouveauParcours.aides.nombreAidesRegionTotal,
              singulier: 'aide régionale',
              pluriel: 'aides régionales',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              valeur: nouveauParcours.aides.nombreAidesDepartementTotal,
              singulier: 'aide départementale',
              pluriel: 'aides départementales',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              valeur: nouveauParcours.aides.nombreAidesCommuneTotal,
              singulier: 'aide communale',
              pluriel: 'aides communales',
            },
            {
              template: valeurEtGroupePronominal => `Pour un total de ${valeurEtGroupePronominal} !`,
              valeur: nouveauParcours.aides.nombreAidesTotal,
              singulier: 'aide',
              pluriel: 'aides',
            },
          ]),
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
