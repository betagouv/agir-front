import axios from 'redaxios';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import {
  Question,
  QuestionChoixMultiple,
  QuestionChoixUnique,
  QuestionLibre,
  QuestionMosaicBoolean,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionApiModel extends QuestionMosaicBooleanApiModel {
  id: string;
  question: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean';
  reponses_possibles: string[];
  points: number;
  reponse: string[];
  categorie: string;
  thematique: string;
}

export interface QuestionMosaicBooleanApiModel {
  titre: string;
  reponses: {
    code: string;
    image_url: string;
    label: string;
    boolean_value: boolean;
  }[];
}

export class QuestionRepositoryAxios implements QuestionRepository {
  @intercept401()
  async recupererListeQuestions(utilisateurId: string): Promise<Question[]> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/questionsKYC`,
    );
    return response.data
      .filter(question => question.categorie !== 'defi')
      .map(question => ({
        id: question.id,
        libelle: question.type === 'mosaic_boolean' ? question.titre : question.question,
        type: question.type,
        question: this.determineQuestion(question),
        points: question.points,
        thematique: Object.values(ThematiqueQuestion).find(thematique => thematique === question.thematique) as
          | ThematiqueQuestion
          | ThematiqueQuestion.AUTRE,
      }));
  }

  @intercept401()
  async recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC/${questionId}`,
    );

    return {
      id: response.data.id,
      libelle: response.data.type === 'mosaic_boolean' ? response.data.titre : response.data.question,
      type: response.data.type,
      question: this.determineQuestion(response.data),
      points: response.data.points,
      thematique: Object.values(ThematiqueQuestion).find(thematique => thematique === response.data.thematique) as
        | ThematiqueQuestion
        | ThematiqueQuestion.AUTRE,
    };
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

    return response.data.map(question => ({
      id: question.id,
      libelle: question.type === 'mosaic_boolean' ? question.titre : question.question,
      type: question.type,
      points: question.points,
      question: this.determineQuestion(question),
      thematique: Object.values(ThematiqueQuestion).find(thematique => thematique === question.thematique) as
        | ThematiqueQuestion
        | ThematiqueQuestion.AUTRE,
    }));
  }

  private determineQuestion(
    question: QuestionApiModel,
  ): QuestionLibre | QuestionChoixMultiple | QuestionChoixUnique | QuestionMosaicBoolean {
    if (question.type === 'mosaic_boolean') {
      return {
        reponse: question.reponses,
      };
    } else {
      return {
        reponses_possibles: question.reponses_possibles,
        reponse: question.reponse,
      };
    }
  }

  @intercept401()
  async envoyerReponseMosaic(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; valeur: boolean }[],
  ): Promise<void> {
    await AxiosFactory.getAxios().put(`/utilisateurs/${utilisateurId}/mosaicsKYC/${questionId}`, {
      reponse: reponses,
    });
  }
}
