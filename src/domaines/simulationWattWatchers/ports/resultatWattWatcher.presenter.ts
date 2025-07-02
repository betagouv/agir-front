import { ResultatWattWatchers } from '@/domaines/simulationWattWatchers/recupererConsommation.usecase';

export interface ResultatWattWatcherPresenter {
  presenteResultatWattWatcher(resultat: ResultatWattWatchers): void;
}
