import { Aide, Aides } from '@/domaines/aides/chargementAides.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface ChargementAidesRepository {
  getAides(codePostal: string): Promise<Aides>;

  recupererAidesDuneThematique(utilisateurId: string, clefThematique: ClefThematiqueAPI): Promise<Aides>;

  consulterEnModeNonConnecte(idAide: string): Promise<Aide>;

  recupererDetailAide(utilisateurId: string, idAide: string): Promise<Aide>;

  previsualiser(idAide: string): Promise<Aide>;
}
