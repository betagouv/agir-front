interface QuestionsQuiz {
  ordre: string;
  id: string;
  intitule: string;
  reponsesPossibles: string[];
  texteExplicationOK: string;
  texteExplicationKO: string;
  solution: string;
}

export enum QuizDifficulte {
  TRES_FACILE = 1,
  FACILE = 2,
  MOYEN = 3,
  DIFFICILE = 4,
  TRES_DIFFICILE = 5,
}
export interface Quiz {
  titre: string;
  difficulte: QuizDifficulte;
  questions: QuestionsQuiz[];
  thematique: string;
  nombreDePointsAGagner: number;
}

export interface QuizRepository {
  getQuiz(id: string): Promise<Quiz>;
  terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void>;
  noterQuiz(quizId, utilisateurId, note): Promise<void>;
}
