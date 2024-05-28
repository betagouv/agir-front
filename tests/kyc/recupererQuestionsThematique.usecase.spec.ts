import { MockListeQuestionsRepository } from './adapters/listequestions.repository.mock';
import { RecupererQuestionsThematiqueUsecase } from '@/domaines/kyc/recupererQuestionsThematique.usecase';
import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
import { ListesQuestionsThematiquePresenter } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

describe('Fichier de tests concernant la recupérations des questions kyc pour une thématique', () => {
  it('En donnant un id utilisateur et id de thematique doit presenter les kyc de le thématique', async () => {
    // GIVEN

    // WHEN
    const usecase = new RecupererQuestionsThematiqueUsecase(
      new MockListeQuestionsRepository([
        {
          id: 'questionId',
          libelle: 'Une question',
          type: 'libre',
          reponses_possibles: [],
          points: 10,
          reponse: [],
          thematique: 'ALIMENTATION',
        },
      ]),
    );

    await usecase.execute(
      'utilisateurId',
      'thematiqueId',
      new ListesQuestionsThematiquePresenter(viewModels => {
        expect(viewModels).toStrictEqual<QuestionViewModel[]>([
          {
            id: 'questionId',
            libelle: 'Une question',
            type: 'libre',
            reponses: [],
            reponses_possibles: [],
            points: 'Récoltez vos + 10 points',
            aDejaEteRepondu: false,
            description:
              'Dites-nous en plus sur vous pour que le service vous recommande des actions plus personnalisées.',
          },
        ]);
      }),
    );
  });
});
