import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import {
  Action,
  ActionDetail,
  ActionsRepository,
  CatalogueActions,
  CompteurActions,
  DetailThematique,
  TypeAction,
} from '@/domaines/actions/ports/actions.repository';
import { QuestionApiModel } from '@/domaines/kyc/adapters/question.repository.axios';
import { mapQuizApi, QuizApiModel } from '@/domaines/quiz/adapters/quiz.repository.axios';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface ActionDetailApiModel {
  code: string;
  titre: string;
  emoji: string;
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
    sous_categorie?: string;
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
  articles: {
    content_id: string;
    titre: string;
    soustitre?: string;
    image_url: string;
  }[];
  sources: {
    label: string;
    url: string;
  }[];
  enchainement_id: string;
  explications_recommandation: ExplicationsRecommandationApiModel;
}

interface ExplicationsRecommandationApiModel {
  est_exclu: boolean;
  liste_explications: {
    tag: string;
    label_explication: string;
  }[];
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
  emoji: string;
  sous_titre: string;
  nom_commune: string;
  nombre_actions_faites: number;
  nombre_aides_disponibles: number;
  type: string;
  deja_vue: boolean;
  montant_max_economies_euros: number;
  deja_faite: boolean;
  label_compteur: string;
  explications_recommandation: ExplicationsRecommandationApiModel;
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
  est_utilisateur_ngc: boolean;
}

export class ActionsRepositoryAxios implements ActionsRepository {
  @intercept40X()
  async chargerActionUtilisateur(
    idUtilisateur: string,
    idAction: string,
    typeAction: TypeAction,
  ): Promise<ActionDetail> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionDetailApiModel>(
      `/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}`,
    );
    return this.transformeActionDetailApiToActionDetail(response.data);
  }

  async chargerAction(idAction: string, typeAction: TypeAction): Promise<ActionDetail> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionDetailApiModel>(`/actions/${typeAction}/${idAction}`);
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

  @intercept40X()
  async chargerCatalogueActionsUtilisateur(idUtilisateur: string): Promise<CatalogueActions> {
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

  async chargerCatalogueActions(): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<CatalogueActionsApiModel>(`/actions`);

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

  @intercept40X()
  async chargerCatalogueActionsUtilisateurWinter(idUtilisateur: string): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<CatalogueActionsApiModel>(
      `/utilisateurs/${idUtilisateur}/actions?recommandation=recommandee&realisation=pas_faite&selection=actions_watt_watchers`,
    );

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

  async chargerCatalogueActionsWinter(): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<CatalogueActionsApiModel>(`/actions?selection=actions_watt_watchers`);

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

  async chargerSelectionActions(selection: string): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<CatalogueActionsApiModel>(`/actions?selection=${selection}`);

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

  @intercept40X()
  async chargerActionsRecommandees(idUtilisateur: string): Promise<Action[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<CatalogueActionsApiModel>(`/utilisateurs/${idUtilisateur}/actions`, {
      params: {
        ordre: 'recommandee_filtre_perso',
        take: 6,
      },
    });

    return response.data.actions.map(this.mapActionApiModelToAction);
  }

  @intercept40X()
  async filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
    filtreDejaRealisees: boolean,
  ): Promise<CatalogueActions> {
    const axios = AxiosFactory.getAxios();

    const params = this.buildFiltres(filtresThematiques, titre, filtreDejaVu, filtreDejaRealisees);
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

  @intercept40X()
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
      estUtilisateurNgc: response.data.est_utilisateur_ngc,
    };
  }

  @intercept40X()
  async terminerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}/faite`);
  }

  async compterActions(): Promise<CompteurActions> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<{ nombre_total_actions_faites: number }>('/compteur_actions');
    return response.data.nombre_total_actions_faites;
  }

  private transformeActionDetailApiToActionDetail(actionDetailApiModel: ActionDetailApiModel): ActionDetail {
    return {
      code: actionDetailApiModel.code,
      titre: actionDetailApiModel.titre,
      emoji: actionDetailApiModel.emoji,
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
      articles: actionDetailApiModel.articles.map(article => ({
        titre: article.titre,
        image: article.image_url,
        id: article.content_id,
      })),
      nombreDeRealisations: actionDetailApiModel.nombre_actions_faites,
      nombreAidesDisponibles: actionDetailApiModel.nombre_aides_disponibles,
      realisee: actionDetailApiModel.deja_faite,
      services: actionDetailApiModel.services.map(service => ({
        type: service.recherche_service_id as 'recettes' | 'longue_vie_objets' | 'proximite',
        parametreDuService: {
          categorie: service.categorie,
          sousCategorie: service.sous_categorie,
        },
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
      idEnchainementKYCs: actionDetailApiModel.enchainement_id,
      thematique: actionDetailApiModel.thematique as ClefThematiqueAPI,
      sources: actionDetailApiModel.sources.map(article => ({
        label: article.label,
        url: article.url,
      })),
      explicationsRecommandations: new ExplicationsRecommandation(
        actionDetailApiModel.explications_recommandation.est_exclu,
        actionDetailApiModel.explications_recommandation.liste_explications.map(explication => ({
          tag: explication.tag,
          labelExplication: explication.label_explication,
        })),
      ),
    };
  }

  private mapActionApiModelToAction(action: ActionApiModel): Action {
    return {
      code: action.code,
      titre: action.titre,
      emoji: action.emoji,
      sousTitre: action.sous_titre,
      nombreDePersonnes: action.nombre_actions_faites,
      nombreAidesDisponibles: action.nombre_aides_disponibles,
      type: action.type as TypeAction,
      dejaVue: action.deja_vue,
      montantMaxEconomiesEnEuros: action.montant_max_economies_euros,
      dejaFaite: action.deja_faite,
      labelCompteur: action.label_compteur,
      explicationsRecommandations: new ExplicationsRecommandation(
        action.explications_recommandation.est_exclu,
        action.explications_recommandation.liste_explications.map(explication => ({
          tag: explication.tag,
          labelExplication: explication.label_explication,
        })),
      ),
    };
  }

  private buildFiltres(
    filtreThematiques: string[],
    titre: string,
    filtreDejaVue: boolean,
    filtreDejaRealisees: boolean,
  ): string {
    const params: string[] = [];

    if (filtreThematiques.length > 0)
      params.push(filtreThematiques.map(thematique => `thematique=${thematique}`).join('&'));
    if (titre) params.push(`titre=${titre}`);
    params.push(`consultation=${filtreDejaVue ? 'vu' : 'tout'}`);
    params.push(`realisation=${filtreDejaRealisees ? 'faite' : 'tout'}`);
    return params.length > 0 ? `?${params.join('&')}` : '';
  }
}
