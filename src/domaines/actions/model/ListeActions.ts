import { Action } from '@/domaines/actions/ports/actions.repository';

export class ListeActions {
  constructor(private readonly actions: Action[]) {}

  getActionsTrieParRecommande(): Action[] {
    return [...this.actions].sort((a, b) => {
      const aRecommandee = a.explicationsRecommandations.estRecommandee();
      const bRecommandee = b.explicationsRecommandations.estRecommandee();
      if (aRecommandee === bRecommandee) return 0;
      return aRecommandee ? -1 : 1;
    });
  }
}
