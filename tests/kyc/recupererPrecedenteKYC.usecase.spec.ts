import { RecupererPrecedenteKYCUsecase } from '@/domaines/kyc/recupererPrecedenteKYC.usecase';
import { Question, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestion.usecase';
import { MockQuestionRepository } from './adapters/question.repository.mock';
import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';

describe("Tests unitaires pour 'RecupererPrecedenteKYCUsecase'", () => {
  it('Devrait récupérer la question précédente et la présenter correctement', async () => {
    // GIVEN
    const questionPrecedente: Question = {
      id: 'questionPrecedenteId',
      libelle: 'Question précédente',
      type: 'choix_unique',
      points: 5,
      thematique: ThematiqueQuestion.TRANSPORT,
      reponses: {
        reponses_possibles: ['Option 1', 'Option 2'],
        reponse: [],
      },
      aEteRepondu: false,
    };

    // WHEN
    const usecase = new RecupererPrecedenteKYCUsecase(new MockQuestionRepository(questionPrecedente));

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
            id: 'questionPrecedenteId',
            libelle: 'Question précédente',
            nombreTotalDeQuestions: 10,
            points: 'Récoltez vos + 5 points',
            reponses_possibles: [],
            type: 'choix_unique',
          });
        },
        finAtteinte => {
          expect(finAtteinte).toBe(false);
        },
      ),
    );
  });
});
