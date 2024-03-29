import { MockQuestionRepository } from './adapters/question.repository.mock';
import { RecupererQuestionUsecase } from '@/kyc/recupererQuestionUsecase';
import { QuestionPresenterImpl, QuestionViewModel } from '@/kyc/adapters/question.presenter.impl';

describe('Fichier de tests pour récuperer une question KYC', () => {
  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type libre", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'libre',
      reponses_possibles: [],
      points: 10,
      reponse: [],
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute('utilisateurId', 'questionId', new QuestionPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        id: 'questionId',
        libelle: 'Une question',
        type: 'libre',
        reponses: [],
        reponses_possibles: [],
        points: 'Récoltez vos + 10 points',
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type choix_multiple", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'choix_multiple',
      reponses_possibles: ['1', '2', '3'],
      points: 10,
      reponse: [],
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute('utilisateurId', 'questionId', new QuestionPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        id: 'questionId',
        libelle: 'Une question',
        type: 'choix_multiple',
        points: 'Récoltez vos + 10 points',
        reponses: [],
        reponses_possibles: [
          {
            id: '1',
            label: '1',
          },
          {
            id: '2',
            label: '2',
          },
          {
            id: '3',
            label: '3',
          },
        ],
      });
    }
  });
  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type choix_unique", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'choix_unique',
      reponses_possibles: ['1', '2', '3'],
      points: 10,
      reponse: [],
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute('utilisateurId', 'questionId', new QuestionPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        id: 'questionId',
        libelle: 'Une question',
        points: 'Récoltez vos + 10 points',
        type: 'choix_unique',
        reponses: [],
        reponses_possibles: [
          {
            id: '1',
            label: '1',
          },
          {
            id: '2',
            label: '2',
          },
          {
            id: '3',
            label: '3',
          },
        ],
      });
    }
  });
});
