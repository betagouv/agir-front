import { BarreDeRecherchePresenter } from '@/domaines/logement/ports/barreDeRecherche.presenter';
import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaifPresenter } from '@/domaines/simulationMaif/ports/statistiquesCommuneMaif.presenter';
import { Coordonnees } from '@/shell/coordonneesType';

export type StatistiquesCommuneMaif = {
  commune: string;
  nombreArretsCatnat: number;
  pourcentageSurfaceSecheresseGeotech: number;
  pourcentageSurfaceInondation: number;
};

export type AdresseDansLeCompte = {
  codePostal: string;
  commune: string;
  communeLabel: string;
  rue: string;
  numeroRue: string;
  coordonnees: Coordonnees;
};

export type StatistiquesCommuneEtAdresse = {
  statistiquesCommune: StatistiquesCommuneMaif;
  adresse: AdresseDansLeCompte;
};

export class RecupererAdresseEtStatistiquesCommuneMaifUsecase {
  constructor(private readonly simulationMaifRepository: SimulateurMaifRepository) {}

  async execute(
    utilisateurId: string,
    statistiquesCommuneMaifPresenter: StatistiquesCommuneMaifPresenter,
    adresseDansLeComptePresenter: BarreDeRecherchePresenter,
  ): Promise<void> {
    const { statistiquesCommune, adresse } =
      await this.simulationMaifRepository.recupererStatistiquesCommuneEtAdresse(utilisateurId);
    statistiquesCommuneMaifPresenter.presente(statistiquesCommune);
    adresseDansLeComptePresenter.presente(adresse);
  }
}
