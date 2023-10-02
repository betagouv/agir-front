import ChargementAidesUsecase, { Aides } from '../../src/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '../../src/aides/ports/chargementAides.repository';
import { ChargementAidesPresenterImpl } from '../../src/aides/adapters/chargementAides.presenter.impl';
import { AidesViewModel } from '../../src/aides/ports/chargementAides.presenter';

class ChargementAidesRepositoryForTest implements ChargementAidesRepository {
  getAides(): Promise<Aides[]> {
    return Promise.resolve([
      {
        id: 'id-1',
        titre: "Simulez vos aides pour l'achat d'un vélo",
        sousTitre: '',
        categorie: '🚗 Transport du quotidien',
        nombreDePointsAGagner: '25',
        miseEnAvant: '',
        type: 'AIDE',
        illustrationURL: 'https://picsum.photos/200/300',
        url: 'mes-aides-velo',
        isUrlExterne: false,
        contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p><ul><li>Item 1</li><li>Item 2</li></ul>',
        idDuContenu: '',
        isSimulateur: true,
        montantMaximum: 15000,
      },
      {
        id: 'id-2',
        titre: 'Simulez vos aides pour convertir votre voiture thermique en électrique',
        sousTitre: '',
        categorie: '🚗 Transport du quotidien',
        nombreDePointsAGagner: '25',
        miseEnAvant: '',
        type: 'AIDE',
        illustrationURL: 'https://picsum.photos/200/300',
        url: 'mes-aides-retrofit',
        isUrlExterne: true,
        contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
        idDuContenu: '',
        isSimulateur: false,
      },
      {
        id: 'id-3',
        titre: 'Aide test',
        sousTitre: '',
        categorie: '🥦 Alimentation',
        nombreDePointsAGagner: '25',
        miseEnAvant: '',
        type: 'AIDE',
        illustrationURL: 'https://picsum.photos/200/300',
        url: 'mes-aides-velo',
        isUrlExterne: false,
        contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
        idDuContenu: '',
        isSimulateur: true,
      },
    ]);
  }
}

describe('Fichier de tests pour charger toutes les aides', () => {
  it('Renvoie toutes les aides groupés par catégorie', async () => {
    // WHEN
    const useCase = new ChargementAidesUsecase(new ChargementAidesRepositoryForTest());
    await useCase.execute(new ChargementAidesPresenterImpl(expectation));

    // THEN
    function expectation(aidesViewModel: AidesViewModel) {
      expect(aidesViewModel).toStrictEqual({
        '🚗 Transport du quotidien': [
          {
            categorie: '🚗 Transport du quotidien',
            contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p><ul><li>Item 1</li><li>Item 2</li></ul>',
            id: 'id-1',
            isSimulateur: true,
            titre: "Simulez vos aides pour l'achat d'un vélo",
            url: 'mes-aides-velo',
            montantMaximum: "Jusqu'à 15 000 €",
          },
          {
            categorie: '🚗 Transport du quotidien',
            contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
            id: 'id-2',
            isSimulateur: false,
            titre: 'Simulez vos aides pour convertir votre voiture thermique en électrique',
            url: 'mes-aides-retrofit',
            montantMaximum: undefined,
          },
        ],
        '🥦 Alimentation': [
          {
            categorie: '🥦 Alimentation',
            contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
            id: 'id-3',
            isSimulateur: true,
            titre: 'Aide test',
            url: 'mes-aides-velo',
            montantMaximum: undefined,
          },
        ],
      });
    }
  });
});
