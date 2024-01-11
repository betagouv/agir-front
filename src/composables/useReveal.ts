import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
import { inject } from 'vue';
import Shepherd from 'shepherd.js';

export const useReveal = () => {
  const aideTour: Shepherd.Tour = inject('aideTour')!;
  const serviceTour: Shepherd.Tour = inject('serviceTour')!;

  function selectionnerReveal(fonctionnalite: Fonctionnalites): Shepherd.Tour {
    switch (fonctionnalite) {
      case Fonctionnalites.SERVICES:
        return serviceTour;
      case Fonctionnalites.AIDES:
        return aideTour;
      default:
        return aideTour;
    }
  }

  return { serviceTour, aideTour, selectionnerReveal };
};
