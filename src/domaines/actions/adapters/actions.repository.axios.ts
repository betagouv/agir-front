import { AxiosFactory, intercept401 } from '@/axios.factory';
import {
  Action,
  ActionDetail,
  ActionsRecommandeesDansUneThematique,
  ActionsRepository,
  CatalogueActions,
  TypeAction,
} from '@/domaines/actions/ports/actions.repository';
import { mapQuizApi, QuizApiModel } from '@/domaines/quiz/adapters/quizRepository.axios';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

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
  aides: {
    content_id: string;
    titre: string;
    montant_max: number;
    partenaire_nom: string;
    partenaire_url: string;
    partenaire_logo_url: string;
  }[];
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
  nombre_actions_en_cours: number;
  nombre_aides_disponibles: number;
  type: string;
  deja_vue: boolean;
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
      aides: response.data.aides.map(aide => ({
        titre: aide.titre,
        id: aide.content_id,
        partenaireNom: aide.partenaire_nom,
        montantMaximum: aide.montant_max,
      })),
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
      actions: response.data.liste_actions_recommandees.map(this.mapActionApiModelToAction),
    };
  }

  private mapActionApiModelToAction(action: ActionApiModel): Action {
    return {
      code: action.code,
      titre: action.titre,
      sousTitre: action.sous_titre,
      nombreDePersonnes: action.nombre_actions_en_cours,
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
}
