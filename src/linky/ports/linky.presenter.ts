import { ConsommationElectrique } from '@/linky/obtenirConsommationElectriqueAnnuelle.usecase';

export interface LinkyPresenter {
  presente(consommationElectrique: ConsommationElectrique): void;
}
