export type SimulateurMaifViewModel = {
  commune: string;
  chiffresCles: {
    valeur: string;
    label: string;
  }[];

  adresse?: string;
  risques?: {
    nom: string;
    description: string;
    image: string;
    badge?: {
      label: string;
      class: string;
    };
  }[];
  lienKit?: string;
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

  presenteAvecAdresse(): void {
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
      adresse: '1 rue de la République, 33000 Bordeaux',
      risques: [
        {
          nom: 'Sécheresse géotechnique',
          description: '',
          image: 'maif-risque-defaut.webp',
          badge: {
            label: 'Très fort',
            class: 'fr-badge--error fr-badge--no-icon',
          },
        },
        {
          nom: 'Evolution du trait de côte',
          description: '',
          image: 'maif-risque-defaut.webp',
        },
        {
          nom: 'Séisme',
          description: '',
          image: 'maif-risque-defaut.webp',
          badge: {
            label: 'Faible',
            class: 'fr-badge--green-tilleul-verveine fr-badge--no-icon',
          },
        },
      ],
      lienKit: '#',
    };

    this.callback(simulateur);
  }
}
