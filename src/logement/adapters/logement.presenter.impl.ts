import { Logement } from '@/logement/recupererInformationLogement.usecase';
import { LogementViewModel } from '@/logement/ports/logement.presenter';

export class LogementPresenterImpl {
  constructor(private logementViewModel: (viewModel: LogementViewModel) => void) {}

  presente(logement: Logement) {
    this.logementViewModel({
      codePostal: logement.codePostal,
      commune: logement.commune,
      adultes: logement.adultes,
      enfants: logement.enfants,
      residence: {
        valeur: logement.residence,
        reponsesPossibles: [
          {
            label: 'Un appartement',
            value: 'appartement',
          },
          {
            label: 'Une maison',
            value: 'maison',
          },
        ],
      },
      proprietaire: {
        valeur: logement.proprietaire,
        reponsesPossibles: [
          {
            label: 'Oui',
            value: 'oui',
          },
          {
            label: 'Non',
            value: 'non',
          },
        ],
      },
      superficie: {
        valeur: logement.superficie,
        reponsesPossibles: [
          { label: 'Moins de 35 m²', value: 'superficie_35' },
          { label: 'Entre 35 et 70 m²', value: 'superficie_70' },
          { label: 'Entre 70 et 100 m²', value: 'superficie_100' },
          { label: 'Entre 100 et 150 m²', value: 'superficie_150' },
          { label: 'Plus de 150 m²', value: 'superficie_150_et_plus' },
        ],
      },
      modeDeChauffage: {
        valeur: logement.modeDeChauffage,
        reponsesPossibles: [
          { label: 'Électricité', value: 'electricite' },
          { label: 'Bois / Pellets', value: 'bois' },
          { label: 'Fioul', value: 'fioul' },
          { label: 'Gaz', value: 'gaz' },
          { label: 'Autre / Je ne sais pas', value: 'autre' },
        ],
      },
      plusDeQuinzeAns: {
        valeur: logement.plusDeQuinzeAns,
        reponsesPossibles: [
          {
            label: 'Oui',
            value: 'oui',
          },
          {
            label: 'Non',
            value: 'non',
          },
        ],
      },
      dpe: {
        valeur: logement.dpe,
        reponsesPossibles: [
          { label: 'A', value: 'dpe_a' },
          { label: 'B', value: 'dpe_b' },
          { label: 'C', value: 'dpe_c' },
          { label: 'D', value: 'dpe_d' },
          { label: 'E', value: 'dpe_e' },
          { label: 'F', value: 'dpe_f' },
          { label: 'G', value: 'dpe_g' },
        ],
      },
    });
  }
}
