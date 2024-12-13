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
          contenu: this.genererListe(nouveauParcours.longueVieAuxObjets, [
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              cle: 'reparer',
              singulier: 'point de réparation',
              pluriel: 'points de réparations',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              cle: 'louer',
              singulier: 'point de location',
              pluriel: 'points de locations',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              cle: 'emprunter',
              singulier: "point d'emprunt",
              pluriel: "points d'emprunts",
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              cle: 'donner',
              singulier: 'point de don',
              pluriel: 'points de dons',
            },
            {
              template: valeurEtGroupePronominal => `Pour un ensemble de ${valeurEtGroupePronominal}`,
              cle: 'tout',
              singulier: 'point',
              pluriel: 'points',
            },
          ]),
        },
        {
          emoji: '🍛',
          titre: 'Me nourrir',
          lien: '#',
          contenu: this.genererListe(nouveauParcours.presDeChezNous, [
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} près de chez moi`,
              cle: 'circuitCourt',
              singulier: 'point de circuit court',
              pluriel: 'points de circuit court',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} à proximité`,
              cle: 'epicerieSuperette',
              singulier: 'épicerie ou supérette',
              pluriel: 'épiceries ou supérettes',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              cle: 'marcheLocal',
              singulier: 'marché local',
              pluriel: 'marchés locaux',
            },
            {
              template: valeurEtGroupePronominal => `${valeurEtGroupePronominal} zéro-déchet à proximité`,
              cle: 'zeroDechet',
              singulier: 'point',
              pluriel: 'points',
            },
          ]),
        },
        {
          emoji: '💸',
          titre: 'Vos aides',
          lien: '#',
          contenu: this.genererListe(nouveauParcours.aides, [
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              cle: 'nombreAidesNatTotal',
              singulier: 'aide nationale',
              pluriel: 'aides nationales',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              cle: 'nombreAidesRegionTotal',
              singulier: 'aide régionale',
              pluriel: 'aides régionales',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              cle: 'nombreAidesDepartementTotal',
              singulier: 'aide départementale',
              pluriel: 'aides départementales',
            },
            {
              template: valeurEtGroupePronominal => valeurEtGroupePronominal,
              cle: 'nombreAidesCommuneTotal',
              singulier: 'aide communale',
              pluriel: 'aides communales',
            },
            {
              template: valeurEtGroupePronominal => `Pour un total de ${valeurEtGroupePronominal} !`,
              cle: 'nombreAidesTotal',
              singulier: 'aide',
              pluriel: 'aides',
            },
          ]),
        },
      ],
    });
  }

  private genererListe<T>(
    objet: T,
    mappingsInfo: {
      cle: keyof T;
      singulier: string;
      pluriel: string;
      template: (valeurEtGroupePronominal: string) => string;
    }[],
  ): string[] {
    return mappingsInfo
      .map(mapping => {
        const value = objet[mapping.cle] as number;
        if (!value) {
          return null;
        }

        const valeurAffichee = value === 200 ? 'plus de 200' : value;
        const valeurEnGrasEtSonGroupePronominal = `<span class="fr-text--bold">${valeurAffichee}</span> ${this.gererPluriel(
          value,
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
