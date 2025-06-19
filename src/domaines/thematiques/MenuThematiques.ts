export interface Thematique {
  clefTechniqueAPI: string;
  url: string;
  labelDansLeMenu: string;
  imageUrl: string;
  illustration?: string;
  emoji?: string;
}

export enum ClefThematiqueAPI {
  alimentation = 'alimentation',
  transports = 'transport',
  consommation = 'consommation',
  logement = 'logement',
  dechets = 'dechet',
  climat = 'climat',
  loisir = 'loisir',
  services_societaux = 'services_societaux',
}

export class MenuThematiques {
  static clefsThematiques: ClefThematiqueAPI[] = [
    ClefThematiqueAPI.alimentation,
    ClefThematiqueAPI.transports,
    ClefThematiqueAPI.consommation,
    ClefThematiqueAPI.logement,
    ClefThematiqueAPI.dechets,
    ClefThematiqueAPI.climat,
    ClefThematiqueAPI.loisir,
    ClefThematiqueAPI.services_societaux,
  ];
  private static thematiquesData: Record<ClefThematiqueAPI, Thematique> = {
    [ClefThematiqueAPI.alimentation]: {
      clefTechniqueAPI: 'alimentation',
      url: 'me-nourrir',
      labelDansLeMenu: 'Me nourrir',
      imageUrl:
        'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728466523/cuisine_da54797693.svg',
      emoji: '🍛',
      illustration: '/thematique-alimentation.svg',
    },
    [ClefThematiqueAPI.transports]: {
      clefTechniqueAPI: 'transport',
      url: 'me-deplacer',
      labelDansLeMenu: 'Me déplacer',
      imageUrl:
        'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728466903/Mobilite_df75aefd09.svg',
      emoji: '🚅',
      illustration: '/thematique-transport.svg',
    },
    [ClefThematiqueAPI.consommation]: {
      clefTechniqueAPI: 'consommation',
      url: 'consommer',
      labelDansLeMenu: 'Mes achats',
      imageUrl: 'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728468852/conso_7522b1950d.svg',
      emoji: '👕',
      illustration: '/thematique-consommation.svg',
    },
    [ClefThematiqueAPI.logement]: {
      clefTechniqueAPI: 'logement',
      url: 'me-loger',
      labelDansLeMenu: 'Me loger',
      imageUrl: 'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728468978/maison_80242d91f3.svg',
      emoji: '🏠',
      illustration: '/thematique-logement.svg',
    },
    [ClefThematiqueAPI.dechets]: {
      clefTechniqueAPI: 'dechet',
      url: 'dechet',
      labelDansLeMenu: 'Déchets',
      imageUrl: '',
    },
    [ClefThematiqueAPI.climat]: {
      clefTechniqueAPI: 'climat',
      url: 'climat',
      labelDansLeMenu: 'Environnement',
      imageUrl: '',
    },
    [ClefThematiqueAPI.loisir]: {
      clefTechniqueAPI: 'loisir',
      url: 'loisir',
      labelDansLeMenu: 'Loisir',
      imageUrl: '',
    },
    [ClefThematiqueAPI.services_societaux]: {
      clefTechniqueAPI: 'services_societaux',
      url: 'services_societaux',
      labelDansLeMenu: 'Services sociétaux',
      imageUrl: '',
    },
  };

  static getThematiquesPrincipalesData(): Thematique[] {
    return [
      this.thematiquesData[ClefThematiqueAPI.alimentation],
      this.thematiquesData[ClefThematiqueAPI.logement],
      this.thematiquesData[ClefThematiqueAPI.transports],
      this.thematiquesData[ClefThematiqueAPI.consommation],
    ];
  }

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
