import { AxiosError } from '@/axios.factory';
import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';

export class InscriptionParPRMUsecase {
  constructor(private readonly repository: WattWatchersRepository) {}

  async execute(utilisateurId: string, prm: string, nom: string, presenter: InscriptionPresenter): Promise<void> {
    try {
      await this.repository.inscriptionParPrm(utilisateurId, prm, nom);
      presenter.presenteInscriptionOk();
    } catch (error) {
      if (this.isDejaAssocie(error)) {
        presenter.presenteInscriptionDejaAssocie();
      } else {
        presenter.presenteInscriptionErreur();
      }
    }
  }

  private isDejaAssocie(error: unknown): error is AxiosError {
    return error !== null && (error as AxiosError).data.code === '160';
  }
}
