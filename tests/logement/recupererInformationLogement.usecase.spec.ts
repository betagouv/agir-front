import { LogementPresenterImpl } from '@/logement/adapters/logement.presenter.impl';
import { RecupererInformationLogementUseCase } from '@/logement/recupererInformationLogement.usecase';
import { MockLogementRepository } from './adapters/logement.repository.mock';
import {
  ChauffageLogementApiModel,
  DPELogementApiModel,
  SuperficieLogementApiModel,
  TypeLogementApiModel,
} from '../../src/logement/adapters/logement.repository.axios';

describe('Fichier de tests concernant la récuperations des informations du logement', () => {
  it('Doit recupérer les informations', () => {
    // GIVEN
    const usecase = new RecupererInformationLogementUseCase(
      new MockLogementRepository({
        codePostal: '75001',
        commune: 'PARIS 01',
        adultes: 2,
        enfants: 1,
        residence: TypeLogementApiModel.Appartement,
        proprietaire: 'oui',
        superficie: SuperficieLogementApiModel.Superficie_100,
        modeDeChauffage: ChauffageLogementApiModel.Gaz,
        plusDeQuinzeAns: 'oui',
        dpe: DPELogementApiModel.B,
      }),
    );

    // WHEN // THEN
    usecase.execute(
      'idUtilisateur',
      new LogementPresenterImpl(viewModel => {
        expect(viewModel).toEqual({
          codePostal: '75001',
          commune: 'PARIS 01',
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
            valeur: 'oui',
            reponsesPossibles: [
              {
                label: 'Oui',
                value: 'oui',
              },
              {
                label: 'Non',
                value: 'non',
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
          modeDeChauffage: {
            valeur: 'gaz',
            reponsesPossibles: [
              { label: 'Électricité', value: 'electricite' },
              { label: 'Bois / Pellets', value: 'bois' },
              { label: 'Fioul', value: 'fioul' },
              { label: 'Gaz', value: 'gaz' },
              { label: 'Autre / Je ne sais pas', value: 'autre' },
            ],
          },
          plusDeQuinzeAns: {
            valeur: 'oui',
            reponsesPossibles: [
              {
                label: 'Oui',
                value: 'oui',
              },
              {
                label: 'Non',
                value: 'non',
              },
            ],
          },
          dpe: {
            valeur: 'dpe_b',
            reponsesPossibles: [
              { label: 'A', value: 'dpe_a' },
              { label: 'B', value: 'dpe_b' },
              { label: 'C', value: 'dpe_c' },
              { label: 'D', value: 'dpe_d' },
              { label: 'E', value: 'dpe_e' },
              { label: 'F', value: 'dpe_f' },
              { label: 'G', value: 'dpe_g' },
            ],
          },
        });
      }),
    );
  });
});
