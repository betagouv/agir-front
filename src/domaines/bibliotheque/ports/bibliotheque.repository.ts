import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface Ressource {
  titre: string;
  description: string;
  idDuContenu: string;
  thematiqueLabel: string;
  thematique: ClefThematiqueAPI;
  image: string;
  favoris: boolean;
}

export interface Filtre {
  id: string;
  label: string;
}

export interface Bibliotheque {
  ressources: Ressource[];
  filtresThematiques: Filtre[];
}

export interface BibliothequeRepository {
  chargerBibliotheque(utilisateurId: string): Promise<Bibliotheque>;

  filtrerBibliotheque(
    utilisateurId: string,
    filtreThematiquesIds: string[],
    titre: string,
    filtreFavoris: boolean,
    filtreArticleLus: boolean,
  ): Promise<Bibliotheque>;
}
