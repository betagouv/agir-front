import { MockDefiRepository } from './adapters/defi.repository.mock';
import { RecupererDefiUsecase } from '@/domaines/defi/recupererDefiUsecase';
import { DefiPresenterImpl, DefiViewModel } from '@/domaines/defi/adapters/defi.presenter.impl';
import { describe } from 'vitest';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe('Fichier de tests pour récuperer un défi', () => {
  it("En donnant un id d'utilisateur et l'id de la question du défi non répondu doit appeler le back et présenter le défi", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      description: 'Defi description',
      thematique: ClefThematiqueAPI.transports,
      libelle: 'Defi libelle',
      points: 10,
      status: 'todo',
      astuces: 'Defi astuce',
      pourquoi: 'Défi pourquoi',
      nombreDePersonnes: 42,
    });

    // WHEN
    const usecase = new RecupererDefiUsecase(questionRepository);
    await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DefiViewModel) {
      expect(viewModel).toStrictEqual<DefiViewModel>({
        astuces: 'Defi astuce',
        description: 'Defi description',
        id: 'defiId',
        libelle: 'Defi libelle',
        points: '10',
        pourquoi: 'Défi pourquoi',
        reponse: 'todo',
        explicationRefus: undefined,
        reponses_possibles: [
          {
            id: 'en_cours',
            label: '<span aria-hidden="true">👍</span> Je relève le défi',
          },
          {
            id: 'pas_envie',
            label: '<span aria-hidden="true">👎</span> Pas pour moi',
          },
        ],
        thematiqueTag: {
          label: 'Me déplacer',
          style: {
            backgroundColor: '#D2E9FF',
            color: '#021952',
            emoji: '🚗',
          },
        },
        afficherNombreDePersonnes: true,
        nombreDePersonnes: 42,
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question du défi en cours doit appeler le back et présenter le défi", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      description: 'Defi description',
      thematique: ClefThematiqueAPI.transports,
      libelle: 'Defi libelle',
      points: 10,
      status: 'en_cours',
      astuces: 'Defi astuce',
      pourquoi: 'Défi pourquoi',
      nombreDePersonnes: 42,
    });

    // WHEN
    const usecase = new RecupererDefiUsecase(questionRepository);
    await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DefiViewModel) {
      expect(viewModel).toStrictEqual<DefiViewModel>({
        astuces: 'Defi astuce',
        description: 'Defi description',
        id: 'defiId',
        libelle: 'Defi libelle',
        points: '10',
        pourquoi: 'Défi pourquoi',
        reponse: 'en_cours',
        explicationRefus: undefined,
        reponses_possibles: [
          {
            id: 'fait',
            label: '<span aria-hidden="true">🏆</span> Défi réalisé',
          },
          { id: 'abondon', label: '<span aria-hidden="true">👎</span> Finalement, pas pour moi' },
        ],
        thematiqueTag: {
          label: 'Me déplacer',
          style: {
            backgroundColor: '#D2E9FF',
            color: '#021952',
            emoji: '🚗',
          },
        },
        afficherNombreDePersonnes: true,
        nombreDePersonnes: 42,
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question du défi déjà réalisé doit appeler le back et présenter le défi", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      description: 'Defi description',
      thematique: ClefThematiqueAPI.transports,
      libelle: 'Defi libelle',
      points: 10,
      status: 'fait',
      astuces: 'Defi astuce',
      pourquoi: 'Défi pourquoi',
      nombreDePersonnes: 42,
    });

    // WHEN
    const usecase = new RecupererDefiUsecase(questionRepository);
    await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DefiViewModel) {
      expect(viewModel).toStrictEqual<DefiViewModel>({
        astuces: 'Defi astuce',
        description: 'Defi description',
        id: 'defiId',
        libelle: 'Defi libelle',
        points: '10',
        pourquoi: 'Défi pourquoi',
        explicationRefus: undefined,
        reponse: 'fait',
        reponses_possibles: [{ id: 'deja_fait', label: '<span aria-hidden="true">✅</span> Déjà fait' }],
        thematiqueTag: {
          label: 'Me déplacer',
          style: {
            backgroundColor: '#D2E9FF',
            color: '#021952',
            emoji: '🚗',
          },
        },
        afficherNombreDePersonnes: true,
        nombreDePersonnes: 42,
      });
    }
  });

  describe('Si un défi a été realisé par moins de 3 personnes ne doit pas afficher le nombre de personnes ayant réalisé le défi', async () => {
    it('0 personnes ont réalisé le défi', async () => {
      // GIVEN
      const questionRepository = new MockDefiRepository({
        id: 'defiId',
        description: 'Defi description',
        thematique: ClefThematiqueAPI.transports,
        libelle: 'Defi libelle',
        points: 10,
        status: 'fait',
        astuces: 'Defi astuce',
        pourquoi: 'Défi pourquoi',
        nombreDePersonnes: 0,
      });

      // WHEN
      const usecase = new RecupererDefiUsecase(questionRepository);
      await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: DefiViewModel) {
        expect(viewModel).toStrictEqual<DefiViewModel>({
          astuces: 'Defi astuce',
          description: 'Defi description',
          id: 'defiId',
          libelle: 'Defi libelle',
          points: '10',
          pourquoi: 'Défi pourquoi',
          explicationRefus: undefined,
          reponse: 'fait',
          reponses_possibles: [{ id: 'deja_fait', label: '<span aria-hidden="true">✅</span> Déjà fait' }],
          thematiqueTag: {
            label: 'Me déplacer',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚗',
            },
          },
          afficherNombreDePersonnes: false,
          nombreDePersonnes: 0,
        });
      }
    });
    it('1 personnes ont réalisé le défi', async () => {
      // GIVEN
      const questionRepository = new MockDefiRepository({
        id: 'defiId',
        description: 'Defi description',
        thematique: ClefThematiqueAPI.transports,
        libelle: 'Defi libelle',
        points: 10,
        status: 'fait',
        astuces: 'Defi astuce',
        pourquoi: 'Défi pourquoi',
        nombreDePersonnes: 1,
      });

      // WHEN
      const usecase = new RecupererDefiUsecase(questionRepository);
      await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: DefiViewModel) {
        expect(viewModel).toStrictEqual<DefiViewModel>({
          astuces: 'Defi astuce',
          description: 'Defi description',
          id: 'defiId',
          libelle: 'Defi libelle',
          points: '10',
          pourquoi: 'Défi pourquoi',
          explicationRefus: undefined,
          reponse: 'fait',
          reponses_possibles: [{ id: 'deja_fait', label: '<span aria-hidden="true">✅</span> Déjà fait' }],
          thematiqueTag: {
            label: 'Me déplacer',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚗',
            },
          },
          afficherNombreDePersonnes: false,
          nombreDePersonnes: 1,
        });
      }
    });
    it('2 personnes ont réalisé le défi', async () => {
      // GIVEN
      const questionRepository = new MockDefiRepository({
        id: 'defiId',
        description: 'Defi description',
        thematique: ClefThematiqueAPI.transports,
        libelle: 'Defi libelle',
        points: 10,
        status: 'fait',
        astuces: 'Defi astuce',
        pourquoi: 'Défi pourquoi',
        nombreDePersonnes: 2,
      });

      // WHEN
      const usecase = new RecupererDefiUsecase(questionRepository);
      await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: DefiViewModel) {
        expect(viewModel).toStrictEqual<DefiViewModel>({
          astuces: 'Defi astuce',
          description: 'Defi description',
          id: 'defiId',
          libelle: 'Defi libelle',
          points: '10',
          pourquoi: 'Défi pourquoi',
          explicationRefus: undefined,
          reponse: 'fait',
          reponses_possibles: [{ id: 'deja_fait', label: '<span aria-hidden="true">✅</span> Déjà fait' }],
          thematiqueTag: {
            label: 'Me déplacer',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚗',
            },
          },
          afficherNombreDePersonnes: false,
          nombreDePersonnes: 2,
        });
      }
    });
    it('3 personnes ont réalisé le défi', async () => {
      // GIVEN
      const questionRepository = new MockDefiRepository({
        id: 'defiId',
        description: 'Defi description',
        thematique: ClefThematiqueAPI.transports,
        libelle: 'Defi libelle',
        points: 10,
        status: 'fait',
        astuces: 'Defi astuce',
        pourquoi: 'Défi pourquoi',
        nombreDePersonnes: 3,
      });

      // WHEN
      const usecase = new RecupererDefiUsecase(questionRepository);
      await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: DefiViewModel) {
        expect(viewModel).toStrictEqual<DefiViewModel>({
          astuces: 'Defi astuce',
          description: 'Defi description',
          id: 'defiId',
          libelle: 'Defi libelle',
          points: '10',
          pourquoi: 'Défi pourquoi',
          explicationRefus: undefined,
          reponse: 'fait',
          reponses_possibles: [{ id: 'deja_fait', label: '<span aria-hidden="true">✅</span> Déjà fait' }],
          thematiqueTag: {
            label: 'Me déplacer',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚗',
            },
          },
          afficherNombreDePersonnes: true,
          nombreDePersonnes: 3,
        });
      }
    });
  });
});
