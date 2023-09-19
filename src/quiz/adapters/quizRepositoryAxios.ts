import { AxiosFactory } from "@/axios.factory";
import { Quiz, QuizRepository } from "@/quiz/ports/quizRepository";

interface QuestionsQuizApiModel {
  id: string;
  libelle: string;
  propositions: string[];
  ordre: string;
  texte_riche_explication: string;
  solution: string;
}

export interface QuizApiModel {
  titre: string;
  questions: QuestionsQuizApiModel[];
}

export class QuizRepositoryAxios implements QuizRepository {
  async getQuiz(idQuizz: string): Promise<Quiz> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<QuizApiModel>(`/quizz/${idQuizz}`);
      return {
        titre: response.data.titre,
        questions: response.data.questions.map((question) => {
          return {
            id: question.id,
            intitule: question.libelle,
            reponsesPossibles: question.propositions,
            ordre: question.ordre,
            texteExplicationOK: question.texte_riche_explication,
            texteExplicationKO: question.texte_riche_explication,
            solution: question.solution,
          };
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
