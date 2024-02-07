import { ChargerBibliothequeUsecase } from '@/bibliotheque/chargerBibliotheque.usecase';
import { BibliothequePresenterImpl } from '@/bibliotheque/adapters/bibliotheque.presenter.impl';
import { BibliothequeRepositoryMock } from './adapters/bibliotheque.repository.mock';

describe('Fichier de tests concernant le chargement de la bibliotheque', () => {
  it("En donnant l'id utilisateur, une liste de filtres de thématique et un titre doit charger la bibliotheque", async () => {
    // GIVEN
    // WHEN
    const bibliothequeUsecase = new ChargerBibliothequeUsecase(new BibliothequeRepositoryMock());
    await bibliothequeUsecase.execute(
      '1',
      [],
      '',
      new BibliothequePresenterImpl(viewModel => {
        // THEN
        expect(viewModel.articles).toStrictEqual([
          {
            titre: 'Par où commencer la rénovation de sa maison ?',
            thematique: '🌍 Global',
            description: 'lorem ipsum dolor description un peu longue hello',
            url: '/article/par-ou-commencer-la-renovation-de-sa-maison-/1',
            image: 'https://picsum.photos/300/200',
            favoris: false,
          },
          {
            titre: 'Le coût carbone d’un t-shirt',
            thematique: '🌍 Global',
            description: 'lorem ipsum dolor description un peu longue hello',
            url: '/article/le-cout-carbone-dun-t-shirt/1',
            image: 'https://picsum.photos/400/400',
            favoris: false,
          },
          {
            titre: 'C’est quoi 5 tonnes de CO2e ?',
            thematique: '🌍 Global',
            description: 'lorem ipsum dolor description un peu longue hello',
            url: '/article/cest-quoi-5-tonnes-de-co2e-/1',
            image: 'https://picsum.photos/400/400',
            favoris: false,
          },
          {
            description: 'lorem ipsum dolor description un peu longue hello',
            image: 'https://picsum.photos/300/200',
            thematique: '🌍 Global',
            titre: 'Quelle est la mission de l’ADEME ?',
            url: '/article/quelle-est-la-mission-de-lademe-/1',
            favoris: false,
          },
        ]);
        expect(viewModel.filtres).toStrictEqual([
          {
            checked: true,
            id: '0',
            label: '🛒 Consommation',
          },
          {
            checked: true,
            id: '1',
            label: '🏠 Logement',
          },
          {
            checked: true,
            id: '2',
            label: '🚲 Transports',
          },
        ]);
      })
    );
  });
});
