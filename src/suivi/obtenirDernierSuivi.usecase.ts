import { SuiviRepository } from "@/suivi/ports/suivi.repository";

export class ObtenirDernierSuiviUsecase {
  private suiviRepository: SuiviRepository;
  constructor(suiviRepository: SuiviRepository) {
    this.suiviRepository = suiviRepository;
  }

  execute(idUtilisateur: string, typeDeSuivi: string) {
    this.suiviRepository.recupererDernierSuivi(idUtilisateur, typeDeSuivi);
  }
}
