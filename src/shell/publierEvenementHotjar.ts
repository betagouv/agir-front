import Hotjar from '@hotjar/browser';

export enum HotjarEvenement {
  DEBRIEF = 'debrief',
}

export function publierEvenementHotjar(eventName: HotjarEvenement) {
  Hotjar.event(eventName);
}
