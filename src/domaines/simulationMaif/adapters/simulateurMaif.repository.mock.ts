import {
  ResultatSimulationMaif,
  RisqueMaifImpact,
  SimulateurMaifRepository,
} from '@/domaines/simulationMaif/ports/simulateurMaif.repository';

export class SimulateurMaifRepositoryMock implements SimulateurMaifRepository {
  async recupererResultats(utilisateurId: string): Promise<ResultatSimulationMaif> {
    return Promise.resolve({
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
          impact: RisqueMaifImpact.TRES_FORT,
        },
        {
          nom: 'Evolution du trait de côte',
          description: '',
          image: 'maif-risque-defaut.webp',
          impact: RisqueMaifImpact.TRES_FAIBLE,
        },
        {
          nom: 'Séisme',
          description: '',
          image: 'maif-risque-defaut.webp',
          impact: RisqueMaifImpact.FAIBLE,
        },
      ],
      lienKit: '#',
    });
  }
}
