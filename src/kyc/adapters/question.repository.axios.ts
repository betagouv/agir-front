import { QuestionRepository } from '@/kyc/ports/question.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Question } from '@/kyc/recupererQuestionUsecase';

interface QuestionApiModel {
  id: string;
  question: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: string[];
  points: number;
  reponse: string[];
  categorie: string;
}

export class QuestionRepositoryAxios implements QuestionRepository {
  @intercept401()
  async recupererListeQuestions(utilisateurId: string): Promise<Question[]> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/questionsKYC`,
    );
    return response.data
      .filter(question => question.categorie !== 'defi')
      .map(question => ({
        id: question.id,
        libelle: question.question,
        type: question.type,
        reponses_possibles: question.reponses_possibles || [],
        points: question.points,
        reponse: question.reponse,
      }));
  }

  @intercept401()
  async recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC/${questionId}`,
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
  async envoyerReponse(utilisateurId: string, questionId: string, reponse: string[]): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.put(`/utilisateurs/${utilisateurId}/questionsKYC/${questionId}`, { reponse });
  }
}
