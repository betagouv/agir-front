import { ConsommationElectrique } from '@/linky/ports/linkyRepository.repository';

export interface ConsommationElectriqueViewModel {
  description: string;
  commentaires: string[];
  graphique: {
    libelles: string[];
    valeur_courante: number[];
    valeur_precedente: number[];
  };
}

export interface LinkyPresenter {
  presente(consommationElectrique: ConsommationElectrique): void;
}
