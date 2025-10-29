export interface FiltreStatut {
  dejaVu: boolean;
  dejaRealisees: boolean;
  recommandePourMoi: boolean;
}

export class FiltreStatutBuilder {
  static defaut(): FiltreStatut {
    return {
      dejaVu: false,
      dejaRealisees: false,
      recommandePourMoi: false,
    };
  }
}

export class Filtres {
  constructor(
    public readonly idUtilisateur: string,
    private readonly filtresThematiques: string[],
    private readonly titre: string,
    private readonly statut: FiltreStatut,
  ) {}

  static pourUtilisateurConnecte(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    statut: FiltreStatut,
  ): Filtres {
    return new Filtres(idUtilisateur, filtresThematiques, titre, statut);
  }

  static pourUtilisateurNonConnecte(filtresThematiques: string[], titre: string): Filtres {
    return new Filtres('', filtresThematiques, titre, FiltreStatutBuilder.defaut());
  }

  public estPourUtilisateurConnecte(): boolean {
    return !!this.idUtilisateur;
  }

  public buildQueryParams(): URLSearchParams {
    const params = new URLSearchParams();

    if (this.filtresThematiques.length > 0) {
      for (const thematique of this.filtresThematiques) {
        params.append('thematique', thematique);
      }
    }

    if (this.titre) {
      params.append('titre', this.titre);
    }

    if (this.statut.dejaVu) {
      params.append('consultation', 'vu');
    }

    if (this.statut.dejaRealisees) {
      params.append('realisation', 'faite');
    }

    if (this.statut.recommandePourMoi) {
      params.append('recommandation', 'recommandee');
    }

    return params;
  }
}
