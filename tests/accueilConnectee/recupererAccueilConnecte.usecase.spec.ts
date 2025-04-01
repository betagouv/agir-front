import { RecupererAccueilConnecteUsecase } from '@/domaines/accueilConnecte/recupererAccueilConnecteUsecase';
import { AccueilConnectePresenterImpl } from '@/domaines/accueilConnecte/adapters/accueilConnecte.presenter.impl';
import { expect } from 'vitest';
import { AccueilConnecteViewModel } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
import { AccueilConnecteRepository } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';

class AccueilConnecteeMockRepository implements AccueilConnecteRepository {
  async recupererAccueilConnecte(_utilisateurId: string) {
    return {
      commune: 'commune',
      totalActionsNationalesFaites: 10,
      totalActionsUtilisateurFaites: 5,
      pourcentageCompletionBilan: 10,
      nombreAides: 20,
      nombreRecettes: 30,
      bilanCarboneTotalKg: 5,
    };
  }
}

describe('Fichier de tests concernant la home connectée', () => {
  it('Doit récupérer les informations pour la home connectée', async () => {
    // GIVEN
    const usecase = new RecupererAccueilConnecteUsecase(new AccueilConnecteeMockRepository());

    // WHEN
    await usecase.execute(
      'utilisateurId',
      new AccueilConnectePresenterImpl(vm => {
        expect(vm).toStrictEqual<AccueilConnecteViewModel>({
          commune: 'commune',
          progression: {
            nombreActionsTerminees: 5,
            pourcentageCompletionBilan: 10,
            tonneBilan: '0',
          },
          raccourcis: [
            {
              emoji: '🛒',
              label: 'Des adresses pour manger local',
              to: {
                name: 'pres-de-chez-nous',
                params: {
                  thematiqueId: 'me-nourrir',
                },
              },
            },
            {
              emoji: '💶',
              label: '20 aides financières sur votre territoire',
              to: {
                name: 'aides',
              },
            },
            {
              emoji: '🚲',
              label: '1 simulateur Mes aides vélo',
              to: {
                name: 'aides-velo',
              },
            },
            {
              emoji: '🧱',
              href: 'https://mesaidesreno.beta.gouv.fr/',
              label: '1 simulateur Mes aides Rénov',
            },
            {
              emoji: '🥘',
              label: '30 recettes délicieuses, saines et de saison',
              to: {
                name: 'recettes',
                params: {
                  thematiqueId: 'me-nourrir',
                },
              },
            },
            {
              emoji: '🚙',
              label: '1 simulateur Changer de voiture',
              to: {
                name: 'action-individuelle',
                params: {
                  id: 'action_simulateur_voiture',
                  titre: 'trouver-le-type-de-voiture-qui-vous-convient-le-mieux',
                  type: 'simulateur',
                },
              },
            },
            {
              emoji: '🍓',
              label: '1 calendrier de fruits et légumes de saison',
              to: {
                name: 'fruits-et-legumes',
                params: {
                  thematiqueId: 'me-nourrir',
                },
              },
            },
            {
              emoji: '🔧',
              label: 'Des points de réparation près de chez moi',
              to: {
                name: 'longue-vie-aux-objets',
                params: {
                  thematiqueId: 'consommer',
                },
              },
            },
          ],
          totalActionsRealisees: 10,
        });
      }),
    );
    // THEN
  });
});
