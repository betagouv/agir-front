import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaifPresenter } from '@/domaines/simulationMaif/ports/statistiquesCommuneMaif.presenter';
import { Coordonnees } from '@/shell/coordonneesType';

export type StatistiquesCommuneMaif = {
  commune: string;
  nombreArretsCatnat: number;
  pourcentageSurfaceSecheresseGeotech: number;
  pourcentageSurfaceInondation: number;
};

export class AdresseDansLeCompte {
  constructor(
    private readonly _codePostal: string,
    private readonly _commune: string,
    private readonly _communeLabel: string,
    private readonly _rue: string,
    private readonly _numeroRue: string,
    private readonly coordonnees: Coordonnees,
  ) {}

  get codePostal(): string {
    return this._codePostal;
  }

  get commune(): string {
    return this._commune;
  }

  get communeLabel(): string {
    return this._communeLabel;
  }

  get rue(): string {
    return this._rue;
  }

  get numeroRue(): string {
    return this._numeroRue;
  }

  get latitude(): number {
    return this.coordonnees.latitude;
  }

  get longitude(): number {
    return this.coordonnees.longitude;
  }

  estAdresseComplete(): boolean {
    return !(!this.coordonnees || !this._rue || !this._numeroRue);
  }
}

export type StatistiquesCommuneEtAdresse = {
  statistiquesCommune: StatistiquesCommuneMaif;
  adresseDansLeCompte: AdresseDansLeCompte;
};

export class RecupererStatistiquesCommuneMaifUsecase {
  constructor(private readonly simulationMaifRepository: SimulateurMaifRepository) {}

  async execute(
    utilisateurId: string,
    statistiquesCommuneMaifPresenter: StatistiquesCommuneMaifPresenter,
    codeEpci?: string,
  ): Promise<void> {
    const statistiquesCommune = await this.simulationMaifRepository.recupererStatistiquesCommune(
      utilisateurId,
      codeEpci,
    );
    statistiquesCommuneMaifPresenter.presente(statistiquesCommune);
  }
}
