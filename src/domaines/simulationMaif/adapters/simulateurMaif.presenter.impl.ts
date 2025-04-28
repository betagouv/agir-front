export type SimulateurMaifViewModel = {
  commune: string;
  chiffresCles: {
    valeur: string;
    label: string;
  }[];
};

export class SimulateurMaifPresenterImpl {
  constructor(private readonly callback: (simulateur: SimulateurMaifViewModel) => void) {}

  presente(): void {
    const simulateur: SimulateurMaifViewModel = {
      commune: 'Bordeaux',
      chiffresCles: [
        {
          valeur: '8',
          label: '<span class="text--bold">arrêtés CATNAT</span> depuis 1982',
        },
        {
          valeur: '87%',
          label: 'de la surface exposée <span class="text--bold">à la sécheresse géotechnique</span>',
        },
        {
          valeur: '22%',
          label: 'de la surface exposée <span class="text--bold">à l’inondation</span>',
        },
      ],
    };

    this.callback(simulateur);
  }
}
