import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';

export interface ConsommationElectrique {
  commentaires: string[];
  data: {
    valeur: number;
    mois: string;
    annee: string;
    date: string;
  }[];
}

export interface ConsommationElectriqueGlobal {
  consommationQuatorzeJours: ConsommationElectrique;
  consommationAnnuelle: ConsommationElectrique;
}

export class RecupererConsommationElectriqueUsecase {
  constructor(private serviceRechercheLinkyRepository: ServiceRechercheLinkyRepository) {}

  async execute(idUtilisateur: string) {
    await this.serviceRechercheLinkyRepository.recupererConsommationElectrique(idUtilisateur);
    // New presenter à créer pour graphique
  }
}
