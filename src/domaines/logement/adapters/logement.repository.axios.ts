import { AxiosFactory, intercept401 } from '@/axios.factory';
import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export enum TypeLogementApiModel {
  Maison = 'maison',
  Appartement = 'appartement',
}

export enum SuperficieLogementApiModel {
  Superficie_35 = 'superficie_35',
  Superficie_70 = 'superficie_70',
  Superficie_100 = 'superficie_100',
  Superficie_150 = 'superficie_150',
  Superficie_150_Et_Plus = 'superficie_150_et_plus',
}

export enum ChauffageLogementApiModel {
  Electricite = 'electricite',
  Bois = 'bois',
  Fioul = 'fioul',
  Gaz = 'gaz',
  Autre = 'autre',
}

export enum DPELogementApiModel {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  NE_SAIS_PAS = 'ne_sais_pas',
}

export interface LogementApiModel {
  nombre_adultes: number;
  nombre_enfants: number;
  code_postal: string;
  commune: string;
  commune_label: string;
  type: TypeLogementApiModel;
  superficie: SuperficieLogementApiModel;
  proprietaire: boolean;
  chauffage: ChauffageLogementApiModel;
  plus_de_15_ans: boolean;
  dpe: DPELogementApiModel;
}

export class LogementRepositoryAxios implements LogementRepository {
  @intercept401()
  async enregistrerLesInformations(utilisateurId: string, logement: Logement): Promise<void> {
    await AxiosFactory.getAxios().patch(`utilisateurs/${utilisateurId}/logement`, {
      code_postal: logement.codePostal,
      commune: logement.commune_utilisee_dans_le_compte,
      nombre_adultes: logement.adultes,
      nombre_enfants: logement.enfants,
      type: logement.residence,
      proprietaire: logement.proprietaire,
      superficie: logement.superficie,
      plus_de_15_ans: logement.plusDeQuinzeAns,
      dpe: logement.dpe,
    });
  }

  @intercept401()
  async recupererInformation(utilisateurId: string): Promise<Logement> {
    const reponse = await AxiosFactory.getAxios().get<LogementApiModel>(`utilisateurs/${utilisateurId}/logement`);

    return {
      codePostal: reponse.data.code_postal,
      commune_utilisee_dans_le_compte: reponse.data.commune,
      commune_label: reponse.data.commune_label,
      adultes: reponse.data.nombre_adultes,
      enfants: reponse.data.nombre_enfants,
      residence: reponse.data.type,
      proprietaire: reponse.data.proprietaire,
      superficie: reponse.data.superficie,
      plusDeQuinzeAns: reponse.data.plus_de_15_ans,
      dpe: reponse.data.dpe,
    };
  }
}
