import { Logement } from '@/logement/recupererInformationLogement.usecase';
import { LogementRepository } from '@/logement/ports/logement.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface LogementApiModel {
  nombre_adultes: number;
  nombre_enfants: number;
  code_postal: string;
  commune: string;
  type: 'maison' | 'appartement';
  superficie: 'superficie_35' | 'superficie_70' | 'superficie_100' | 'superficie_150' | 'superficie_150_et_plus';
  proprietaire: boolean;
  chauffage: 'electricite' | 'bois' | 'fioul' | 'gaz' | 'autre';
  plus_de_15_ans: boolean;
  dpe: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export class LogementRepositoryAxios implements LogementRepository {
  @intercept401()
  async recupererInformation(utilisateurId: string): Promise<Logement> {
    const reponse = await AxiosFactory.getAxios().get<LogementApiModel>(`utilisateurs/${utilisateurId}/logement`);

    return {
      codePostal: reponse.data.code_postal,
      commune: reponse.data.commune,
      adultes: reponse.data.nombre_adultes,
      enfants: reponse.data.nombre_enfants,
      residence: reponse.data.type,
      proprietaire: reponse.data.proprietaire ? 'oui' : 'non',
      superficie: reponse.data.superficie,
      modeDeChauffage: reponse.data.chauffage,
      plusDeQuinzeAns: reponse.data.plus_de_15_ans ? 'oui' : 'non',
      dpe: reponse.data.dpe,
    };
  }
}
