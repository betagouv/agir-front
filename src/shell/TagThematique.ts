import { ClefTechniqueAPI } from '@/shell/MenuUnivers';

interface TagThematiqueUtilitaire {
  emoji: string;
  color: string;
}

export class TagThematique {
  private static tagData: Record<ClefTechniqueAPI, TagThematiqueUtilitaire> = {
    [ClefTechniqueAPI.alimentation]: {
      emoji: '🥗',
      color: '#E3FBAF',
    },
    [ClefTechniqueAPI.transports]: {
      emoji: '🚗',
      color: '#D2E9FF',
    },
    [ClefTechniqueAPI.consommation]: {
      emoji: '👕',
      color: '#FFE8D7',
    },
    [ClefTechniqueAPI.logement]: {
      emoji: '🏠',
      color: '#FFE2E0',
    },
  };

  static getTagThematiqueUtilitaire(clefTechniqueAPI: string): TagThematiqueUtilitaire {
    return (
      this.tagData[clefTechniqueAPI] ?? {
        color: '#ececec',
        emoji: '👏',
      }
    );
  }
}
