import { ScoreQuiz } from '@/domaines/quiz/ports/quiz.repository';
import {
  ScoreActionQuizPresenter,
  ScoreActionQuizViewModel,
  ScoreConfigViewModel,
} from '@/domaines/quiz/ports/scoreActionQuiz.presenter';
import { gererPluriel } from '@/shell/gererPluriel';

export class ScoreActionQuizPresenterImpl implements ScoreActionQuizPresenter {
  constructor(private readonly viewModel: (scoreActionQuizViewModel: ScoreActionQuizViewModel) => void) {}

  presente(score: ScoreQuiz): void {
    const scoreStrategies: Record<'bas' | 'moyen' | 'haut', ScoreConfigViewModel> = {
      bas: { emoji: '😬', couleurBackground: '#FEF7F7', couleurBordure: '#FFCACA' },
      moyen: { emoji: '🙃', couleurBackground: '#FCFAED', couleurBordure: '#E1D9AA' },
      haut: { emoji: '👏', couleurBackground: '#FAFCED', couleurBordure: '#CBE1AA' },
    };

    const getScoreCategory = (score: number): keyof typeof scoreStrategies =>
      Object.entries({
        bas: score < 40,
        moyen: score >= 40 && score < 66,
        haut: score >= 66,
      }).find(([, condition]) => condition)?.[0] as keyof typeof scoreStrategies;

    const pourcentageScore = score.getPourcentage();
    const { emoji, couleurBackground, couleurBordure } = scoreStrategies[getScoreCategory(pourcentageScore)];

    this.viewModel({
      score: `${score.nombreBonnesReponses} ${gererPluriel(score.nombreBonnesReponses, 'bonne réponse', 'bonnes réponses')} sur ${score.nombreQuestions} (${pourcentageScore}%)`,
      scoreConfig: {
        emoji,
        couleurBackground,
        couleurBordure,
      },
      encouragement: 'Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
    });
  }
}
