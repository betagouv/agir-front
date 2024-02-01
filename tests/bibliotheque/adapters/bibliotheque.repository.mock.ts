import { Bibliotheque, BibliothequeRepository } from '@/bibliotheque/ports/bibliotheque.repository';

export class BibliothequeRepositoryMock implements BibliothequeRepository {
  chargerBibliotheque(utilisateurId: string, filtres: string[]): Promise<Bibliotheque> {
    return Promise.resolve({
      ressources: [
        {
          titre: 'Par où commencer la rénovation de sa maison ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          contentId: '1',
          image: 'https://picsum.photos/300/200',
        },
        {
          titre: 'Le coût carbone d’un t-shirt',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          contentId: '1',
          image: 'https://picsum.photos/400/400',
        },
        {
          titre: 'C’est quoi 5 tonnes de CO2e ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          contentId: '1',
          image: 'https://picsum.photos/400/400',
        },
        {
          titre: 'Quelle est la mission de l’ADEME ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          contentId: '1',
          image: 'https://picsum.photos/300/200',
        },
      ],
      filtresThematiques: [
        {
          id: '0',
          label: '🛒 Consommation',
          checked: true,
        },
        {
          id: '1',
          label: '🏠 Logement',
          checked: true,
        },
        {
          id: '2',
          label: '🚲 Transports',
          checked: true,
        },
      ],
    });
  }
}
