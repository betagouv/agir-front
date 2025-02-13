import { PostOnboardingRepository } from '@/domaines/authentification/ports/postOnboarding.repository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';

export class PostOnboardingRepositorySpy implements PostOnboardingRepository {
  private _utiliserArgs: Utilisateur = {} as Utilisateur;

  get utiliserArgs(): Utilisateur {
    return this._utiliserArgs;
  }

  sauvegarderOnboarding(utilisateur: Utilisateur): Promise<void> {
    this._utiliserArgs = utilisateur;
    return Promise.resolve();
  }
}
