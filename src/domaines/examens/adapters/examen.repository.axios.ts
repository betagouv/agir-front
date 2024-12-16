import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ScoreExamen } from '@/domaines/examens/terminerExamen.usecase';

interface ScoreExamenAPIModel {
  quizz_global_score: number;
}

export class ExamenRepositoryAxios {
  @intercept401()
  async terminerExamen(idUtilisateur: string, idExamen: string): Promise<ScoreExamen> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/missions/${idExamen}/terminer`);

    const reponse = await axios.get<ScoreExamenAPIModel>(`/utilisateurs/${idUtilisateur}/missions/${idExamen}`);
    return { pourcentageDeReussite: reponse.data.quizz_global_score };
  }
}
