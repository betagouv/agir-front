import { RepositoryError } from '@/shell/repositoryError';

export interface CreerComptePresenter {
  present(): void;
  presentError(errror: RepositoryError): void;
}
