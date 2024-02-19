import { ConsommationElectrique } from '@/linky/ports/linkyRepository.repository';

export interface LinkyPresenter {
  presente(consommationElectrique: ConsommationElectrique): void;
}
