import { Response } from 'redaxios';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Quiz, QuizRepository } from '@/domaines/quiz/ports/quizRepository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface QuizApiModel {
  content_id: string;
  article_contenu: string;
  article_id: string;
  titre: string;
  thematique_principale: ClefThematiqueAPI;
  duree: string;
  points: number;
  sousTitre: string;
  difficulty: number;
  questions: [
    {
      libelle: string;
      explicationOk: string;
      explicationKO: string;
      reponses: [
        {
          reponse: string;
          exact: boolean;
        },
      ];
    },
  ];
}

export class QuizRepositoryAxios implements QuizRepository {
  @intercept401()
  async noterQuiz(quizId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'like',
      number_value: note,
      content_id: quizId,
      content_type: 'quizz',
    });
  }

  @intercept401()
  async getQuiz(idQuizz: string, idUtilisateur: string): Promise<Quiz> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<QuizApiModel> = await axiosInstance.get<QuizApiModel>(
      `/utilisateurs/${idUtilisateur}/bibliotheque/quizz/${idQuizz}`,
    );
    return mapQuizApiResponse(response);
  }

  async getPrevisualisationQuiz(idQuiz: string): Promise<Quiz> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<QuizApiModel> = await axiosInstance.get<QuizApiModel>(`/bibliotheque/quizz/${idQuiz}`);
    return mapQuizApiResponse(response);
  }

  @intercept401()
  async terminerQuiz(idUtilisateur: string, idQuiz: string, score: number): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/bibliotheque/quizz/${idQuiz}`, {
      pourcent: score,
    });
  }
}

function mapQuizApiResponse(reponse: Response<QuizApiModel>): Quiz {
  return mapQuizApi(reponse.data);
}

export function mapQuizApi(quizApiModel: QuizApiModel): Quiz {
  return {
    titre: quizApiModel.titre,
    questions: quizApiModel.questions.map((question, index) => {
      return {
        intitule: question.libelle,
        reponsesPossibles: question.reponses.map(r => r.reponse),
        ordre: (index + 1).toString(),
        texteExplicationOK: question.explicationOk,
        texteExplicationKO: question.explicationKO,
        solution: question.reponses.filter(r => r.exact)[0].reponse,
      };
    }),
    clefThematiqueAPI: quizApiModel.thematique_principale,
    difficulte: quizApiModel.difficulty,
    nombreDePointsAGagner: quizApiModel.points,
    articleAssocie:
      quizApiModel.article_id !== null
        ? {
            id: quizApiModel.article_id,
            contenu: quizApiModel.article_contenu,
          }
        : null,
  };
}
