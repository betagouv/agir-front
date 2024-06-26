import { MockQuestionRepository } from './adapters/question.repository.mock';
import { RecupererQuestionUsecase, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';
import { QuestionPresenterImpl, QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

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
      thematique: ThematiqueQuestion.ALIMENTATION,
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
        aDejaEteRepondu: false,
        description:
          'Ces informations permettent à <span class="text--italic">Agir</span> de mieux comprendre vos habitudes alimentaires',
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
      thematique: ThematiqueQuestion.DECHET,
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
        aDejaEteRepondu: false,
        description:
          'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller en matière de gestion des déchets et d\'alimentation',
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
      thematique: ThematiqueQuestion.TRANSPORT,
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
        aDejaEteRepondu: false,
        description:
          'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller en matière de mobilité',
      });
    }
  });

  it('Si une KYC a déjà été répondue aDejaEteRepondu doit être à true', async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'choix_unique',
      reponses_possibles: ['1', '2', '3'],
      points: 10,
      reponse: ['1'],
      thematique: ThematiqueQuestion.AUTRE,
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
        reponses: ['1'],
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
        aDejaEteRepondu: true,
        description: 'Dites-nous en plus sur vous pour que le service vous recommande des actions plus personnalisées.',
      });
    }
  });
});
