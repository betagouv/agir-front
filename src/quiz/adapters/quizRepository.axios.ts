import { AxiosFactory, intercept401 } from '@/axios.factory';
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
  thematique_gamification: ThematiqueGamificationCMSModel;
  difficulty: number;
  points: number;
}
export interface QuizCMSDataModel {
  attributes: QuiCMSAttributesModel;
}

export interface ThematiqueGamificationCMSModel {
  data: {
    attributes: {
      titre: string;
    };
  };
}

export interface QuizCMSModel {
  data: QuizCMSDataModel;
}
export class QuizRepositoryAxios implements QuizRepository {
  async noterQuiz(quizId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'like',
      number_value: note,
      content_id: quizId,
      content_type: 'quizz',
    });
  }
  async getQuiz(idQuizz: string): Promise<Quiz> {
    const axiosInstance = AxiosFactory.getCMSAxios();
    const response: Response<QuizCMSModel> = await axiosInstance.get<QuizCMSModel>(
      `quizzes/${idQuizz}?populate[0]=questions&populate[1]=questions.reponses&populate[2]=thematique_gamification`
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
      thematique: response.data.data.attributes.thematique_gamification.data.attributes.titre,
      difficulte: response.data.data.attributes.difficulty,
      nombreDePointsAGagner: response.data.data.attributes.points,
    };
  }

  @intercept401()
  async terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${idUtilisateur}/events`, {
      type: 'quizz_score',
      interaction_id: idInteraction,
      number_value: score,
    });
  }
}
