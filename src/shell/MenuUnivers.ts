interface Univers {
  clefTechniqueAPI: string;
  url: string;
  labelDansLeMenu: string;
}

export enum ClefTechniqueAPI {
  alimentation = 'alimentation',
  transports = 'transports',
  consommation = 'consommation',
  logement = 'logement',
}

export class MenuUnivers {
  private static universData: Record<ClefTechniqueAPI, Univers> = {
    [ClefTechniqueAPI.alimentation]: {
      clefTechniqueAPI: 'alimentation',
      url: 'me-nourrir',
      labelDansLeMenu: 'Me nourrir',
    },
    [ClefTechniqueAPI.transports]: {
      clefTechniqueAPI: 'transport',
      url: 'me-deplacer',
      labelDansLeMenu: 'Me déplacer',
    },
    [ClefTechniqueAPI.consommation]: {
      clefTechniqueAPI: 'consommation',
      url: 'consommer',
      labelDansLeMenu: 'Consommer',
    },
    [ClefTechniqueAPI.logement]: {
      clefTechniqueAPI: 'logement',
      url: 'me-loger',
      labelDansLeMenu: 'Me loger',
    },
  };
  static getUniversData(clefTechniqueAPI: ClefTechniqueAPI): Univers {
    return this.universData[clefTechniqueAPI];
  }

  static getFromUrl(url: string): Univers | undefined {
    return Object.values(this.universData).find(univers => univers.url === url);
  }
}
