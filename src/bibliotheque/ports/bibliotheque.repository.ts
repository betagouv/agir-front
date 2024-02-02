export interface Ressource {
  titre: string;
  description: string;
  contentId: string;
  thematique: string;
  image: string;
}

export interface Filtre {
  id: string;
  label: string;
  checked: boolean;
}
export interface Bibliotheque {
  ressources: Ressource[];
  filtresThematiques: Filtre[];
}
export interface BibliothequeRepository {
  chargerBibliotheque(utilisateurId: string, filtreThematiquesIds: string[], titre?: string): Promise<Bibliotheque>;
}
