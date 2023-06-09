import { ChargementDashboardPresenter } from "@/dashboard/ports/chargementDashboard.presenter.ts";
import { DashboardRepository } from "@/dashboard/ports/dashboardRepository.ts";

export class ChargementDashboardUsecase {
  private dashboardRepository: DashboardRepository;
  constructor(dashboardRepository: DashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }
  async execute(utilisateur: string, presenter: ChargementDashboardPresenter): Promise<void> {
    const dashboard = await this.dashboardRepository.getDashboard(utilisateur);
    presenter.presenteDashboard(utilisateur, dashboard);
  }
}
