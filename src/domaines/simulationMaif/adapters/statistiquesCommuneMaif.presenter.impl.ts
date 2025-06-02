import { StatistiquesCommuneMaifPresenter } from '@/domaines/simulationMaif/ports/statistiquesCommuneMaif.presenter';
import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';

export type StatistiquesCommuneMaifViewModel = {
  commune: string;
  chiffresCles: {
    illustration?: string;
    valeur: string;
    label: string;
  }[];
};

export class StatistiquesCommunesMaifPresenterImpl implements StatistiquesCommuneMaifPresenter {
  constructor(private readonly callback: (simulateur: StatistiquesCommuneMaifViewModel) => void) {}

  presente(statistiquesCommuneMaif: StatistiquesCommuneMaif): void {
    this.callback({
      commune: statistiquesCommuneMaif.commune,
      chiffresCles: [
        {
          valeur: statistiquesCommuneMaif.nombreArretsCatnat.toString(),
          label: "<span class='text--bold display-block'>arrêtés CATNAT</span> depuis 1982",
        },
        {
          illustration: '/maif/argiles.svg',
          valeur: `${statistiquesCommuneMaif.pourcentageSurfaceSecheresseGeotech} %`,
          label: "de la surface exposée <span class='text--bold display-block'>à la sécheresse géotechnique</span>",
        },
        {
          illustration: '/maif/inondations.svg',
          valeur: `${statistiquesCommuneMaif.pourcentageSurfaceInondation} %`,
          label: "de la surface exposée <span class='text--bold display-block'>à l’inondation</span>",
        },
      ],
    });
  }
}
