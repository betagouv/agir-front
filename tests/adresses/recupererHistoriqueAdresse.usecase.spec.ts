import { describe, expect, it, vi } from 'vitest';
import {
  AdresseHistorique,
  RecupererHistoriqueAdresseUsecase,
} from '@/domaines/adresses/recupererHistoriqueAdresse.usecase';
import { HistoriqueAdresseRepository } from '@/domaines/adresses/ports/historiqueAdresse.repository';

describe('RecupererHistoriqueAdresseUsecase', () => {
  const mockRepository = {
    recupererHistoriqueAdresse: vi.fn().mockImplementation((_: string) => Promise.resolve([] as AdresseHistorique[])),
    ajouterAdresseHistorique: vi.fn().mockImplementation((_: string, __: AdresseHistorique) => Promise.resolve()),
    supprimerAdresseHistorique: vi.fn().mockImplementation((_: string, __: string) => Promise.resolve()),
  } satisfies HistoriqueAdresseRepository;

  const adressesTest: AdresseHistorique[] = [
    {
      id: '1',
      code_commune: '75056',
      commmune: 'Paris',
      code_postal: '75001',
      numero_rue: '1',
      rue: 'rue de Rivoli',
      longitude: 2.3522,
      latitude: 48.8566,
      date_creation: '2025-08-01T10:00:00.000Z',
    },
    {
      id: '2',
      code_commune: '75056',
      commmune: 'Paris',
      code_postal: '75002',
      numero_rue: '2',
      rue: 'rue de la Paix',
      longitude: 2.3522,
      latitude: 48.8566,
      date_creation: '2025-08-03T10:00:00.000Z',
    },
    {
      id: '3',
      code_commune: '75056',
      commmune: 'Paris',
      code_postal: '75003',
      numero_rue: '3',
      rue: 'rue du Temple',
      longitude: 2.3522,
      latitude: 48.8566,
      date_creation: '2025-08-02T10:00:00.000Z',
    },
  ];

  it('devrait récupérer les 2 adresses les plus récentes triées par date', async () => {
    mockRepository.recupererHistoriqueAdresse.mockResolvedValue(adressesTest);
    const usecase = new RecupererHistoriqueAdresseUsecase(mockRepository);

    await new Promise<void>(resolve => {
      usecase.execute('user123', adresses => {
        expect(adresses).toHaveLength(2);
        expect(adresses[0].id).toBe('2'); // L'adresse la plus récente
        expect(adresses[1].id).toBe('3'); // La deuxième plus récente
        resolve();
      });
    });
  });

  it("devrait retourner un tableau vide en cas d'erreur", async () => {
    mockRepository.recupererHistoriqueAdresse.mockRejectedValue(new Error('Erreur test'));
    const usecase = new RecupererHistoriqueAdresseUsecase(mockRepository);

    await new Promise<void>(resolve => {
      usecase.execute('user123', adresses => {
        expect(adresses).toHaveLength(0);
        resolve();
      });
    });
  });

  it('devrait appeler le repository avec le bon ID utilisateur', async () => {
    mockRepository.recupererHistoriqueAdresse.mockResolvedValue(adressesTest);
    const usecase = new RecupererHistoriqueAdresseUsecase(mockRepository);
    const userId = 'user123';

    await new Promise<void>(resolve => {
      usecase.execute(userId, () => {
        expect(mockRepository.recupererHistoriqueAdresse).toHaveBeenCalledWith(userId);
        resolve();
      });
    });
  });
});
