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
  latitude: number;
  longitude: number;
  numero_rue: string;
  rue: string;
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
      coordonnees: { latitude: reponse.data.latitude, longitude: reponse.data.longitude },
      numeroRue: reponse.data.numero_rue,
      rue: reponse.data.rue,
    };
  }

  @intercept401()
  async patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void> {
    const patchData: Partial<LogementApiModel> = {};

    if (logement.codePostal !== undefined) patchData.code_postal = logement.codePostal;
    if (logement.commune_utilisee_dans_le_compte !== undefined)
      patchData.commune = logement.commune_utilisee_dans_le_compte;
    if (logement.commune_label !== undefined) patchData.commune_label = logement.commune_label;
    if (logement.adultes !== undefined) patchData.nombre_adultes = logement.adultes;
    if (logement.enfants !== undefined) patchData.nombre_enfants = logement.enfants;
    if (logement.residence !== undefined) patchData.type = logement.residence;
    if (logement.proprietaire !== undefined) patchData.proprietaire = logement.proprietaire;
    if (logement.superficie !== undefined) patchData.superficie = logement.superficie;
    if (logement.plusDeQuinzeAns !== undefined) patchData.plus_de_15_ans = logement.plusDeQuinzeAns;
    if (logement.dpe !== undefined) patchData.dpe = logement.dpe;
    if (logement.coordonnees?.longitude !== undefined) patchData.longitude = logement.coordonnees.longitude;
    if (logement.coordonnees?.latitude !== undefined) patchData.latitude = logement.coordonnees.latitude;
    if (logement.numeroRue !== undefined) patchData.numero_rue = logement.numeroRue;
    if (logement.rue !== undefined) patchData.rue = logement.rue;

    await AxiosFactory.getAxios().patch(`utilisateurs/${utilisateurId}/logement`, patchData);
  }
}
