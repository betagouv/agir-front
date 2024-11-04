interface Thematique {
  clefTechniqueAPI: string;
  url: string;
  labelDansLeMenu: string;
}

export enum ClefThematiqueAPI {
  alimentation = 'alimentation',
  transports = 'transport',
  consommation = 'consommation',
  logement = 'logement',
}

export class MenuThematiques {
  private static thematiquesData: Record<ClefThematiqueAPI, Thematique> = {
    [ClefThematiqueAPI.alimentation]: {
      clefTechniqueAPI: 'alimentation',
      url: 'me-nourrir',
      labelDansLeMenu: 'Me nourrir',
    },
    [ClefThematiqueAPI.transports]: {
      clefTechniqueAPI: 'transport',
      url: 'me-deplacer',
      labelDansLeMenu: 'Me déplacer',
    },
    [ClefThematiqueAPI.consommation]: {
      clefTechniqueAPI: 'consommation',
      url: 'consommer',
      labelDansLeMenu: 'Consommer',
    },
    [ClefThematiqueAPI.logement]: {
      clefTechniqueAPI: 'logement',
      url: 'me-loger',
      labelDansLeMenu: 'Me loger',
    },
  };
  static getThematiqueData(clefTechniqueAPI: ClefThematiqueAPI): Thematique {
    return this.thematiquesData[clefTechniqueAPI];
  }

  static getFromUrl(url: string): Thematique {
    const thematique = Object.values(this.thematiquesData).find(thematique => thematique.url === url);
    if (!thematique) {
      throw new Error(`Thematique not found for url: ${url}`);
    }
    return thematique;
  }
}
