import { Bibliotheque, BibliothequeRepository } from '@/domaines/bibliotheque/ports/bibliotheque.repository';

export class BibliothequeRepositoryMock implements BibliothequeRepository {
  chargerBibliotheque(_utilisateurId: string): Promise<Bibliotheque> {
    return Promise.resolve({
      ressources: [
        {
          titre: 'Par où commencer la rénovation de sa maison ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '1',
          image: 'https://picsum.photos/300/200',
          favoris: false,
        },
        {
          titre: 'Le coût carbone d’un t-shirt',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '2',
          image: 'https://picsum.photos/400/400',
          favoris: false,
        },
        {
          titre: 'C’est quoi 5 tonnes de CO2e ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '3',
          image: 'https://picsum.photos/400/400',
          favoris: false,
        },
        {
          titre: 'Quelle est la mission de l’ADEME ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '4',
          image: 'https://picsum.photos/300/200',
          favoris: false,
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
          label: '🚅 Transports',
          checked: true,
        },
      ],
    });
  }

  filtrerBibliotheque(_utilisateurId: string, _filtreThematiquesIds: string[], _titre: string): Promise<Bibliotheque> {
    return Promise.resolve({
      ressources: [
        {
          titre: 'Par où commencer la rénovation de sa maison ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '1',
          image: 'https://picsum.photos/300/200',
          favoris: false,
        },
        {
          titre: 'Le coût carbone d’un t-shirt',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '2',
          image: 'https://picsum.photos/400/400',
          favoris: false,
        },
        {
          titre: 'C’est quoi 5 tonnes de CO2e ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '3',
          image: 'https://picsum.photos/400/400',
          favoris: false,
        },
        {
          titre: 'Quelle est la mission de l’ADEME ?',
          thematique: '🌍 Global',
          description: 'lorem ipsum dolor description un peu longue hello',
          idDuContenu: '4',
          image: 'https://picsum.photos/300/200',
          favoris: false,
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
          label: '🚅 Transports',
          checked: true,
        },
      ],
    });
  }
}
