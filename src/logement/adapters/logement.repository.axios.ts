import { Logement } from '@/logement/recupererInformationLogement.usecase';
import { LogementRepository } from '@/logement/ports/logement.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface LogementApiModel {
  nombre_adultes: number;
  nombre_enfants: number;
  code_postal: string;
  commune: string;
  type: string;
  superficie: string;
  proprietaire: boolean;
  chauffage: string;
  plus_de_15_ans: boolean;
  dpe: string;
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
