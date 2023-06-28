import { ChargementDashboardPresenter } from "@/dashboard/ports/chargementDashboard.presenter";
import { DashboardRepository } from "@/dashboard/ports/dashboardRepository";

export class ChargementDashboardUsecase {
  private dashboardRepository: DashboardRepository;
  constructor(dashboardRepository: DashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }
  async execute(idUtilisateur: string, presenter: ChargementDashboardPresenter): Promise<void> {
    const dashboard = await this.dashboardRepository.getDashboard(idUtilisateur);
    presenter.presenteDashboard(idUtilisateur, dashboard);
  }
}
