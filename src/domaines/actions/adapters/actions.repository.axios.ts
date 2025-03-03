import { AxiosFactory, intercept401 } from '@/axios.factory';
import {
  Action,
  ActionDetail,
  ActionsRecommandeesDansUneThematique,
  ActionsRepository,
  TypeAction,
} from '@/domaines/actions/ports/actions.repository';
import { mapQuizApi, QuizApiModel } from '@/domaines/quiz/adapters/quizRepository.axios';

interface ActionApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  nom_commune: string;
  nombre_actions_en_cours: number;
  nombre_aides_disponibles: number;
  type: string;
}

interface ActionDetailApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  type: 'classique' | 'quizz' | 'kyc';
  nom_commune: string;
  comment: string;
  pourquoi: string;
  nombre_actions_en_cours: number;
  nombre_aides_disponibles: number;
  quizzes: QuizApiModel[];
  services: {
    categorie: string;
    recherche_service_id: string;
  }[];
  quizz_felicitations: string;
}

interface ActionsRecommandeesApiModel {
  est_personnalisation_necessaire: boolean;
  enchainement_questions_personnalisation: string;
  liste_actions_recommandees: ActionApiModel[];
}

export class ActionsRepositoryAxios implements ActionsRepository {
  @intercept401()
  async chargerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<ActionDetail> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionDetailApiModel>(
      `/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}`,
    );
    return {
      code: response.data.code,
      titre: response.data.titre,
      sousTitre: response.data.sous_titre,
      type: response.data.type,
      commune: response.data.nom_commune,
      quizzFelicitations: response.data.quizz_felicitations,
      corps: {
        introduction: response.data.pourquoi,
        astuces: response.data.comment,
      },
      recommandations: [],
      nombreDePersonnes: response.data.nombre_actions_en_cours,
      nombreAidesDisponibles: response.data.nombre_aides_disponibles,
      services: response.data.services.map(service => ({
        type: service.recherche_service_id as 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous',
        parametreDuService: service.categorie,
      })),
      quizzes: response.data.quizzes.map(quiz => mapQuizApi(quiz)),
    };
  }

  @intercept401()
  async recupererToutesLesActions(idUtilisateur: string): Promise<Action[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionApiModel[]>(`/utilisateurs/${idUtilisateur}/actions`);
    return response.data.map(action => ({
      code: action.code,
      titre: action.titre,
      sousTitre: action.sous_titre,
      nombreDePersonnes: action.nombre_actions_en_cours,
      nombreAidesDisponibles: action.nombre_aides_disponibles,
      type: action.type as TypeAction,
    }));
  }

  @intercept401()
  async recupererActionsPersonnalisees(
    idUtilisateur: string,
    thematiqueId: string,
  ): Promise<ActionsRecommandeesDansUneThematique> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionsRecommandeesApiModel>(
      `/utilisateurs/${idUtilisateur}/thematiques/${thematiqueId}`,
    );

    return {
      doitRepondreAuxKYCs: response.data.est_personnalisation_necessaire,
      idEnchainementKYCs: response.data.enchainement_questions_personnalisation,
      actions: response.data.liste_actions_recommandees.map(action => ({
        code: action.code,
        titre: action.titre,
        sousTitre: action.sous_titre,
        nombreDePersonnes: action.nombre_actions_en_cours,
        nombreAidesDisponibles: action.nombre_aides_disponibles,
        type: action.type as TypeAction,
      })),
    };
  }
}
