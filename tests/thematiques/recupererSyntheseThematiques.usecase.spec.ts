import { RecupererSyntheseThematiques } from '@/domaines/thematiques/recupererSyntheseThematiques.usecase';
import { SyntheseThematiquesPresenterImpl } from '@/domaines/thematiques/adapters/syntheseThematiques.presenter.impl';
import { SyntheseThematiquesViewModel } from '@/domaines/thematiques/ports/syntheseThematique.presenter';
import { ThematiquesRepositorySpy } from './adapters/thematiques.repository.spy';
import { ThematiquesRepositoryMock } from './adapters/thematiques.repository.mock';

describe('Fichier de tests concernant la récupération de la synthèse des thématiques', () => {
  it("En donnant l'id de l'utilisateur, devrait préparer des données simples pour l'affichage des cartes thématiques", async () => {
    // WHEN
    const usecase = new RecupererSyntheseThematiques(
      new ThematiquesRepositoryMock({
        commune: 'Paris',
        listeThematiques: [
          {
            thematique: 'alimentation',
            nombreRecettes: 10,
            nombreAides: 5,
            nombreActions: 32,
            nombreSimulateurs: 0,
          },
          {
            thematique: 'logement',
            nombreRecettes: 0,
            nombreSimulateurs: 1,
            nombreAides: 5,
            nombreActions: 3,
          },
          {
            thematique: 'transport',
            nombreRecettes: 0,
            nombreSimulateurs: 2,
            nombreAides: 5,
            nombreActions: 3,
          },
          {
            thematique: 'consommation',
            nombreRecettes: 0,
            nombreSimulateurs: 0,
            nombreAides: 5,
            nombreActions: 0,
          },
        ],
      }),
    );
    await usecase.execute('id-utilisateur', new SyntheseThematiquesPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: SyntheseThematiquesViewModel) {
      console.log(viewModel);
      expect(viewModel).toStrictEqual<SyntheseThematiquesViewModel>({
        commune: 'Paris',
        cartesThematiques: [
          {
            id: 'me-nourrir',
            titreHTML: '<span aria-hidden="true">🍛</span>&nbsp Me nourrir',
            bulletPoints: [
              '<span class="text--bold">10</span> recettes délicieuses, saines et de saison',
              '<span class="text--bold">1</span> aide sur votre territoire',
              '<span class="text--bold">32</span> idées d\'actions',
            ],
          },
          {
            id: 'me-loger',
            titreHTML: '<span aria-hidden="true">🧱</span>&nbsp Me loger',
            bulletPoints: [
              '<span class="text--bold">1</span> simulateur Mes Aides Rénov',
              '<span class="text--bold">5</span> aides sur votre territoire',
              '<span class="text--bold">3</span> idées d\'actions',
            ],
          },
          {
            id: 'me-deplacer',
            titreHTML: '<span aria-hidden="true">🚲</span>&nbsp Me déplacer',
            bulletPoints: [
              '<span class="text--bold">2</span> simulateurs vélo et voiture',
              '<span class="text--bold">5</span> aides sur votre territoire',
              '<span class="text--bold">3</span> idées d\'actions',
            ],
          },
          {
            id: 'consommer',
            titreHTML: '<span aria-hidden="true">📺</span>&nbsp Mes achats',
            bulletPoints: [
              '<span class="text--bold">5</span> aides sur votre territoire',
              '<span class="text--bold">0</span> idée d\'actions',
            ],
          },
        ],
      });
    }
  });
});
