import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
import { MockLogementRepository } from './adapters/logement.repository.mock';
import {
  DPELogementApiModel,
  SuperficieLogementApiModel,
  TypeLogementApiModel,
} from '@/domaines/logement/adapters/logement.repository.axios';
import { RecupererAdressePourBarreDeRechercheUsecase } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { BarreDeRecherchePresenterImpl } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';

describe('Fichier de tests concernant la récuperations des informations du logement', () => {
  it('Doit recupérer les informations', async () => {
    // GIVEN
    const usecase = new RecupererAdressePourBarreDeRechercheUsecase(
      new MockLogementRepository({
        codePostal: '75001',
        codeEpci: '75021',
        commune_utilisee_dans_le_compte: 'PARIS 01',
        commune_label: 'Paris 01',
        adultes: 2,
        enfants: 1,
        residence: TypeLogementApiModel.Appartement,
        proprietaire: true,
        superficie: SuperficieLogementApiModel.Superficie_100,
        plusDeQuinzeAns: true,
        dpe: DPELogementApiModel.B,
        coordonnees: {
          latitude: 48.865,
          longitude: 2.331,
        },
        numeroRue: '34',
        rue: "avenue de l'Opéra",
      }),
    );

    // WHEN // THEN
    await usecase.execute(
      'idUtilisateur',
      new BarreDeRecherchePresenterImpl(viewModel => {
        expect(viewModel).toEqual({
          coordonnees: {
            latitude: 48.865,
            longitude: 2.331,
          },
          recherche: "34 avenue de l'Opéra, Paris 01 (75001)",
        });
      }),
    );
  });
});
