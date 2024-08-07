import Shepherd from 'shepherd.js';
import { inject } from 'vue';
import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';

export const useReveal = () => {
  const aideTour: Shepherd.Tour = inject('aideTour')!;
  const recommandationTour: Shepherd.Tour = inject('recommandationTour')!;
  const universTour: Shepherd.Tour = inject('universTour')!;

  function selectionnerReveal(fonctionnalite: Fonctionnalites): Shepherd.Tour {
    switch (fonctionnalite) {
      case Fonctionnalites.AIDES:
        return aideTour;
      case Fonctionnalites.RECOMMANDATIONS:
        return recommandationTour;
      case Fonctionnalites.UNIVERS:
        return universTour;
      default:
        return aideTour;
    }
  }

  return { aideTour, recommandationTour, universTour, selectionnerReveal };
};
