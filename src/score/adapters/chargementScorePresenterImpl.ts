import { ChargementScorePresenter, ScoreViewModel } from "@/score/ports/chargementScorePresenter";
import { Score } from "@/score/ports/scoreRepository";

export class ChargementScorePresenterImpl implements ChargementScorePresenter {
  constructor(dashboardViewModel: (viewmModel: ScoreViewModel) => void) {
    this._dashboardViewModel = dashboardViewModel;
  }

  private _dashboardViewModel: (viewmModel: ScoreViewModel) => void;

  presenteDashboard(utilisateur: string, dashboard: Score): void {
    this._dashboardViewModel({
      utilisateur,
      badges: dashboard.badges.map((badge) => {
        const date = new Date(badge.date);
        return {
          titre: badge.titre,
          date: `Obtenu le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        };
      }),
      score: dashboard.score,
    });
  }
}
