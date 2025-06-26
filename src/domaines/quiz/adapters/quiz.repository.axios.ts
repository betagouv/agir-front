import { Response } from 'redaxios';
import { AxiosFactory, intercept40X } from '@/axios.factory';
import { Quiz, QuizRepository, ScoreQuiz } from '@/domaines/quiz/ports/quiz.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface QuizApiModel {
  content_id: string;
  article_contenu: string;
  article_sources: { url: string; label: string }[];
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

interface ScoreQuizApiModel {
  nombre_bonnes_reponses: number;
  nombre_quizz_done: number;
}

export class QuizRepositoryAxios implements QuizRepository {
  @intercept40X()
  async noterQuiz(quizId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'like',
      number_value: note,
      content_id: quizId,
      content_type: 'quizz',
    });
  }

  @intercept40X()
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

  @intercept40X()
  async terminerQuiz(idUtilisateur: string, idQuiz: string, score: number): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/bibliotheque/quizz/${idQuiz}`, {
      pourcent: score,
    });
  }

  @intercept40X()
  async recupererScoreActionQuiz(idUtilisateur: string, idAction: string): Promise<ScoreQuiz> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ScoreQuizApiModel>(
      `/utilisateurs/${idUtilisateur}/actions/quizz/${idAction}/score`,
    );
    return new ScoreQuiz(response.data.nombre_bonnes_reponses, response.data.nombre_quizz_done);
  }
}

function mapQuizApiResponse(reponse: Response<QuizApiModel>): Quiz {
  return mapQuizApi(reponse.data);
}

export function mapQuizApi(quizApiModel: QuizApiModel): Quiz {
  return {
    id: quizApiModel.content_id,
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
            sources: quizApiModel.article_sources,
          }
        : null,
  };
}
