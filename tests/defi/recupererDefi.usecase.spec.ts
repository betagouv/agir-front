import { MockDefiRepository } from './adapters/defi.repository.mock';
import { RecupererDefiUsecase } from '@/domaines/defi/recupererDefiUsecase';
import { DefiPresenterImpl, DefiViewModel } from '@/domaines/defi/adapters/defi.presenter.impl';

describe('Fichier de tests pour récuperer un défi', () => {
  it("En donnant un id d'utilisateur et l'id de la question du défi non répondu doit appeler le back et présenter le défi", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      description: 'Defi description',
      thematique: 'transport',
      libelle: 'Defi libelle',
      points: 10,
      status: 'todo',
      astuces: 'Defi astuce',
      pourquoi: 'Défi pourquoi',
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
            label: '👍 Défi accepté',
          },
          {
            id: 'pas_envie',
            label: '👎 Pas envie',
          },
          {
            id: 'deja_fait',
            label: '✅ Déjà fait',
          },
        ],
        thematique: 'transport',
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question du défi en cours doit appeler le back et présenter le défi", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      description: 'Defi description',
      thematique: 'transport',
      libelle: 'Defi libelle',
      points: 10,
      status: 'en_cours',
      astuces: 'Defi astuce',
      pourquoi: 'Défi pourquoi',
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
            label: '🏆 Défi réalisé',
          },
          { id: 'en_cours', label: '⏱️ Je relance le défi' },
          { id: 'abondon', label: '❌ Abandonner' },
        ],
        thematique: 'transport',
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question du défi déjà réalisé doit appeler le back et présenter le défi", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      description: 'Defi description',
      thematique: 'transport',
      libelle: 'Defi libelle',
      points: 10,
      status: 'fait',
      astuces: 'Defi astuce',
      pourquoi: 'Défi pourquoi',
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
        reponses_possibles: [{ id: 'deja_fait', label: '✅ Déjà fait' }],
        thematique: 'transport',
      });
    }
  });
});
