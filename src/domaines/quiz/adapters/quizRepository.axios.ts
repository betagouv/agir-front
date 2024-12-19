import { Response } from 'redaxios';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Quiz, QuizRepository } from '@/domaines/quiz/ports/quizRepository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

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
  thematique_gamification: ThematiqueGamificationCMSModel;
  difficulty: number;
  points: number;
  articles: {
    data: [
      {
        attributes: {
          contenu: string;
        };
        id: string;
      },
    ];
  };
}
export interface QuizCMSDataModel {
  attributes: QuiCMSAttributesModel;
}

export interface ThematiqueGamificationCMSModel {
  data: {
    attributes: {
      code: ClefThematiqueAPI;
    };
  };
}

export interface QuizCMSModel {
  data: QuizCMSDataModel;
}

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
  async getQuiz(idQuizz: string, idUtilisateur: string): Promise<Quiz> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<QuizApiModel> = await axiosInstance.get<QuizApiModel>(
      `/utilisateurs/${idUtilisateur}/bibliotheque/quizz/${idQuizz}`,
    );
    return {
      titre: response.data.titre,
      questions: response.data.questions.map((question, index) => {
        return {
          intitule: question.libelle,
          reponsesPossibles: question.reponses.map(r => r.reponse),
          ordre: (index + 1).toString(),
          texteExplicationOK: question.explicationOk,
          texteExplicationKO: question.explicationKO,
          solution: question.reponses.filter(r => r.exact)[0].reponse,
        };
      }),
      clefThematiqueAPI: response.data.thematique_principale,
      difficulte: response.data.difficulty,
      nombreDePointsAGagner: response.data.points,
      articleAssocie: {
        id: response.data.article_id,
        contenu: response.data.article_contenu,
      },
    };
  }

  @intercept401()
  async terminerQuiz(idUtilisateur: string, idQuiz: string, score: number): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${idUtilisateur}/events`, {
      type: 'quizz_score',
      content_id: idQuiz,
      number_value: score,
    });
  }

  @intercept401()
  async marquerLeQuizArticleCommeLu(utilisateurId: string, articleId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_lu',
      content_id: articleId,
    });
  }
}
