import { ChargementDashboardPresenter } from "../../src/dashboard/ports/chargementDashboard.presenter";

export class DashboardPresenterSpy implements ChargementDashboardPresenter {
  get utilisateur(): string {
    return this._utilisateur;
  }
  private _utilisateur: string = "";
  get consommationActuelle(): number {
    return this._consommationActuelle;
  }
  private _consommationActuelle: number = 0;
  presentDashboard(utilisateur: string, consommationActuelle: number): void {
    this._consommationActuelle = consommationActuelle;
    this._utilisateur = utilisateur;
  }
}
