import { MockQuestionRepository } from './adapters/question.repository.mock';
import {
  ReponseKYCSimple,
  RecupererQuestionUsecase,
  ThematiqueQuestion,
  ReponseMosaic,
} from '@/domaines/kyc/recupererQuestion.usecase';
import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';
import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

describe('Fichier de tests pour récuperer une question KYC', () => {
  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type libre", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'libre',
      points: 10,
      thematique: ThematiqueQuestion.ALIMENTATION,
      reponses: {
        reponses_possibles: [],
        reponse: [],
      } as ReponseKYCSimple,
      aEteRepondu: false,
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
          "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux comprendre vos habitudes alimentaires",
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type choix_multiple", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'choix_multiple',
      points: 10,
      reponses: {
        reponse: [
          {
            code: '1',
            label: '1',
            estSelectionnee: true,
          },
          {
            code: '2',
            label: '2',
            estSelectionnee: false,
          },
          {
            code: '3',
            label: '3',
            estSelectionnee: true,
          },
        ],
      },
      thematique: ThematiqueQuestion.DECHET,
      aEteRepondu: false,
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
            checked: true,
          },
          {
            id: '2',
            label: '2',
            checked: false,
          },
          {
            id: '3',
            label: '3',
            checked: true,
          },
        ],
        aDejaEteRepondu: false,
        description:
          "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de gestion des déchets et d'alimentation",
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type choix_unique", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'choix_unique',
      points: 10,
      thematique: ThematiqueQuestion.TRANSPORT,
      reponses: {
        reponse: [
          {
            code: '1',
            label: '1',
            estSelectionnee: true,
          },
          {
            code: '2',
            label: '2',
            estSelectionnee: false,
          },
          {
            code: '3',
            label: '3',
            estSelectionnee: false,
          },
        ],
      },

      aEteRepondu: false,
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
            checked: true,
          },
          {
            id: '2',
            label: '2',
            checked: false,
          },
          {
            id: '3',
            label: '3',
            checked: false,
          },
        ],
        aDejaEteRepondu: false,
        description:
          "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de mobilité",
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type mosaic_boolean", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'mosaic_boolean',
      points: 10,
      thematique: ThematiqueQuestion.TRANSPORT,
      reponses: {
        reponse: [
          {
            code: '1',
            image_url: 'image_url',
            label: '1',
            valeur: true,
            emoji: '🚗',
          },
          {
            code: '2',
            image_url: 'image_url',
            label: '2',
            valeur: false,
            emoji: '🚲',
          },
        ],
      } as ReponseMosaic<boolean>,
      aEteRepondu: false,
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
        type: 'mosaic_boolean',
        reponses: ['true', 'false'],
        reponses_possibles: [
          {
            id: '1',
            label: '1',
            checked: true,
            picto: 'image_url',
            emoji: '🚗',
          },
          {
            id: '2',
            label: '2',
            checked: false,
            picto: 'image_url',
            emoji: '🚲',
          },
        ],
        aDejaEteRepondu: false,
        description:
          "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de mobilité",
      });
    }
  });
});
