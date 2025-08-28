import { Question, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestion.usecase';
import { MockQuestionRepository } from './adapters/question.repository.mock';
import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';
import { RecupererProchaineKYCUsecase } from '@/domaines/kyc/recupererProchaineKYC.usecase';

describe("Tests unitaires pour 'RecupererProchaineKYC'", () => {
  it('Devrait récupérer la prochaine question et la présenter correctement', async () => {
    // GIVEN
    const prochaineQuestion: Question = {
      id: 'questionId',
      libelle: 'Question',
      type: 'choix_unique',
      points: 5,
      thematique: ThematiqueQuestion.TRANSPORT,
      reponses: {
        reponses_possibles: ['Option 1', 'Option 2'],
        reponse: [],
      },
      aEteRepondu: false,
      estObligatoire: false,
    };

    // WHEN
    const usecase = new RecupererProchaineKYCUsecase(new MockQuestionRepository(prochaineQuestion));

    // THEN
    await usecase.execute(
      'id-utilisateur',
      'id-echainement',
      'id-question-courante',
      new QuestionPresenterImpl(
        question => {
          expect(question).toEqual({
            aDejaEteRepondu: false,
            description: "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de mobilité",
            etapeCourante: 1,
            id: 'questionId',
            libelle: 'Question',
            nombreTotalDeQuestions: 10,
            points: 'Récoltez vos + 5 points',
            reponses_possibles: [],
            type: 'choix_unique',
            estObligatoire: false,
          });
        },
        finAtteinte => {
          expect(finAtteinte).toBe(false);
        },
      ),
    );
  });
  it('Si plus de question doit dire que la fin est atteinte', async () => {
    // GIVEN

    // WHEN
    const usecase = new RecupererProchaineKYCUsecase(new MockQuestionRepository(undefined));

    // THEN
    await usecase.execute(
      'id-utilisateur',
      'id-echainement',
      'id-question-courante',
      new QuestionPresenterImpl(
        question => {
          assert.fail('La question ne devrait pas être présentée');
        },
        finAtteinte => {
          expect(finAtteinte).toBe(true);
        },
      ),
    );
  });
});
