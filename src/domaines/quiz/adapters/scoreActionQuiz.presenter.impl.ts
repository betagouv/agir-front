import { ScoreQuiz } from '@/domaines/quiz/ports/quizRepository';
import { ScoreActionQuizPresenter, ScoreActionQuizViewModel } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';

export class ScoreActionQuizPresenterImpl implements ScoreActionQuizPresenter {
  constructor(private readonly viewModel: (scoreActionQuizViewModel: ScoreActionQuizViewModel) => void) {}

  presente(score: ScoreQuiz): void {
    const emoji = score < 40 ? '😬' : score < 70 ? '🙃' : '👏';
    const couleurBackground = score < 40 ? '#FEF7F7' : score < 70 ? '#FCFAED' : '#FAFCED';
    const couleurBordure = score < 40 ? '#FFCACA' : score < 70 ? '#E1D9AA' : '#CBE1AA';

    this.viewModel({
      presentationScore: {
        phraseScore: `Vous avez obtenu un score de ${score}%`,
        emoji,
        couleurBackground,
        couleurBordure,
      },
      encouragement: 'Bravo ! Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
    });
  }
}
