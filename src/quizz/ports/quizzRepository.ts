interface QuestionsQuizz {
  id: string;
  intitule: string;
  reponsesPossibles: string[];
}

export interface Quizz {
  titre: string;
  questions: QuestionsQuizz[];
}

export interface QuizzRepository {
  getQuizz(id: number): Promise<Quizz>;
  evaluerQuizz(utilisateur: string, quizzId: number, reponses: Map<string, string>): Promise<boolean>;
}
