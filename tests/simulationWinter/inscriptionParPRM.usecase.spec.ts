import { describe, expect, it, beforeEach } from 'vitest';
import { InscriptionParPRMUsecase } from '@/domaines/simulationWattWatchers/inscriptionParPRM.usecase';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';
import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';
import { AxiosError } from '@/axios.factory';
import { vi } from 'vitest';

describe('InscriptionParPRMUsecase', () => {
  let repository: WattWatchersRepository;
  let presenter: InscriptionPresenter;
  const utilisateurId = 'user123';
  const prm = 'PRM12345';
  const nom = 'Maison principale';

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
    vi.mocked(repository.inscriptionParPrm).mockResolvedValue(undefined);

    // When
    await new InscriptionParPRMUsecase(repository).execute(utilisateurId, prm, nom, presenter);

    // Then
    expect(repository.inscriptionParPrm).toHaveBeenCalledWith(utilisateurId, prm, nom);
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
    vi.mocked(repository.inscriptionParPrm).mockRejectedValue(error);

    // When
    await new InscriptionParPRMUsecase(repository).execute(utilisateurId, prm, nom, presenter);

    // Then
    expect(repository.inscriptionParPrm).toHaveBeenCalledWith(utilisateurId, prm, nom);
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
    vi.mocked(repository.inscriptionParPrm).mockRejectedValue(error);

    // When
    await new InscriptionParPRMUsecase(repository).execute(utilisateurId, prm, nom, presenter);

    // Then
    expect(repository.inscriptionParPrm).toHaveBeenCalledWith(utilisateurId, prm, nom);
    expect(presenter.presenteInscriptionErreur).toHaveBeenCalledTimes(1);
    expect(presenter.presenteInscriptionOk).not.toHaveBeenCalled();
    expect(presenter.presenteInscriptionDejaAssocie).not.toHaveBeenCalled();
  });
});
