import { AxiosFactory } from "@/axios.factory.ts";
import { Quizz, QuizzRepository } from "@/quizz/ports/quizzRepository.ts";

interface EvaluerQuizzApiModel {
  resultat: boolean;
}
interface QuestionsQuizzApiModel {
  id: string;
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
            id: question.id,
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

  async evaluerQuizz(utilisateur: string, idQuizz: number, reponses: Map<string, string>): Promise<Boolean> {
    const axiosInstance = AxiosFactory.getAxios();
    const array: Record<string, string>[] = Array.from(reponses, ([key, value]) => ({ [key]: value }));

    const axiosResponse = await axiosInstance.post<EvaluerQuizzApiModel>(`/quizz/${idQuizz}/evaluer`, {
      utilisateur,
      reponses: array,
    });
    console.log(axiosResponse.data);
    return axiosResponse.data.resultat;
  }
}
