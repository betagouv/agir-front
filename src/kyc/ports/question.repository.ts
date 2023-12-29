import { Question } from '@/kyc/recupererQuestionUsecase';

export interface QuestionRepository {
  recupererQuestion(questionId: string, utilisateurId: string): Promise<Question>;
}
