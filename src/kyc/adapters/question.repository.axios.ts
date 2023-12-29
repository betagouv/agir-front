import { QuestionRepository } from '@/kyc/ports/question.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Question } from '@/kyc/recupererQuestionUsecase';

interface QuestionApiModel {
  id: string;
  question: string;
  type: 'ouvert' | 'choix_multiple' | 'choix_unique';
  choix: string[];
}

export class QuestionRepositoryAxios implements QuestionRepository {
  @intercept401()
  async recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC/${questionId}`
    );

    return {
      id: response.data.id,
      libelle: response.data.question,
      type: response.data.type,
      choix: response.data.choix,
    };
  }
}
