import Shepherd from 'shepherd.js';
import { inject } from 'vue';
import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';

export const useReveal = () => {
  const aideTour: Shepherd.Tour = inject('aideTour')!;
  const recommandationTour: Shepherd.Tour = inject('recommandationTour')!;
  const defiTour: Shepherd.Tour = inject('defiTour')!;
  const universTour: Shepherd.Tour = inject('universTour')!;

  function selectionnerReveal(fonctionnalite: Fonctionnalites): Shepherd.Tour {
    switch (fonctionnalite) {
      case Fonctionnalites.AIDES:
        return aideTour;
      case Fonctionnalites.RECOMMANDATIONS:
        return recommandationTour;
      case Fonctionnalites.DEFIS:
        return defiTour;
      case Fonctionnalites.UNIVERS:
        return universTour;
      default:
        return aideTour;
    }
  }

  return { aideTour, recommandationTour, defiTour, universTour, selectionnerReveal };
};
