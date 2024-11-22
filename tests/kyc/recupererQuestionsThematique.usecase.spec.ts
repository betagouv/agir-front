import { MockListeQuestionsRepository } from './adapters/listequestions.repository.mock';
import { RecupererQuestionsThematiqueUsecase } from '@/domaines/kyc/recupererQuestionsThematique.usecase';
import {
  ListesQuestionsThematiquePresenter,
  QuestionsViewModel,
} from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { ReponseKYCSimple, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestion.usecase';

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
          points: 10,
          thematique: ThematiqueQuestion.ALIMENTATION,
          reponses: {
            reponses_possibles: [],
            reponse: [],
          } as ReponseKYCSimple,
          aEteRepondu: false,
        },
      ]),
    );

    await usecase.execute(
      'utilisateurId',
      'thematiqueId',
      new ListesQuestionsThematiquePresenter(viewModels => {
        expect(viewModels).toStrictEqual<QuestionsViewModel>({
          phrasePointAGagner: 'Vous avez remporté 10',
          questions: [
            {
              id: 'questionId',
              libelle: 'Une question',
              type: 'libre',
              reponses_possibles: [],
              points: 'Récoltez vos + 10 points',
              aDejaEteRepondu: false,
              description:
                "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux comprendre vos habitudes alimentaires",
            },
          ],
        });
      }),
    );
  });
});
