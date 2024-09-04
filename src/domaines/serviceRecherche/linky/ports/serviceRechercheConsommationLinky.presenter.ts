import { ConsommationElectriqueGlobal } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

export interface ServiceRechercheConsommationLinkyPresenter {
  presente(consommationElectriqueGlobal: ConsommationElectriqueGlobal): void;
}
