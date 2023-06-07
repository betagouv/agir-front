import { ChargementDashboardPresenter } from "@/dashboard/ports/chargementDashboard.presenter.ts";

export class ChargementDashboardUsecase {
  execute(utilisateur: string, presenter: ChargementDashboardPresenter): void {
    presenter.presentDashboard(utilisateur, 10);
  }
}
