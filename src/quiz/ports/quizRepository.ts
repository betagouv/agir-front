interface QuestionsQuiz {
  ordre: string;
  id: string;
  intitule: string;
  reponsesPossibles: string[];
  texteExplication: string;
  solution: string;
}

export interface Quiz {
  titre: string;
  questions: QuestionsQuiz[];
}

export interface QuizRepository {
  getQuiz(id: string): Promise<Quiz>;
  evaluerQuiz(utilisateur: string, quizId: string, reponses: Map<string, string>): Promise<boolean>;
}
