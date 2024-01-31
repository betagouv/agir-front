import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';

export interface LinkyPresenter {
  presente(consommationElectrique: ConsommationElectrique[]): void;
}
