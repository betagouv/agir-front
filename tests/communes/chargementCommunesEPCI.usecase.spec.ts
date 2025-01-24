import { CommuneRepositoryForTest } from './adapters/commune.repository.mock';
import { ChargementCommunesEPCIUsecase } from '@/domaines/communes/chargementCommunesEPCIUsecase';
import { ChargementCommunesEPCIPresenterImpl } from '@/domaines/communes/adapters/chargementCommunesEPCI.presenter.impl';
import { CommunesEPCIViewModel } from '@/domaines/communes/ports/chargementCommunesEPCI.presenter';

describe('Fichier de test du usecase de chargement des collectivités EPCI', () => {
  it('En cherchant une collectivité, doit me retourner la liste des collectivités cohérentes', async () => {
    // GIVEN
    const collectiviteRecherche = 'paris';
    const chargementCommunesUsecase = new ChargementCommunesEPCIUsecase(new CommuneRepositoryForTest());

    // WHEN
    // TODO: FIX les paramètres
    await chargementCommunesUsecase.execute(
      collectiviteRecherche,
      new ChargementCommunesEPCIPresenterImpl(collectiviteRecherche, expectation),
    );

    function expectation(viewModel: CommunesEPCIViewModel) {
      expect(viewModel).toStrictEqual<CommunesEPCIViewModel>({
        listeDeCommunes: [
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
    const chargementCommunesUsecase = new ChargementCommunesEPCIUsecase(new CommuneRepositoryForTest());

    // WHEN
    // TODO: FIX les paramètres
    await chargementCommunesUsecase.execute(
      collectiviteRecherche,
      new ChargementCommunesEPCIPresenterImpl(collectiviteRecherche, expectation),
    );

    function expectation(viewModel: CommunesEPCIViewModel) {
      expect(viewModel.listeDeCommunes.length).toBe(40);
      expect(viewModel.message).toBe(
        `La recherche <i>"${collectiviteRecherche}"</i> émet beaucoup de résultats. Veuillez préciser votre recherche pour des résultats plus cohérents.`,
      );
    }
  });

  it('En cherchant une ville non enregistré, aucune collectivité est affiché et le message est adapté', async () => {
    // GIVEN
    const collectiviteRecherche = 'villeInexistante';
    const chargementCommunesUsecase = new ChargementCommunesEPCIUsecase(new CommuneRepositoryForTest());

    // WHEN
    // TODO: FIX les paramètres
    await chargementCommunesUsecase.execute(
      collectiviteRecherche,
      new ChargementCommunesEPCIPresenterImpl(collectiviteRecherche, expectation),
    );

    function expectation(viewModel: CommunesEPCIViewModel) {
      expect(viewModel.listeDeCommunes.length).toBe(0);
      expect(viewModel.message).toBe(
        `Il semble qu'aucune collectivité n'ait été trouvé dans notre base de données avec le nom <i>"${collectiviteRecherche}"</i>. Si vous pensez que c'est une erreur, vous pouvez contacter <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> avec le nom de la collectivité et son numéro SIREN pour que nous puissions vous aider.`,
      );
    }
  });
});
