import {
  ActionDetail,
  ActionsRepository,
  CatalogueActions,
  DetailThematique,
  TypeAction,
} from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class ActionQuizRepositoryMock implements ActionsRepository {
  async chargerAction(idUtilisateur: string, idAction: string): Promise<ActionDetail> {
    return {
      realisee: false,
      aides: [],
      quizzFelicitations: 'Félicitations !',
      code: 'code',
      titre: 'Titre Quiz',
      sousTitre: 'Sous Titre Quiz',
      type: TypeAction.QUIZZ,
      commune: 'Lillers',
      corps: {
        introduction: '',
        astuces: '',
      },
      kycs: [],
      recommandations: [],
      nombreDeRealisations: 20,
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
            sources: [
              {
                url: 'url',
                label: 'label',
              },
            ],
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
            sources: [
              {
                url: 'url',
                label: 'label',
              },
            ],
          },
        },
      ],
      faq: [],
    };
  }

  chargerCatalogueActions(idUtilisateur: string): Promise<CatalogueActions> {
    throw Error('Not implemented');
  }

  recupererDetailThematique(idUtilisateur: string, thematiqueId: string): Promise<DetailThematique> {
    throw Error('Not implemented');
  }

  filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
  ): Promise<CatalogueActions> {
    throw Error('Not implemented');
  }

  terminerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<void> {
    throw Error('Not implemented');
  }
}
