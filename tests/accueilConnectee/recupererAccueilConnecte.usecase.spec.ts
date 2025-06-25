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
      pourcentageGlobalRecommandations: 25,
      pourcentageAlimentationRecommandations: 100,
      pourcentageTransportRecommandations: 100,
      pourcentageConsommationRecommandations: 50,
      pourcentageLogementRecommandations: 0,
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
            pourcentageCompletionBilan: 10,
            tonneBilan: 0,
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
              label: '1 simulateur Mes Aides Vélo',
              to: {
                name: 'aides-velo',
              },
            },
            {
              emoji: '🧱',
              label: '1 simulateur Mes Aides Réno',
              to: {
                name: 'action-individuelle',
                params: {
                  id: 'simu_aides_reno',
                  titre: 'calculer-vos-aides-pour-renover-votre-logement',
                  type: 'simulateur',
                },
              },
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
          completionGlobaleRecommandations: 25,
          thematiquesEtCompletion: [
            {
              clefTechniqueAPI: 'alimentation',
              url: 'me-nourrir',
              labelDansLeMenu: 'Me nourrir',
              imageUrl:
                'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728466523/cuisine_da54797693.svg',
              emoji: '🍛',
              illustration: '/thematique-alimentation.svg',
              estComplete: true,
            },
            {
              clefTechniqueAPI: 'logement',
              url: 'me-loger',
              labelDansLeMenu: 'Me loger',
              imageUrl:
                'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728468978/maison_80242d91f3.svg',
              emoji: '🏠',
              illustration: '/thematique-logement.svg',
              estComplete: false,
            },
            {
              clefTechniqueAPI: 'transport',
              url: 'me-deplacer',
              labelDansLeMenu: 'Me déplacer',
              imageUrl:
                'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728466903/Mobilite_df75aefd09.svg',
              emoji: '🚅',
              illustration: '/thematique-transport.svg',
              estComplete: true,
            },
            {
              clefTechniqueAPI: 'consommation',
              url: 'consommer',
              labelDansLeMenu: 'Mes achats',
              imageUrl:
                'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1728468852/conso_7522b1950d.svg',
              emoji: '👕',
              illustration: '/thematique-consommation.svg',
              estComplete: false,
            },
          ],
        });
      }),
    );
  });
});
