import { AxiosFactory, intercept401 } from '@/axios.factory';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import {
  Question,
  ReponseKYCSimple,
  ReponseMosaic,
  ReponseMultiples,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionApiModel extends QuestionMosaicBooleanApiModel {
  code: string;
  question: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier';
  reponse_unique: {
    value: string;
    unite: string;
  };
  points: number;
  reponse_multiple: [
    {
      code: string;
      label: string;
      value: string;
      emoji: string;
      image_url: string;
      unite: 'kg';
    },
  ];
  categorie: string;
  thematique: string;
  is_answered: boolean;
}

export interface QuestionMosaicBooleanApiModel {
  titre: string;
  reponses_multiples: {
    code: string;
    image_url?: string;
    label: string;
    boolean_value: boolean;
    emoji?: string;
  }[];
  is_answered: boolean;
}

export class QuestionRepositoryAxios implements QuestionRepository {
  @intercept401()
  async recupererListeQuestions(utilisateurId: string): Promise<Question[]> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/questionsKYC`,
    );
    return response.data
      .filter(question => question.categorie !== 'defi')
      .map(question => this.mapQuestionApiModelToQuestion(question));
  }

  private mapQuestionApiModelToQuestion(question: QuestionApiModel): Question {
    return {
      id: question.code,
      libelle: question.type === 'mosaic_boolean' ? question.titre : question.question,
      type: question.type,
      reponses: this.determineReponses(question),
      points: question.points,
      thematique: Object.values(ThematiqueQuestion).find(thematique => thematique === question.thematique) as
        | ThematiqueQuestion
        | ThematiqueQuestion.AUTRE,
      aEteRepondu: question.is_answered,
    };
  }

  private determineReponses(question: QuestionApiModel): ReponseKYCSimple | ReponseMosaic<boolean> | ReponseMultiples {
    if (question.type === 'mosaic_boolean') {
      return {
        reponse: question.reponses_multiples.map(reponse => ({
          code: reponse.code,
          image_url: reponse.image_url,
          label: reponse.label,
          valeur: reponse.boolean_value,
        })),
      } as ReponseMosaic<boolean>;
    } else if (question.type === 'choix_multiple' || question.type === 'choix_unique') {
      return {
        reponse: question.reponse_multiple.map(reponse => ({
          code: reponse.code,
          label: reponse.label,
          estSelectionnee: false,
        })),
      } as ReponseMultiples;
    } else {
      return {
        reponses_possibles: [question.reponse_unique.value],
        reponse: [question.reponse_unique.value],
      } as ReponseKYCSimple;
    }
  }

  @intercept401()
  async recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC_v2/${questionId}`,
    );

    return this.mapQuestionApiModelToQuestion(response.data);
  }

  @intercept401()
  async envoyerReponse(utilisateurId: string, questionId: string, reponse: string[]): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.put(`/utilisateurs/${utilisateurId}/questionsKYC/${questionId}`, { reponse });
  }

  @intercept401()
  async recupererQuestionsThematique(utilisateurId: string, thematiqueId: string): Promise<Question[]> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/thematiques/${thematiqueId}/kycs`,
    );

    return response.data.map(question => this.mapQuestionApiModelToQuestion(question));
  }

  @intercept401()
  async envoyerReponsesMultiples(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; boolean_value: boolean }[],
  ): Promise<void> {
    await AxiosFactory.getAxios().put(
      `/utilisateurs/${utilisateurId}/questionsKYC_v2/${questionId}`,
      reponses.map(reponse => ({
        code: reponse.code,
        selected: reponse.boolean_value,
      })),
    );
  }

  @intercept401()
  async recupererQuestionsDepuisMissionOnboarding(utilisateurId: string, contentId: string): Promise<Question[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<QuestionApiModel[]>(
      `/utilisateurs/${utilisateurId}/enchainementQuestionsKYC/${contentId}`,
    );

    return response.data.map((question: QuestionApiModel) => this.mapQuestionApiModelToQuestion(question));
  }
}
