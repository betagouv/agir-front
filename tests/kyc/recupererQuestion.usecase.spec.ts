import { MockQuestionRepository } from './adapters/question.repository.mock';
import {
  RecupererQuestionUsecase,
  ReponseKYCSimple,
  ReponseMosaic,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestion.usecase';
import { QuestionPresenterImpl, QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
import { expect } from 'vitest';

describe('Fichier de tests pour récuperer une question KYC', () => {
  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type libre", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
      type: 'libre',
      points: 10,
      thematique: ThematiqueQuestion.ALIMENTATION,
      reponses: {
        reponses_possibles: [],
        reponse: [],
      } as ReponseKYCSimple,
      aEteRepondu: false,
      estObligatoire: false,
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute(
      'utilisateurId',
      'questionId',
      new QuestionPresenterImpl(expectation, finAtteinte => expect(finAtteinte).toBeFalsy()),
    );

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        etapeCourante: 1,
        nombreTotalDeQuestions: 1,
        id: 'questionId',
        libelle: 'Une question',
        sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
        type: 'libre',
        reponses_possibles: [],
        points: 'Récoltez vos + 10 points',
        aDejaEteRepondu: false,
        description: "Ces informations permettent à <i>J'agis</i> de mieux comprendre vos habitudes alimentaires",
        estObligatoire: false,
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type choix_multiple", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
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
      estObligatoire: true,
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute(
      'utilisateurId',
      'questionId',
      new QuestionPresenterImpl(expectation, finAtteinte => {
        expect(finAtteinte).toBeFalsy();
      }),
    );

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        etapeCourante: 1,
        nombreTotalDeQuestions: 1,
        id: 'questionId',
        libelle: 'Une question',
        sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
        type: 'choix_multiple',
        points: 'Récoltez vos + 10 points',
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
        estObligatoire: true,
        description:
          "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de gestion des déchets et d'alimentation",
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type choix_unique", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
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
      estObligatoire: false,
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute(
      'utilisateurId',
      'questionId',
      new QuestionPresenterImpl(expectation, finAtteinte => expect(finAtteinte).toBeFalsy()),
    );

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        etapeCourante: 1,
        nombreTotalDeQuestions: 1,
        id: 'questionId',
        libelle: 'Une question',
        sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
        points: 'Récoltez vos + 10 points',
        type: 'choix_unique',
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
        estObligatoire: false,
        description: "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de mobilité",
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type mosaic_boolean", async () => {
    // GIVEN
    const questionRepository = new MockQuestionRepository({
      id: 'questionId',
      libelle: 'Une question',
      type: 'mosaic_boolean',
      sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
      points: 10,
      thematique: ThematiqueQuestion.TRANSPORT,
      reponses: {
        reponse: [
          {
            code: '1',
            image_url: 'image_url',
            label: '1',
            valeur: true,
            emoji: '🚅',
          },
          {
            code: '2',
            image_url: 'image_url',
            label: '2',
            valeur: false,
            emoji: '🚅',
          },
        ],
      } as ReponseMosaic<boolean>,
      aEteRepondu: false,
      estObligatoire: false,
    });

    // WHEN
    const usecase = new RecupererQuestionUsecase(questionRepository);
    await usecase.execute(
      'utilisateurId',
      'questionId',
      new QuestionPresenterImpl(expectation, finAtteinte => expect(finAtteinte).toBeFalsy()),
    );

    // THEN
    function expectation(viewModel: QuestionViewModel) {
      expect(viewModel).toStrictEqual<QuestionViewModel>({
        etapeCourante: 1,
        nombreTotalDeQuestions: 1,
        id: 'questionId',
        libelle: 'Une question',
        sousLibelle: 'Un sous libellé pour indiquer plus amples détails',
        points: 'Récoltez vos + 10 points',
        type: 'mosaic_boolean',
        reponses_possibles: [
          {
            id: '1',
            label: '1',
            checked: true,
            picto: 'image_url',
            emoji: '🚅',
          },
          {
            id: '2',
            label: '2',
            checked: false,
            picto: 'image_url',
            emoji: '🚅',
          },
        ],
        aDejaEteRepondu: false,
        description: "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de mobilité",
        estObligatoire: false,
      });
    }
  });
});
