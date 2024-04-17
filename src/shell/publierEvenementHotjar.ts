import Hotjar from '@hotjar/browser';

export enum HotjarEvenement {
  DEBRIEF = 'debrief',
}

export function publierEvenementHotjar(eventName: HotjarEvenement) {
  if (Hotjar.isReady()) {
    Hotjar.event(eventName);
  }
}
