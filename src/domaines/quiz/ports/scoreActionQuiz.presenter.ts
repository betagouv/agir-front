import { ScoreQuiz } from '@/domaines/quiz/ports/quizRepository';

export interface ScoreActionQuizViewModel {
  presentationScore: {
    emoji: string;
    phraseScore: string;
    couleurBackground: string;
    couleurBordure: string;
  };
  encouragement: string;
}

export interface ScoreActionQuizPresenter {
  presente(score: ScoreQuiz): void;
}
