import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
import { MockLogementRepository } from './adapters/logement.repository.mock';
import {
  ChauffageLogementApiModel,
  DPELogementApiModel,
  SuperficieLogementApiModel,
  TypeLogementApiModel,
} from '@/domaines/logement/adapters/logement.repository.axios';
import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';

describe('Fichier de tests concernant la récuperations des informations du logement', () => {
  it('Doit recupérer les informations', async () => {
    // GIVEN
    const usecase = new RecupererInformationLogementUseCase(
      new MockLogementRepository({
        codePostal: '75001',
        commune_utilisee_dans_le_compte: 'PARIS 01',
        commune_label: 'Paris 01',
        adultes: 2,
        enfants: 1,
        residence: TypeLogementApiModel.Appartement,
        proprietaire: true,
        superficie: SuperficieLogementApiModel.Superficie_100,
        plusDeQuinzeAns: true,
        dpe: DPELogementApiModel.B,
      }),
    );

    // WHEN // THEN
    await usecase.execute(
      'idUtilisateur',
      new LogementPresenterImpl(viewModel => {
        expect(viewModel).toEqual({
          codePostal: '75001',
          commune_utilisee_dans_le_compte: 'PARIS 01',
          commune_label: 'Paris 01',
          adultes: 2,
          enfants: 1,
          residence: {
            valeur: 'appartement',
            reponsesPossibles: [
              {
                label: 'Un appartement',
                value: 'appartement',
              },
              {
                label: 'Une maison',
                value: 'maison',
              },
            ],
          },
          proprietaire: {
            valeur: true,
            reponsesPossibles: [
              {
                label: 'Oui',
                value: true,
              },
              {
                label: 'Non',
                value: false,
              },
            ],
          },
          superficie: {
            valeur: 'superficie_100',
            reponsesPossibles: [
              { label: 'Moins de 35 m²', value: 'superficie_35' },
              { label: 'Entre 35 et 70 m²', value: 'superficie_70' },
              { label: 'Entre 70 et 100 m²', value: 'superficie_100' },
              { label: 'Entre 100 et 150 m²', value: 'superficie_150' },
              { label: 'Plus de 150 m²', value: 'superficie_150_et_plus' },
            ],
          },
          plusDeQuinzeAns: {
            valeur: true,
            reponsesPossibles: [
              {
                label: 'Oui',
                value: true,
              },
              {
                label: 'Non',
                value: false,
              },
            ],
          },
          dpe: {
            valeur: 'B',
            reponsesPossibles: [
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
              { label: 'C', value: 'C' },
              { label: 'D', value: 'D' },
              { label: 'E', value: 'E' },
              { label: 'F', value: 'F' },
              { label: 'G', value: 'G' },
            ],
          },
        });
      }),
    );
  });
});
