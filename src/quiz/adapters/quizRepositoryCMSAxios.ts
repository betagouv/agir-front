import { AxiosFactory } from '@/axios.factory';
import { Quiz, QuizRepository } from '@/quiz/ports/quizRepository';
import { Response } from 'redaxios';

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
    const axiosInstance = AxiosFactory.getCMSAxios();
    const response: Response<QuizCMSModel> = await axiosInstance.get<QuizCMSModel>(
      `quizzes/${idQuizz}?populate[0]=questions&populate[1]=questions.reponses`
    );
    return {
      titre: response.data.data.attributes.titre,
      questions: response.data.data.attributes.questions.map((question, index) => {
        return {
          id: question.id,
          intitule: question.libelle,
          reponsesPossibles: question.reponses.map(r => r.reponse),
          ordre: (index + 1).toString(),
          texteExplicationOK: question.explicationOk,
          texteExplicationKO: question.explicationKO,
          solution: question.reponses.filter(r => r.exact)[0].reponse,
        };
      }),
    };
  }
}
