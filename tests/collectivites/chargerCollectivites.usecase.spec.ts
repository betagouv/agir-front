import { ChercherCollectivitesUsecase } from '@/domaines/collectivites/chercherCollectivites.usecase';
import { ChercherCollectivitesPresenterImpl } from '@/domaines/collectivites/adapters/chercherCollectivites.presenter.impl';
import { RechercheDeCollectiviteViewModel } from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
import { CollectiviteRepositoryMock } from './adapters/commune.repository.mock';

describe('Fichier de test du usecase de chargement des collectivités EPCI', () => {
  it('En cherchant une collectivité, doit me retourner la liste des collectivités cohérentes', async () => {
    // GIVEN
    const collectiviteRecherche = 'paris';
    const chercherCollectivitesUsecase = new ChercherCollectivitesUsecase(
      new CollectiviteRepositoryMock([
        { codeInsee: '75056', nom: 'Paris' },
        { codeInsee: '75057', nom: 'Paris 1er arrondissement' },
        { codeInsee: '75058', nom: 'Paris 2eme arrondissement' },
        { codeInsee: '75059', nom: 'Paris 3eme arrondissement' },
        { codeInsee: '75060', nom: 'Paris 4eme arrondissement' },
      ]),
    );

    // WHEN
    await chercherCollectivitesUsecase.execute(
      collectiviteRecherche,
      new ChercherCollectivitesPresenterImpl(expectation),
    );

    function expectation(viewModel: RechercheDeCollectiviteViewModel) {
      expect(viewModel).toStrictEqual<RechercheDeCollectiviteViewModel>({
        listeDeCollectivites: [
          { codeInsee: '75056', nom: 'Paris' },
          { codeInsee: '75057', nom: 'Paris 1er arrondissement' },
          { codeInsee: '75058', nom: 'Paris 2eme arrondissement' },
          { codeInsee: '75059', nom: 'Paris 3eme arrondissement' },
          { codeInsee: '75060', nom: 'Paris 4eme arrondissement' },
        ],
        message: `Vous ne parvenez pas à trouver votre collectivité ? Vous pouvez nous contacter à l'adresse <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`,
      });
    }
  });

  it('En cherchant une recherche trop large, le nombre de collectivité affiché est bloqué et le message est adapté', async () => {
    // GIVEN
    const collectiviteRecherche = 'c';
    const tableauDe100CollectivitesRempli = Array.from({ length: 100 }, (_, index) => ({
      codeInsee: (index + 1).toString(),
      nom: `Test${index + 1}`,
    }));
    const chercherCollectivitesUsecase = new ChercherCollectivitesUsecase(
      new CollectiviteRepositoryMock(tableauDe100CollectivitesRempli),
    );

    // WHEN
    await chercherCollectivitesUsecase.execute(
      collectiviteRecherche,
      new ChercherCollectivitesPresenterImpl(expectation),
    );

    function expectation(viewModel: RechercheDeCollectiviteViewModel) {
      expect(viewModel.listeDeCollectivites.length).toBe(40);
      expect(viewModel.message).toBe(
        `La recherche <i>"${collectiviteRecherche}"</i> émet beaucoup de résultats. Veuillez préciser votre recherche pour des résultats plus cohérents.`,
      );
    }
  });

  it('En cherchant une ville non enregistré, aucune collectivité est affiché et le message est adapté', async () => {
    // GIVEN
    const collectiviteRecherche = 'villeInexistante';
    const chercherCollectivitesUsecase = new ChercherCollectivitesUsecase(new CollectiviteRepositoryMock([]));

    // WHEN
    await chercherCollectivitesUsecase.execute(
      collectiviteRecherche,
      new ChercherCollectivitesPresenterImpl(expectation),
    );

    function expectation(viewModel: RechercheDeCollectiviteViewModel) {
      expect(viewModel.listeDeCollectivites.length).toBe(0);
      expect(viewModel.message).toBe(
        `Il semble qu'aucune collectivité n'ait été trouvé dans notre base de données avec le nom <i>"${collectiviteRecherche}"</i>. Si vous pensez que c'est une erreur, vous pouvez contacter <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`,
      );
    }
  });
});
