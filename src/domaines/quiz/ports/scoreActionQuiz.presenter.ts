import { ScoreQuiz } from '@/domaines/quiz/ports/quiz.repository';

export type ScoreConfigViewModel = {
  emoji: string;
  couleurBackground: string;
  couleurBordure: string;
};

export interface ScoreActionQuizViewModel {
  score: string;
  encouragement: string;
  scoreConfig: ScoreConfigViewModel;
}

export interface ScoreActionQuizPresenter {
  presente(score: ScoreQuiz): void;
}
