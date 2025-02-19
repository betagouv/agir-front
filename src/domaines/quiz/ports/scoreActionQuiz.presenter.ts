import { ScoreQuiz } from '@/domaines/quiz/ports/quizRepository';

export type ScoreConfigViewModel = {
  emoji: string;
  couleurBackground: string;
  couleurBordure: string;
};

export interface ScoreActionQuizViewModel {
  phraseScore: string;
  encouragement: string;
  scoreConfig: ScoreConfigViewModel;
}

export interface ScoreActionQuizPresenter {
  presente(score: ScoreQuiz): void;
}
