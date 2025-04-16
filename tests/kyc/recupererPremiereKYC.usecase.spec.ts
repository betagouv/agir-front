import { Question, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestion.usecase';
import { MockQuestionRepository } from './adapters/question.repository.mock';
import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';
import { RecupererPremiereKYCUsecase } from '@/domaines/kyc/recupererPremiereKYC.usecase';

describe("Tests unitaires pour 'RecupererPremiereKYC'", () => {
  it('Devrait récupérer la première question et la présenter correctement', async () => {
    // GIVEN
    const premiereQuestion: Question = {
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
    };

    // WHEN
    const usecase = new RecupererPremiereKYCUsecase(new MockQuestionRepository(premiereQuestion));

    // THEN
    await usecase.execute(
      'id-utilisateur',
      'id-echainement',
      new QuestionPresenterImpl(
        question => {
          expect(question).toEqual({
            aDejaEteRepondu: false,
            description:
              "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de mobilité",
            etapeCourante: 1,
            id: 'questionId',
            libelle: 'Question',
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
