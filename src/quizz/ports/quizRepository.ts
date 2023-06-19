interface QuestionsQuiz {
  id: string;
  intitule: string;
  reponsesPossibles: string[];
}

export interface Quiz {
  titre: string;
  questions: QuestionsQuiz[];
}

export interface QuizRepository {
  getQuiz(id: number): Promise<Quiz>;
  evaluerQuiz(utilisateur: string, quizId: number, reponses: Map<string, string>): Promise<boolean>;
}
