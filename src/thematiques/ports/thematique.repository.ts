import { Thematique } from '@/thematiques/recupererThematiquesUniversUsecase';

export interface ThematiqueRepository {
  recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]>;
}
