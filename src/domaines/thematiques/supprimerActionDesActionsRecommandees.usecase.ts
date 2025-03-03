import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class SupprimerActionDesActionsRecommandeesUsecase {
  constructor(private readonly repository: ThematiquesRepository) {}

  async execute(utilisateurId: string, codeThematique: string, actionType: string, actionId: string): Promise<void> {
    await this.repository.supprimerActionDesActionsRecommandees(utilisateurId, codeThematique, actionType, actionId);
  }
}
