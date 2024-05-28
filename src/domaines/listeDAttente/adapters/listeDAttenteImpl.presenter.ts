import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ListeDAttentePresenter } from '@/domaines/listeDAttente/ports/listeDAttente.presenter';

export interface ReponseInscriptionViewModel {
  type: 'success' | 'error';
  titre: string;
  message: string;
}

export class ListeDAttentePresenterImpl implements ListeDAttentePresenter {
  constructor(private readonly reponseInscriptionViewModel: (viewModel: ReponseInscriptionViewModel) => void) {}

  presente(reponse: ReponseInscription): void {
    if (reponse.succes) {
      this.reponseInscriptionViewModel({
        type: 'success',
        titre: 'Inscription confirmée',
        message: 'Merci, et à très bientôt sur Agir !',
      });
    } else {
      this.reponseInscriptionViewModel({
        type: 'error',
        titre: 'Nous sommes victime de notre succès',
        message: 'Revenez plus tard',
      });
    }
  }
}
