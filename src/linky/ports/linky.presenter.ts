import { ConsommationElectrique } from '@/linky/ports/linkyRepository.repository';

export interface ConsommationElectriqueViewModel {
  titre: string;
  description: string;
  couleurValeur1: string;
  couleurValeur2: string;
  commentaires: string[];
  graphique: {
    libelles: string[];
    valeur_courante: number[];
    valeur_precedente: number[];
    valeur_courante_transcription: string[];
    valeur_precedente_transcription: string[];
  };
}

export interface LinkyPresenter {
  presente(consommationElectrique: ConsommationElectrique): void;
}
