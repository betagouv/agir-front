export class Filtres {
  constructor(
    public readonly idUtilisateur: string,
    private readonly filtresThematiques: string[],
    private readonly titre: string,
    private readonly filtreDejaVu: boolean,
    private readonly filtreDejaRealisees: boolean,
    private readonly filtreRecommandePourMoi: boolean,
  ) {}

  static pourUtilisateurConnecte(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
    filtreDejaRealisees: boolean,
    filtreRecommandePourMoi: boolean,
  ): Filtres {
    return new Filtres(
      idUtilisateur,
      filtresThematiques,
      titre,
      filtreDejaVu,
      filtreDejaRealisees,
      filtreRecommandePourMoi,
    );
  }

  static pourUtilisateurNonConnecte(filtresThematiques: string[], titre: string): Filtres {
    return new Filtres('', filtresThematiques, titre, false, false, false);
  }

  public estPourUtilisateurConnecte(): boolean {
    return !!this.idUtilisateur;
  }

  public buildQueryParams(): Record<string, string | string[]> {
    const params: Record<string, string | string[]> = {};

    if (this.filtresThematiques.length > 0) {
      params.thematique = this.filtresThematiques;
    }

    if (this.titre) {
      params.titre = this.titre;
    }

    if (this.filtreDejaVu) {
      params.consultation = 'vu';
    }

    if (this.filtreDejaRealisees) {
      params.realisation = 'faite';
    }

    if (this.filtreRecommandePourMoi) {
      params.recommandation = 'recommandee';
    }

    return params;
  }
}
