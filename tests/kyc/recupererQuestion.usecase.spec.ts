import { MockQuestionRepository } from './adapters/question.repository.mock';
import { RecupererQuestionUsecase } from '@/kyc/recupererQuestionUsecase';
import { QuestionPresenterImpl, QuestionViewModel } from '@/kyc/adapters/question.presenter.impl';

describe('Fichier de tests pour récuperer une question KYC', () => {
  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository();

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute('utilisateurId', 'questionId', new QuestionPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual({
        id: 'questionId',
        libelle: 'Une question',
        type: 'ouvert',
        choix: ['choix 1', 'choix 2'],
      });
    }
  });
});
