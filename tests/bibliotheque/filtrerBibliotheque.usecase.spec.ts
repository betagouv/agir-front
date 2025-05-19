import { BibliothequePresenterImpl } from '@/domaines/bibliotheque/adapters/bibliotheque.presenter.impl';
import { BibliothequeRepositoryMock } from './adapters/bibliotheque.repository.mock';
import { FiltrerBibliothequeUsecase } from '@/domaines/bibliotheque/filtrerBibliotheque.usecase';

describe('Fichier de tests concernant le chargement de la bibliotheque', () => {
  it("En donnant l'id utilisateur, une liste de filtres de thématique et un titre doit charger la bibliotheque", async () => {
    // GIVEN
    // WHEN
    const bibliothequeUsecase = new FiltrerBibliothequeUsecase(new BibliothequeRepositoryMock());
    await bibliothequeUsecase.execute(
      '1',
      [],
      '',
      false,
      false,
      new BibliothequePresenterImpl(viewModel => {
        expect(viewModel.articles).toStrictEqual([
          {
            titre: 'Par où commencer la rénovation de sa maison ?',
            thematique: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚅',
              },
            },
            description: 'lorem ipsum dolor description un peu longue hello',
            url: '/article/par-ou-commencer-la-renovation-de-sa-maison-/1',
            image: 'https://picsum.photos/300/200',
            favoris: false,
            idDuContenu: '1',
          },
          {
            titre: 'Le coût carbone d’un t-shirt',
            thematique: {
              label: 'Me nourrir',
              style: {
                backgroundColor: '#E3FBAF',
                color: '#175202',
                emoji: '🍛',
              },
            },
            description: 'lorem ipsum dolor description un peu longue hello',
            url: '/article/le-cout-carbone-d-un-t-shirt/2',
            image: 'https://picsum.photos/400/400',
            favoris: false,
            idDuContenu: '2',
          },
          {
            titre: 'C’est quoi 5 tonnes de CO2e ?',
            thematique: {
              label: 'Mes achats',
              style: {
                backgroundColor: '#FFE8D7',
                color: '#522E02',
                emoji: '👕',
              },
            },
            description: 'lorem ipsum dolor description un peu longue hello',
            url: `/article/c-est-quoi-5-tonnes-de-co2e-/3`,
            image: 'https://picsum.photos/400/400',
            favoris: false,
            idDuContenu: '3',
          },
          {
            description: 'lorem ipsum dolor description un peu longue hello',
            image: 'https://picsum.photos/300/200',
            favoris: false,
            thematique: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚅',
              },
            },
            titre: 'Quelle est la mission de l’ADEME ?',
            url: '/article/quelle-est-la-mission-de-l-ademe-/4',
            idDuContenu: '4',
          },
        ]);

        // THEN
        expect(viewModel.filtres).toStrictEqual([
          {
            checked: false,
            id: '0',
            label: '🛒 Consommation',
          },
          {
            checked: false,
            id: '1',
            label: '🏠 Logement',
          },
          {
            checked: false,
            id: '2',
            label: '🚅 Transports',
          },
        ]);
      }),
    );
  });
});
