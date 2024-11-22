export interface Thematique {
  clefTechniqueAPI: string;
  url: string;
  labelDansLeMenu: string;
  imageUrl: string;
}

export enum ClefThematiqueAPI {
  alimentation = 'alimentation',
  transports = 'transport',
  consommation = 'consommation',
  logement = 'logement',
  dechets = 'dechet',
  environnement = 'environnement',
  loisir = 'loisir',
}

export class MenuThematiques {
  static clefsThematiques: ClefThematiqueAPI[] = [
    ClefThematiqueAPI.alimentation,
    ClefThematiqueAPI.transports,
    ClefThematiqueAPI.consommation,
    ClefThematiqueAPI.logement,
    ClefThematiqueAPI.dechets,
    ClefThematiqueAPI.environnement,
    ClefThematiqueAPI.loisir,
  ];
  private static thematiquesData: Record<ClefThematiqueAPI, Thematique> = {
    [ClefThematiqueAPI.alimentation]: {
      clefTechniqueAPI: 'alimentation',
      url: 'me-nourrir',
      labelDansLeMenu: 'Me nourrir',
      imageUrl:
        'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728466523/cuisine_da54797693.svg',
    },
    [ClefThematiqueAPI.transports]: {
      clefTechniqueAPI: 'transport',
      url: 'me-deplacer',
      labelDansLeMenu: 'Me déplacer',
      imageUrl:
        'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728466903/Mobilite_df75aefd09.svg',
    },
    [ClefThematiqueAPI.consommation]: {
      clefTechniqueAPI: 'consommation',
      url: 'consommer',
      labelDansLeMenu: 'Consommer',
      imageUrl: 'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728468852/conso_7522b1950d.svg',
    },
    [ClefThematiqueAPI.logement]: {
      clefTechniqueAPI: 'logement',
      url: 'me-loger',
      labelDansLeMenu: 'Me loger',
      imageUrl: 'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728468978/maison_80242d91f3.svg',
    },
    [ClefThematiqueAPI.dechets]: {
      clefTechniqueAPI: 'dechet',
      url: 'dechet',
      labelDansLeMenu: 'Déchets',
      imageUrl: '',
    },
    [ClefThematiqueAPI.environnement]: {
      clefTechniqueAPI: 'environnement',
      url: 'environnement',
      labelDansLeMenu: 'Environnement',
      imageUrl: '',
    },
    [ClefThematiqueAPI.loisir]: {
      clefTechniqueAPI: 'loisir',
      url: 'loisir',
      labelDansLeMenu: 'Loisir',
      imageUrl: '',
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
