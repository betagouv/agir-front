import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class ResetPersonnalisationUsecase {
  constructor(private readonly thematiquesRepository: ThematiquesRepository) {}

  async execute(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    await this.thematiquesRepository.resetPersonnalisation(idUtilisateur, clefThematiqueApi);
  }
}
