import { DefiRepository } from '@/defi/ports/defi.repository';
import { Defi } from '../recupererListeDefis.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface QuestionApiModel {
  id: string;
  question: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: string[];
  points: number;
  reponse: string[];
  categorie: string;
}

export class DefiRepositoryAxios implements DefiRepository {
  @intercept401()
  async envoyerReponse(utilisateurId: string, defiId: string, reponse: string[]): Promise<void> {
    const axios = AxiosFactory.getInstance().axiosBack;
    await axios.put(`/utilisateurs/${utilisateurId}/questionsKYC/${defiId}`, { reponse });
  }
  @intercept401()
  async recupererDefi(defiId: string, utilisateurId: string): Promise<Defi> {
    const response = await AxiosFactory.getInstance().axiosBack.get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC/${defiId}`,
    );

    return {
      id: response.data.id,
      libelle: response.data.question,
      type: response.data.type,
      reponses_possibles: response.data.reponses_possibles || [],
      points: response.data.points,
      reponse: response.data.reponse,
    };
  }
  @intercept401()
  async recupererDefis(utilisateurId: string): Promise<Defi[]> {
    const response = await AxiosFactory.getInstance().axiosBack.get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/questionsKYC`,
    );
    return response.data
      .filter(question => question.categorie === 'defi')
      .map(question => ({
        id: question.id,
        libelle: question.question,
        type: question.type,
        reponses_possibles: question.reponses_possibles || [],
        points: question.points,
        reponse: question.reponse,
      }));
  }
}
