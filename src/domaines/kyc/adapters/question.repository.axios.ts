import { AxiosFactory, intercept401 } from '@/axios.factory';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { Question, ReponseKYCSimple, ReponseMosaic, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

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
      id: question.id,
      libelle: question.type === 'mosaic_boolean' ? question.titre : question.question,
      type: question.type,
      reponses: this.determineReponses(question),
      points: question.points,
      thematique: Object.values(ThematiqueQuestion).find(thematique => thematique === question.thematique) as
        | ThematiqueQuestion
        | ThematiqueQuestion.AUTRE,
      aEteRepondu: question.type === 'mosaic_boolean' ? question.is_answered : question.reponse.length > 0,
    };
  }

  private determineReponses(question: QuestionApiModel): ReponseKYCSimple | ReponseMosaic<boolean> {
    if (question.type === 'mosaic_boolean') {
      return {
        reponse: question.reponses.map(reponse => ({
          code: reponse.code,
          image_url: reponse.image_url,
          label: reponse.label,
          valeur: reponse.boolean_value,
        })),
      } as ReponseMosaic<boolean>;
    } else {
      return {
        reponses_possibles: question.reponses_possibles,
        reponse: question.reponse,
      } as ReponseKYCSimple;
    }
  }

  @intercept401()
  async recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel>(
      `utilisateurs/${utilisateurId}/questionsKYC/${questionId}`,
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
