import {
  Action,
  ActionDetail,
  ActionsRecommandeesDansUneThematique,
  ActionsRepository,
} from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class ActionQuizRepositoryMock implements ActionsRepository {
  async chargerAction(idUtilisateur: string, idAction: string): Promise<ActionDetail> {
    return {
      code: 'code',
      titre: 'Titre Quiz',
      sousTitre: 'Sous Titre Quiz',
      type: 'quizz',
      commune: 'Lillers',
      corps: {
        introduction: '',
        astuces: '',
      },
      recommandations: [],
      nombreDePersonnes: 20,
      nombreAidesDisponibles: 10,
      services: [],
      quizzes: [
        {
          id: '0',
          nombreDePointsAGagner: 10,
          difficulte: 1,
          clefThematiqueAPI: ClefThematiqueAPI.consommation,
          titre: `Mon super quizz 1`,
          questions: [
            {
              ordre: '1',
              intitule: 'Une question ?',
              reponsesPossibles: ['Reponse 1', 'Reponse 2'],
              texteExplicationOK: "Un texte d'explication OK",
              texteExplicationKO: "Un texte d'explication KO",
              solution: 'Reponse 1',
            },
          ],
          articleAssocie: null,
        },
        {
          id: '1',
          nombreDePointsAGagner: 10,
          difficulte: 2,
          clefThematiqueAPI: ClefThematiqueAPI.consommation,
          titre: `Mon super quizz 2`,
          questions: [
            {
              ordre: '2',
              intitule: 'Une question ?',
              reponsesPossibles: ['Reponse 1', 'Reponse 2'],
              texteExplicationOK: "Un texte d'explication OK",
              texteExplicationKO: "Un texte d'explication KO",
              solution: 'Reponse 2',
            },
          ],
          articleAssocie: {
            id: '1',
            contenu: '<p>Article de ouf 2 !</p>',
          },
        },
        {
          id: '2',
          nombreDePointsAGagner: 10,
          difficulte: 2,
          clefThematiqueAPI: ClefThematiqueAPI.consommation,
          titre: `Mon super quizz 3`,
          questions: [
            {
              ordre: '3',
              intitule: 'Une question ?',
              reponsesPossibles: ['Reponse 1', 'Reponse 2'],
              texteExplicationOK: "Un texte d'explication OK",
              texteExplicationKO: "Un texte d'explication KO",
              solution: 'Reponse 2',
            },
          ],
          articleAssocie: {
            id: '1',
            contenu: '<p>Article de ouf 3!</p>',
          },
        },
      ],
    };
  }

  chargerCatalogueActions(idUtilisateur: string): Promise<Action[]> {
    return Promise.resolve([]);
  }

  recupererActionsPersonnalisees(
    idUtilisateur: string,
    thematiqueId: string,
  ): Promise<ActionsRecommandeesDansUneThematique> {
    throw Error('Not implemented');
  }

  filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
  ): Promise<Action[]> {
    throw Error('Not implemented');
  }
}
