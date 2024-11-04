import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface TagStyle {
  backgroundColor: string;
  color: string;
  emoji: string;
}

export class TagThematique {
  private static tagData: Record<ClefThematiqueAPI, TagStyle> = {
    [ClefThematiqueAPI.alimentation]: {
      backgroundColor: '#E3FBAF',
      color: '#175202',
      emoji: '🥗',
    },
    [ClefThematiqueAPI.transports]: {
      backgroundColor: '#D2E9FF',
      color: '#021952',
      emoji: '🚗',
    },
    [ClefThematiqueAPI.consommation]: {
      backgroundColor: '#FFE8D7',
      color: '#522E02',
      emoji: '👕',
    },
    [ClefThematiqueAPI.logement]: {
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
