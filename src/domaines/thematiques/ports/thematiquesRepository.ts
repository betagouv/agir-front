import { Thematique } from '@/domaines/thematiques/recupererThematique.usecase';

export interface ThematiquesRepository {
  recupererThematique(idUtilisateur: string, thematiqueId: string): Promise<Thematique>;
}
