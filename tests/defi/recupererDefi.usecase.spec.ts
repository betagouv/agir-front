import { MockDefiRepository } from './adapters/defi.repository.mock';
import { RecupererDefiUsecase } from '@/defi/recupererDefiUsecase';
import { DefiPresenterImpl, DefiViewModel } from '@/defi/adapters/defi.presenter.impl';

describe('Fichier de tests pour récuperer un défi', () => {
  it("En donnant un id d'utilisateur et l'id du défi doit appeler le back pour récuperer la question pour un type libre", async () => {
    // GIVEN
    const mockDefiRepository = new MockDefiRepository({
      id: 'defiId',
      libelle: 'Un defi',
      type: 'libre',
      reponses_possibles: [],
      points: 10,
      reponse: [],
    });

    // WHEN
    const usecase = new RecupererDefiUsecase(mockDefiRepository);
    await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DefiViewModel) {
      expect(viewModel).toStrictEqual<DefiViewModel>({
        id: 'defiId',
        libelle: 'Un defi',
        type: 'libre',
        reponses: [],
        reponses_possibles: [],
        points: 'Récoltez vos + 10 points',
      });
    }
  });

  it("En donnant un id d'utilisateur et l'id de la question du défi doit appeler le back pour récuperer la question pour un type choix_multiple", async () => {
    // GIVEN
    const mockDefiRepository = new MockDefiRepository({
      id: 'defiId',
      libelle: 'Un defi',
      type: 'choix_multiple',
      reponses_possibles: ['1', '2', '3'],
      points: 10,
      reponse: [],
    });

    // WHEN
    const usecase = new RecupererDefiUsecase(mockDefiRepository);
    await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DefiViewModel) {
      expect(viewModel).toStrictEqual<DefiViewModel>({
        id: 'defiId',
        libelle: 'Un defi',
        type: 'choix_multiple',
        points: 'Récoltez vos + 10 points',
        reponses: [],
        reponses_possibles: [
          {
            id: '1',
            label: '1',
          },
          {
            id: '2',
            label: '2',
          },
          {
            id: '3',
            label: '3',
          },
        ],
      });
    }
  });
  it("En donnant un id d'utilisateur et l'id de la question du défi doit appeler le back pour récuperer la question pour un type choix_unique", async () => {
    // GIVEN
    const questionRepository = new MockDefiRepository({
      id: 'defiId',
      libelle: 'Un defi',
      type: 'choix_unique',
      reponses_possibles: ['1', '2', '3'],
      points: 10,
      reponse: [],
    });

    // WHEN
    const usecase = new RecupererDefiUsecase(questionRepository);
    await usecase.execute('defiId', 'utilisateurId', new DefiPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DefiViewModel) {
      expect(viewModel).toStrictEqual<DefiViewModel>({
        id: 'defiId',
        libelle: 'Un defi',
        points: 'Récoltez vos + 10 points',
        type: 'choix_unique',
        reponses: [],
        reponses_possibles: [
          {
            id: '1',
            label: '1',
          },
          {
            id: '2',
            label: '2',
          },
          {
            id: '3',
            label: '3',
          },
        ],
      });
    }
  });
});
