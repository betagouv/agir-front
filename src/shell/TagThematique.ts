import { ClefTechniqueAPI } from '@/shell/MenuUnivers';

export interface TagStyle {
  backgroundColor: string;
  color: string;
  emoji: string;
}

export class TagThematique {
  private static tagData: Record<ClefTechniqueAPI, TagStyle> = {
    [ClefTechniqueAPI.alimentation]: {
      backgroundColor: '#E3FBAF',
      color: '#175202',
      emoji: '🥗',
    },
    [ClefTechniqueAPI.transports]: {
      backgroundColor: '#D2E9FF',
      color: '#021952',
      emoji: '🚗',
    },
    [ClefTechniqueAPI.consommation]: {
      backgroundColor: '#FFE8D7',
      color: '#522E02',
      emoji: '👕',
    },
    [ClefTechniqueAPI.logement]: {
      backgroundColor: '#FFE2E0',
      color: '#52022E',
      emoji: '🏠',
    },
  };

  static getTagThematiqueUtilitaire(clefTechniqueAPI: string): TagStyle {
    return (
      this.tagData[clefTechniqueAPI] ?? {
        backgroundColor: '#ececec',
        color: 'black',
        emoji: '👏',
      }
    );
  }
}
