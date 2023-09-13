import { AxiosFactory } from "@/axios.factory";
import { Quiz, QuizRepository } from "@/quiz/ports/quizRepository";
import { AxiosResponse } from "axios";

interface ReponsesQuizCMSModel {
  id: string;
  reponse: string;
  exact: boolean;
}
interface QuestionsQuizCMSModel {
  id: string;
  libelle: string;
  reponses: ReponsesQuizCMSModel[];
  explicationOk: string;
  explicationKO: string;
}

export interface QuiCMSAttributesModel {
  titre: string;
  questions: QuestionsQuizCMSModel[];
}
export interface QuizCMSDataModel {
  attributes: QuiCMSAttributesModel;
}

export interface QuizCMSModel {
  data: QuizCMSDataModel;
}
export class QuizRepositoryCMSAxios implements QuizRepository {
  async getQuiz(idQuizz: string): Promise<Quiz> {
    try {
      const axiosInstance = AxiosFactory.getCMSAxios();
      const response: AxiosResponse<QuizCMSModel> = await axiosInstance.get<QuizCMSModel>(
        `quizzes/${idQuizz}?populate[0]=questions&populate[1]=questions.reponses`
      );
      return {
        titre: response.data.data.attributes.titre,
        questions: response.data.data.attributes.questions.map((question, index) => {
          return {
            id: question.id,
            intitule: question.libelle,
            reponsesPossibles: question.reponses.map((r) => r.reponse),
            ordre: (index + 1).toString(),
            texteExplication: question.explicationKO,
            solution: question.reponses.filter((r) => r.exact)[0].reponse,
          };
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
