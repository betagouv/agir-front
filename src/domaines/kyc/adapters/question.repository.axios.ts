import { AxiosFactory, intercept401 } from '@/axios.factory';
import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import {
  Question,
  ReponseKYCSimple,
  ReponseMosaic,
  ReponseMultiple,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestion.usecase';

export interface QuestionApiModel extends QuestionMosaicBooleanApiModel {
  code: string;
  question: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier';
  reponse_unique: {
    value: string;
    unite: {
      abreviation: string;
      long: string;
    };
  };
  points: number;
  reponse_multiple: [
    {
      code: string;
      label: string;
      emoji: string;
      image_url: string;
      unite: string;
      selected: boolean;
    },
  ];
  categorie: string;
  thematique: string;
  is_answered: boolean;
}

export interface QuestionMosaicBooleanApiModel {
  titre: string;
}

export class QuestionRepositoryAxios implements QuestionRepository {
  @intercept401()
  async recupererListeQuestions(utilisateurId: string): Promise<Question[]> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/questionsKYC_v2`,
    );
    return response.data
      .filter(question => question.categorie !== 'defi')
      .map(question => this.mapQuestionApiModelToQuestion(question));
  }

  @intercept401()
  async recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC_v2/${questionId}`,
    );

    return this.mapQuestionApiModelToQuestion(response.data);
  }

  @intercept401()
  async envoyerReponse(utilisateurId: string, questionId: string, reponse: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.put(`/utilisateurs/${utilisateurId}/questionsKYC_v2/${questionId}`, [
      {
        value: reponse,
      },
    ]);
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
      `/utilisateurs/${utilisateurId}/enchainementQuestionsKYC_v2/${contentId}`,
    );

    return response.data.map((question: QuestionApiModel) => this.mapQuestionApiModelToQuestion(question));
  }

  @intercept401()
  async recupererQuestionsSimulateur(
    utilisateurId: string,
    simulateurActionId: string,
    typeAction: TypeAction,
  ): Promise<Question[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get(
      `/utilisateurs/${utilisateurId}/actions/${typeAction}/${simulateurActionId}`,
    );

    return response.data.kycs.map((question: QuestionApiModel) => this.mapQuestionApiModelToQuestion(question));
  }

  private mapQuestionApiModelToQuestion(question: QuestionApiModel): Question {
    return {
      id: question.code,
      libelle: question.question,
      type: question.type,
      reponses: this.determineReponses(question),
      points: question.points,
      thematique: Object.values(ThematiqueQuestion).find(thematique => thematique === question.thematique) as
        | ThematiqueQuestion
        | ThematiqueQuestion.AUTRE,
      aEteRepondu: question.is_answered,
    };
  }

  private determineReponses(question: QuestionApiModel): ReponseKYCSimple | ReponseMosaic<boolean> | ReponseMultiple {
    if (question.type === 'mosaic_boolean') {
      return {
        reponse: question.reponse_multiple.map(reponse => ({
          code: reponse.code,
          image_url: reponse.image_url,
          label: reponse.label,
          valeur: reponse.selected,
        })),
      } as ReponseMosaic<boolean>;
    } else if (question.type === 'choix_multiple' || question.type === 'choix_unique') {
      return {
        reponse: question.reponse_multiple.map(reponse => ({
          code: reponse.code,
          label: reponse.label,
          estSelectionnee: reponse.selected,
        })),
      } as ReponseMultiple;
    } else {
      return {
        reponses_possibles: [question.reponse_unique.value],
        reponse: [question.reponse_unique.value],
        unite: question.reponse_unique.unite
          ? {
              abreviation: question.reponse_unique.unite.abreviation,
              libelleLong: question.reponse_unique.unite.long,
            }
          : undefined,
      } as ReponseKYCSimple;
    }
  }
}
