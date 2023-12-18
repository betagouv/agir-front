import { inject } from 'vue';

export enum HotjarEvenement {
  DEBRIEF = 'debrief',
}

const hotjar = inject('Hotjar') as {
  event: (eventName: string) => void;
};

export function publierEvenementHotjar(eventName: HotjarEvenement) {
  hotjar.event(eventName);
}
