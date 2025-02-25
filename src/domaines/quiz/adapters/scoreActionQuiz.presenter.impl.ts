import { ScoreQuiz } from '@/domaines/quiz/ports/quizRepository';
import {
  ScoreActionQuizPresenter,
  ScoreActionQuizViewModel,
  ScoreConfigViewModel,
} from '@/domaines/quiz/ports/scoreActionQuiz.presenter';

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
        moyen: score >= 40 && score < 70,
        haut: score >= 70,
      }).find(([, condition]) => condition)?.[0] as keyof typeof scoreStrategies;

    const { emoji, couleurBackground, couleurBordure } = scoreStrategies[getScoreCategory(score)];

    this.viewModel({
      score: `${score}%`,
      scoreConfig: {
        emoji,
        couleurBackground,
        couleurBordure,
      },
      encouragement: 'Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
    });
  }
}
