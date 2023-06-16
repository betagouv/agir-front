import { AxiosFactory } from "@/axios.factory.ts";
import { Quizz, QuizzRepository } from "@/quizz/ports/quizzRepository.ts";

interface QuestionsQuizzApiModel {
  libelle: string;
  propositions: string[];
}

export interface QuizzApiModel {
  titre: string;
  questions: QuestionsQuizzApiModel[];
}

export class QuizzRepositoryAxios implements QuizzRepository {
  async getQuizz(idQuizz: number): Promise<Quizz> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<QuizzApiModel>(`/quizz/${idQuizz}`);
      return {
        titre: response.data.titre,
        questions: response.data.questions.map((question) => {
          return {
            intitule: question.libelle,
            reponsesPossibles: question.propositions,
          };
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
