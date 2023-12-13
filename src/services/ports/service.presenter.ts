import { Service } from '@/services/recupererServiceActifs.usecase';

export interface ServicePresenter {
  present(services: Service[]): void;
}
