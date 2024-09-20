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
    reponses: { code: string; boolean_value: boolean }[],
  ): Promise<void> {
    await AxiosFactory.getAxios().put(`/utilisateurs/${utilisateurId}/questionsKYC/${questionId}`, {
      reponse_mosaic: reponses,
    });
  }

  @intercept401()
  async recupererQuestionsDepuisMissionOnboarding(utilisateurId: string): Promise<Question[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get(`/utilisateurs/${utilisateurId}/todo`);

    const KYC = JSON.stringify({
      titre: 'Enchainement',
      type: 'enchainement_kyc',
      level: 1,
      content_id: 'ENCHAINEMENT_KYC_1',
      points: 10,
      questions: [
        {
          id: 'KYC001',
          question: 'quest 1',
          reponse: [],
          reponses_possibles: ['Oui', 'Non', 'Je sais pas'],
          categorie: 'recommandation',
          points: 20,
          type: 'choix_unique',
          is_NGC: true,
          thematique: 'alimentation',
        },
        {
          id: 'KYC002',
          question: 'quest 2',
          reponse: [],
          reponses_possibles: ['Oui', 'Non', 'Je sais pas'],
          categorie: 'recommandation',
          points: 20,
          type: 'choix_unique',
          is_NGC: true,
          thematique: 'alimentation',
        },
        {
          id: 'TEST_MOSAIC_ID',
          titre: 'Titre test',
          reponses: [
            {
              boolean_value: false,
              code: 'KYC003',
              image_url: 'AAA',
              label: 'short',
            },
            {
              boolean_value: false,
              code: 'KYC004',
              image_url: 'AAA',
              label: 'short',
            },
          ],
          categorie: 'test',
          points: 10,
          type: 'mosaic_boolean',
          is_answered: false,
        },
      ],
      progression: { current: 0, target: 3 },
      sont_points_en_poche: false,
      thematiques: ['climat'],
    });

    response.data.todo.push(JSON.parse(KYC));

    return response.data.todo
      .filter(todo => todo.type === 'enchainement_kyc')[0]
      .questions.map((question: QuestionApiModel) => this.mapQuestionApiModelToQuestion(question));
  }
}
