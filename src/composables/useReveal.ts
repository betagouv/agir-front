import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
import { inject } from 'vue';
import Shepherd from 'shepherd.js';

export const useReveal = () => {
  const aideTour: Shepherd.Tour = inject('aideTour')!;
  const serviceTour: Shepherd.Tour = inject('serviceTour')!;
  const recommandationTour: Shepherd.Tour = inject('recommandationTour')!;
  const bibliothequeTour: Shepherd.Tour = inject('bibliothequeTour')!;

  function selectionnerReveal(fonctionnalite: Fonctionnalites): Shepherd.Tour {
    switch (fonctionnalite) {
      case Fonctionnalites.SERVICES:
        return serviceTour;
      case Fonctionnalites.AIDES:
        return aideTour;
      case Fonctionnalites.RECOMMANDATIONS:
        return recommandationTour;
      case Fonctionnalites.BIBLIOTHEQUE:
        return bibliothequeTour;
      default:
        return aideTour;
    }
  }

  return { aideTour, serviceTour, recommandationTour, bibliothequeTour, selectionnerReveal };
};
