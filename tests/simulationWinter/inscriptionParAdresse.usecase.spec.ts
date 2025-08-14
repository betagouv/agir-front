import { describe, expect, it, beforeEach } from 'vitest';
import { InscriptionParAdresseUsecase } from '@/domaines/simulationWattWatchers/inscriptionParAdresse.usecase';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';
import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';
import { AxiosError } from '@/axios.factory';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { vi } from 'vitest';

describe('InscriptionParAdresseUsecase', () => {
  let repository: WattWatchersRepository;
  let presenter: InscriptionPresenter;
  const utilisateurId = 'user123';
  const nom = 'Maison principale';
  const adresse: Adresse = {
    commune_label: 'Paris',
    codePostal: '75001',
    rue: 'rue de la Paix',
    coordonnees: {
      latitude: 48.866667,
      longitude: 2.333333,
    },
    codeEpci: '200056',
    commune_utilisee_dans_le_compte: 'Paris',
    numeroRue: '1',
  };

  beforeEach(() => {
    repository = {
      inscriptionParAdresse: vi.fn(),
      inscriptionParPrm: vi.fn(),
      recupererConsommation: vi.fn(),
    } as unknown as WattWatchersRepository;

    presenter = {
      presenteInscriptionOk: vi.fn(),
      presenteInscriptionDejaAssocie: vi.fn(),
      presenteInscriptionErreur: vi.fn(),
    } as InscriptionPresenter;
  });

  it('devrait présenter une inscription réussie', async () => {
    // Given
    vi.mocked(repository.inscriptionParAdresse).mockResolvedValue(undefined);

    // When
    await new InscriptionParAdresseUsecase(repository).execute(utilisateurId, nom, adresse, presenter);

    // Then
    expect(repository.inscriptionParAdresse).toHaveBeenCalledWith(utilisateurId, nom, adresse);
    expect(presenter.presenteInscriptionOk).toHaveBeenCalledTimes(1);
    expect(presenter.presenteInscriptionDejaAssocie).not.toHaveBeenCalled();
    expect(presenter.presenteInscriptionErreur).not.toHaveBeenCalled();
  });

  it('devrait présenter une erreur de déjà associé', async () => {
    // Given
    const error: AxiosError = {
      status: 400,
      data: { code: '160' },
    };
    vi.mocked(repository.inscriptionParAdresse).mockRejectedValue(error);

    // When
    await new InscriptionParAdresseUsecase(repository).execute(utilisateurId, nom, adresse, presenter);

    // Then
    expect(repository.inscriptionParAdresse).toHaveBeenCalledWith(utilisateurId, nom, adresse);
    expect(presenter.presenteInscriptionDejaAssocie).toHaveBeenCalledTimes(1);
    expect(presenter.presenteInscriptionOk).not.toHaveBeenCalled();
    expect(presenter.presenteInscriptionErreur).not.toHaveBeenCalled();
  });

  it('devrait présenter une erreur générique', async () => {
    // Given
    const error: AxiosError = {
      status: 500,
      data: { message: 'Internal Server Error' },
    };
    vi.mocked(repository.inscriptionParAdresse).mockRejectedValue(error);

    // When
    await new InscriptionParAdresseUsecase(repository).execute(utilisateurId, nom, adresse, presenter);

    // Then
    expect(repository.inscriptionParAdresse).toHaveBeenCalledWith(utilisateurId, nom, adresse);
    expect(presenter.presenteInscriptionErreur).toHaveBeenCalledTimes(1);
    expect(presenter.presenteInscriptionOk).not.toHaveBeenCalled();
    expect(presenter.presenteInscriptionDejaAssocie).not.toHaveBeenCalled();
  });
});
