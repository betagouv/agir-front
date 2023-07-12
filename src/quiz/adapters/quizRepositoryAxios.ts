import { AxiosFactory } from "@/axios.factory";
import { Quiz, QuizRepository } from "@/quiz/ports/quizRepository";

interface EvaluerQuizApiModel {
  resultat: boolean;
}
interface QuestionsQuizApiModel {
  id: string;
  libelle: string;
  propositions: string[];
  ordre: string;
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
          };
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async evaluerQuiz(utilisateur: string, idQuizz: string, reponses: Map<string, string>): Promise<boolean> {
    const axiosInstance = AxiosFactory.getAxios();
    const array: Record<string, string>[] = Array.from(reponses, ([key, value]) => ({ [key]: value }));

    const axiosResponse = await axiosInstance.post<EvaluerQuizApiModel>(`/quizz/${idQuizz}/evaluer`, {
      utilisateur,
      reponses: array,
    });
    return axiosResponse.data.resultat;
  }
}
