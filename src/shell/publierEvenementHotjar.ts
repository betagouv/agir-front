import { inject } from 'vue';

export enum HotjarEvenement {
  DEBRIEF = 'debrief',
}

export function publierEvenementHotjar(eventName: HotjarEvenement) {
  const hotjar = inject('Hotjar') as {
    event: (eventName: string) => void;
  };
  hotjar.event(eventName.toString());
}
