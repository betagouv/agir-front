import { AxiosFactory, intercept401 } from '@/axios.factory';
import {
  Action,
  ActionDetail,
  ActionsRepository,
  CatalogueActions,
  DetailThematique,
  TypeAction,
} from '@/domaines/actions/ports/actions.repository';
import { QuestionApiModel } from '@/domaines/kyc/adapters/question.repository.axios';
import {
  Question,
  ReponseKYCSimple,
  ReponseMosaic,
  ReponseMultiple,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestion.usecase';
import { mapQuizApi, QuizApiModel } from '@/domaines/quiz/adapters/quiz.repository.axios';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface ActionDetailApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  points: number;
  consigne: string;
  label_compteur: string;
  type: 'classique' | 'quizz' | 'kyc';
  nom_commune: string;
  comment: string;
  deja_faite: boolean;
  pourquoi: string;
  nombre_actions_faites: number;
  nombre_aides_disponibles: number;
  quizzes: QuizApiModel[];
  services: {
    categorie: string;
    recherche_service_id: string;
  }[];
  quizz_felicitations: string;
  aides: {
    content_id: string;
    titre: string;
    montant_max: number;
    partenaire_nom: string;
    partenaire_url: string;
    partenaire_logo_url: string;
    est_gratuit: boolean;
  }[];
  faqs: {
    question: string;
    reponse: string;
  }[];
  kycs: QuestionApiModel[];
  thematique: string;
}

interface ActionDetailCMSApiModel {
  action: ActionDetailApiModel;
}

interface CatalogueActionsApiModel {
  actions: ActionApiModel[];
  filtres: {
    code: string;
    label: string;
    selected: boolean;
  }[];
  consultation: string;
}

interface ActionApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  nom_commune: string;
  nombre_actions_faites: number;
  nombre_aides_disponibles: number;
  type: string;
  deja_vue: boolean;
}

interface DetailThematiqueApiModel {
  thematique: ClefThematiqueAPI;
  nom_commune: string;
  nombre_recettes: number;
  nombre_actions: number;
  nombre_aides: number;
  nombre_simulateurs: number;
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
    return this.transformeActionDetailApiToActionDetail(response.data);
  }

  async previsualiser(idAction: string, typeAction: TypeAction): Promise<ActionDetail> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionDetailCMSApiModel>(`/cms_preview/actions/${typeAction}/${idAction}`);
    return {
      ...this.transformeActionDetailApiToActionDetail(response.data.action),
      services: [],
    };
  }

  @intercept401()
  async chargerCatalogueActions(idUtilisateur: string): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<CatalogueActionsApiModel>(`/utilisateurs/${idUtilisateur}/actions`);

    return {
      actions: response.data.actions.map(this.mapActionApiModelToAction),
      filtres: response.data.filtres.map(filtre => ({
        code: filtre.code as ClefThematiqueAPI,
        label: filtre.label,
        selected: filtre.selected,
      })),
      consultation: response.data.consultation,
    };
  }

  @intercept401()
  async filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
  ): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();

    const params = this.buildFiltres(filtresThematiques, titre, filtreDejaVu);
    const response = await axios.get<CatalogueActionsApiModel>(`/utilisateurs/${idUtilisateur}/actions${params}`);

    return {
      actions: response.data.actions.map(this.mapActionApiModelToAction),
      filtres: response.data.filtres.map(filtre => ({
        code: filtre.code as ClefThematiqueAPI,
        label: filtre.label,
        selected: filtre.selected,
      })),
      consultation: response.data.consultation,
    };
  }

  @intercept401()
  async recupererDetailThematique(idUtilisateur: string, thematiqueId: string): Promise<DetailThematique> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<DetailThematiqueApiModel>(
      `/utilisateurs/${idUtilisateur}/thematiques/${thematiqueId}`,
    );

    return {
      resume: {
        thematique: response.data.thematique,
        commune: response.data.nom_commune,
        nbRecettes: response.data.nombre_recettes,
        nbActions: response.data.nombre_actions,
        nbAides: response.data.nombre_aides,
        nbSimulateurs: response.data.nombre_simulateurs,
      },
      doitRepondreAuxKYCs: response.data.est_personnalisation_necessaire,
      idEnchainementKYCs: response.data.enchainement_questions_personnalisation,
      actions: response.data.liste_actions_recommandees.map(this.mapActionApiModelToAction),
    };
  }

  @intercept401()
  async terminerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}/faite`);
  }

  private transformeActionDetailApiToActionDetail(actionDetailApiModel: ActionDetailApiModel): ActionDetail {
    return {
      code: actionDetailApiModel.code,
      titre: actionDetailApiModel.titre,
      sousTitre: actionDetailApiModel.sous_titre,
      type: actionDetailApiModel.type as TypeAction,
      commune: actionDetailApiModel.nom_commune,
      consigne: actionDetailApiModel.consigne,
      labelCompteur: actionDetailApiModel.label_compteur,
      points: actionDetailApiModel.points,
      quizzFelicitations: actionDetailApiModel.quizz_felicitations,
      corps: {
        introduction: actionDetailApiModel.pourquoi,
        astuces: actionDetailApiModel.comment,
      },
      recommandations: [],
      nombreDeRealisations: actionDetailApiModel.nombre_actions_faites,
      nombreAidesDisponibles: actionDetailApiModel.nombre_aides_disponibles,
      realisee: actionDetailApiModel.deja_faite,
      services: actionDetailApiModel.services.map(service => ({
        type: service.recherche_service_id as 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous',
        parametreDuService: service.categorie,
      })),
      quizzes: actionDetailApiModel.quizzes.map(quiz => mapQuizApi(quiz)),
      aides: actionDetailApiModel.aides.map(aide => ({
        titre: aide.titre,
        id: aide.content_id,
        partenaireNom: aide.partenaire_nom,
        partenaireImg: aide.partenaire_logo_url,
        montantMaximum: aide.montant_max,
        estGratuit: aide.est_gratuit,
      })),
      faq: actionDetailApiModel.faqs.map(faq => ({
        question: faq.question,
        reponse: faq.reponse,
      })),
      kycs: actionDetailApiModel.kycs.map((question: QuestionApiModel) => this.mapQuestionApiModelToQuestion(question)),
      thematique: actionDetailApiModel.thematique as ClefThematiqueAPI,
    };
  }

  private mapActionApiModelToAction(action: ActionApiModel): Action {
    return {
      code: action.code,
      titre: action.titre,
      sousTitre: action.sous_titre,
      nombreDePersonnes: action.nombre_actions_faites,
      nombreAidesDisponibles: action.nombre_aides_disponibles,
      type: action.type as TypeAction,
      dejaVue: action.deja_vue,
    };
  }

  private buildFiltres(filtreThematiques: string[], titre: string, filtreDejaVue: boolean): string {
    const params: string[] = [];

    if (filtreThematiques.length > 0)
      params.push(filtreThematiques.map(thematique => `thematique=${thematique}`).join('&'));
    if (titre) params.push(`titre=${titre}`);
    params.push(`consultation=${filtreDejaVue ? 'vu' : 'tout'}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
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
      } as ReponseKYCSimple;
    }
  }
}
