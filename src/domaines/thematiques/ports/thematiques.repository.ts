import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface ThematiquesRepository {
  terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void>;
  resetPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void>;
}
