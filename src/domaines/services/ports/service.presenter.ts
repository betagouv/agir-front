import { Service } from '@/domaines/services/recupererServiceActifs.usecase';

export interface ServicePresenter {
  present(services: Service[]): void;
}
