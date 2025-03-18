import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { BilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface BilanCarboneRepository {
  recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone>;

  recupererBilanDepuisThematique(idUtilisateur: string, thematique: ClefThematiqueAPI): Promise<BilanThematique>;
}
