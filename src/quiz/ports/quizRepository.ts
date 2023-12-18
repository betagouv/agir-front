interface QuestionsQuiz {
  ordre: string;
  id: string;
  intitule: string;
  reponsesPossibles: string[];
  texteExplicationOK: string;
  texteExplicationKO: string;
  solution: string;
}

export interface Quiz {
  titre: string;
  questions: QuestionsQuiz[];
  thematique: string;
}

export interface QuizRepository {
  getQuiz(id: string): Promise<Quiz>;
  terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void>;
}
