import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';

export interface LinkyRepository {
  recupererConsommationElectrique(
    idUtilsateur: string,
    frequence: 'jour' | 'semaine' | 'mois' | 'annee',
    nombreOccurence: number
  ): Promise<ConsommationElectrique[]>;
}
