import { Thematique } from '@/thematiques/recupererThematiquesUnivers.usecase';

export interface ThematiqueRepository {
  recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]>;
}
