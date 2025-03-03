import {
  ActionClassiqueViewModel,
  ActionPresenter,
  ActionQuizzesViewModel,
} from '@/domaines/actions/ports/action.presenter';
import { ActionDetail } from '@/domaines/actions/ports/actions.repository';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';

export class ActionPresenterImpl implements ActionPresenter {
  constructor(
    private readonly actionClassiqueViewModel: (viewModel: ActionClassiqueViewModel) => void,
    private readonly actionQuizViewModel: (viewModel: ActionQuizzesViewModel) => void,
  ) {}

  async presenteActionClassique(action: ActionDetail) {
    const [titre, sousTitre, astuces, introduction] = await Promise.all([
      marked.parseInline(action.titre),
      marked.parseInline(action.sousTitre ?? ''),
      marked.parse(action.corps.astuces ?? ''),
      marked.parse(action.corps.introduction ?? ''),
    ]);

    this.actionClassiqueViewModel({
      titre,
      titreAffiche: titre,
      sousTitre,
      commune: action.commune,
      corps: {
        astuces,
        introduction,
      },
      recommandations: action.recommandations,
      services: action.services,
      aides: action.aides.map(aide => ({
        titre: aide.titre,
        titreUrl: buildUrl(aide.titre),
        id: aide.id,
        partenaireNom: aide.partenaireNom,
      })),
    });
  }

  async presenteActionQuiz(action: ActionDetail) {
    const [titre, sousTitre] = await Promise.all([
      marked.parseInline(action.titre),
      marked.parseInline(action.sousTitre ?? ''),
    ]);

    this.actionQuizViewModel({
      titre,
      titreAffiche: `Quiz - ${titre}`,
      sousTitre,
      quizzes: action.quizzes!.map(quiz => {
        return {
          id: quiz.id,
          nombreDePointsAGagner: quiz.nombreDePointsAGagner.toString(),
          titre: quiz.titre,
          question: {
            intitule: quiz.questions[0].intitule,
            reponsesPossibles: quiz.questions[0].reponsesPossibles.map(reponse => ({
              label: reponse,
              value: reponse,
            })),
            ordre: quiz.questions[0].ordre,
            texteExplicationOK: quiz.questions[0].texteExplicationOK,
            texteExplicationKO: quiz.questions[0].texteExplicationKO,
            solution: quiz.questions[0].solution,
          },
          articleAssocie: quiz.articleAssocie,
        };
      }),
      quizzFelicitations: action.quizzFelicitations,
      recommandations: action.recommandations,
    });
  }
}
