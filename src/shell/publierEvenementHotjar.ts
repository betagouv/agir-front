export enum HotjarEvenement {
  DEBRIEF = 'debrief',
}

export function publierEvenementHotjar(
  hotjar: {
    event: (eventName: string) => void;
  },
  eventName: HotjarEvenement
) {
  hotjar.event(eventName.toString());
}
