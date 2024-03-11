import { Logement } from '@/logement/recupererInformationLogement.usecase';
import { LogementViewModel } from '@/logement/ports/logement.presenter';
import {
  SuperficieLogementApiModel,
  TypeLogementApiModel,
  ChauffageLogementApiModel,
  DPELogementApiModel,
} from './logement.repository.axios';

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
            value: TypeLogementApiModel.Appartement,
          },
          {
            label: 'Une maison',
            value: TypeLogementApiModel.Maison,
          },
        ],
      },
      proprietaire: {
        valeur: logement.proprietaire,
        reponsesPossibles: [
          {
            label: 'Oui',
            value: true,
          },
          {
            label: 'Non',
            value: false,
          },
        ],
      },
      superficie: {
        valeur: logement.superficie,
        reponsesPossibles: [
          { label: 'Moins de 35 m²', value: SuperficieLogementApiModel.Superficie_35 },
          { label: 'Entre 35 et 70 m²', value: SuperficieLogementApiModel.Superficie_70 },
          { label: 'Entre 70 et 100 m²', value: SuperficieLogementApiModel.Superficie_100 },
          { label: 'Entre 100 et 150 m²', value: SuperficieLogementApiModel.Superficie_150 },
          { label: 'Plus de 150 m²', value: SuperficieLogementApiModel.Superficie_150_Et_Plus },
        ],
      },
      modeDeChauffage: {
        valeur: logement.modeDeChauffage,
        reponsesPossibles: [
          { label: 'Électricité', value: ChauffageLogementApiModel.Electricite },
          { label: 'Bois / Pellets', value: ChauffageLogementApiModel.Bois },
          { label: 'Fioul', value: ChauffageLogementApiModel.Fioul },
          { label: 'Gaz', value: ChauffageLogementApiModel.Gaz },
          { label: 'Autre / Je ne sais pas', value: ChauffageLogementApiModel.Autre },
        ],
      },
      plusDeQuinzeAns: {
        valeur: logement.plusDeQuinzeAns,
        reponsesPossibles: [
          {
            label: 'Oui',
            value: true,
          },
          {
            label: 'Non',
            value: false,
          },
        ],
      },
      dpe: {
        valeur: logement.dpe,
        reponsesPossibles: [
          { label: 'A', value: DPELogementApiModel.A },
          { label: 'B', value: DPELogementApiModel.B },
          { label: 'C', value: DPELogementApiModel.C },
          { label: 'D', value: DPELogementApiModel.D },
          { label: 'E', value: DPELogementApiModel.E },
          { label: 'F', value: DPELogementApiModel.F },
          { label: 'G', value: DPELogementApiModel.G },
        ],
      },
    });
  }
}
