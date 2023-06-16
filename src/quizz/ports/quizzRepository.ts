interface QuestionsQuizz {
  intitule: string;
  reponsesPossibles: string[];
}

export interface Quizz {
  titre: string;
  questions: QuestionsQuizz[];
}

export interface QuizzRepository {
  getQuizz(id: number): Promise<Quizz>;
}
