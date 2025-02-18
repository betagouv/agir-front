import {
  DonneesCollectivitesINSEE,
  RecupererDonneesCollectivitesInsee,
} from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { SimulerAideVeloRepositoryMock } from '../aides/adapters/simulerAideVelo.repository.mock';
import { AidesVeloDisponibles, SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';
import { DonneesCollectiviteRepositoryMock } from './adapters/donneesCollectivites.repository.mock';
import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
import { DonneesCollectivitesInseePresenterImpl } from '@/domaines/collectivites/adapters/donneesCollectivitesInsee.presenter.impl';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe("Fichier de test du usecase de récupération des données collectivités d'une collectivité ", () => {
  it('En donnant un code Insee, le fichier doit me retourner la liste des données utilisées', async () => {
    // GIVEN
    const donnees: DonneesCollectivitesINSEE = {
      aides: {
        nationales: [
          { id: 1, thematiques: [ClefThematiqueAPI.transports], titre: 'Aide nationale pour se déplacer' },
          { id: 2, thematiques: [ClefThematiqueAPI.climat], titre: "Aide nationale pour l'environnement" },
          { id: 3, thematiques: [ClefThematiqueAPI.logement], titre: 'Aide nationale pour le logement' },
          { id: 4, thematiques: [ClefThematiqueAPI.alimentation], titre: "Aide nationale pour l'alimentation" },
        ],
        regionales: [
          { id: 5, thematiques: [ClefThematiqueAPI.transports], titre: 'Aide régionale pour se déplacer' },
          { id: 6, thematiques: [ClefThematiqueAPI.climat], titre: "Aide régionale pour l'environnement" },
          { id: 7, thematiques: [ClefThematiqueAPI.logement], titre: 'Aide régionale pour le logement' },
          { id: 8, thematiques: [ClefThematiqueAPI.alimentation], titre: "Aide régionale pour l'alimentation" },
          { id: 9, thematiques: [ClefThematiqueAPI.consommation], titre: 'Aide régionale pour la consommation' },
        ],
        departementales: [
          { id: 10, thematiques: [ClefThematiqueAPI.transports], titre: 'Aide départementale pour se déplacer' },
          { id: 11, thematiques: [ClefThematiqueAPI.transports], titre: 'Aide2 départementale pour se déplacer' },
          { id: 12, thematiques: [ClefThematiqueAPI.climat], titre: "Aide départementale pour l'environnement" },
          { id: 13, thematiques: [ClefThematiqueAPI.logement], titre: 'Aide départementale pour le logement' },
          { id: 14, thematiques: [ClefThematiqueAPI.alimentation], titre: "Aide départementale pour l'alimentation" },
          { id: 15, thematiques: [ClefThematiqueAPI.consommation], titre: 'Aide départementale pour la consommation' },
        ],
        locales: [
          { id: 16, thematiques: [ClefThematiqueAPI.transports], titre: 'Aide locale pour se déplacer' },
          { id: 17, thematiques: [ClefThematiqueAPI.climat], titre: "Aide locale pour l'environnement" },
          { id: 18, thematiques: [ClefThematiqueAPI.logement], titre: 'Aide locale pour le logement' },
          { id: 19, thematiques: [ClefThematiqueAPI.alimentation], titre: "Aide locale pour l'alimentation" },
          { id: 20, thematiques: [ClefThematiqueAPI.consommation], titre: 'Aide locale pour la consommation' },
        ],
      },
      articles: {
        regionales: [
          { id: 21, thematiques: [ClefThematiqueAPI.transports], titre: 'Article régional pour se déplacer' },
          { id: 22, thematiques: [ClefThematiqueAPI.climat], titre: "Article régional pour l'environnement" },
          { id: 23, thematiques: [ClefThematiqueAPI.logement], titre: 'Article régional pour le logement' },
          { id: 24, thematiques: [ClefThematiqueAPI.alimentation], titre: "Article régional pour l'alimentation" },
          { id: 25, thematiques: [ClefThematiqueAPI.consommation], titre: 'Article régional pour la consommation' },
        ],
        departementales: [
          { id: 25, thematiques: [ClefThematiqueAPI.transports], titre: 'Article départemental pour se déplacer' },
          { id: 26, thematiques: [ClefThematiqueAPI.transports], titre: 'Article2 départemental pour se déplacer' },
          { id: 27, thematiques: [ClefThematiqueAPI.climat], titre: "Article départemental pour l'environnement" },
          { id: 28, thematiques: [ClefThematiqueAPI.logement], titre: 'Article départemental pour le logement' },
          { id: 29, thematiques: [ClefThematiqueAPI.alimentation], titre: "Article départemental pour l'alimentation" },
          {
            id: 30,
            thematiques: [ClefThematiqueAPI.consommation],
            titre: 'Article départemental pour la consommation',
          },
        ],
        locales: [
          { id: 31, thematiques: [ClefThematiqueAPI.transports], titre: 'Article local pour se déplacer' },
          { id: 32, thematiques: [ClefThematiqueAPI.climat], titre: "Article local pour l'environnement" },
          { id: 33, thematiques: [ClefThematiqueAPI.logement], titre: 'Article local pour le logement' },
          { id: 34, thematiques: [ClefThematiqueAPI.alimentation], titre: "Article local pour l'alimentation" },
          { id: 35, thematiques: [ClefThematiqueAPI.consommation], titre: 'Article local pour la consommation' },
        ],
      },
      nom: 'Lillers',
      departement: 'Pas-De-Calais',
      region: 'Hauts-de-France',
      estEPCI: false,
      listeCommunesPourEPCI: [],
      nombreDefisEnCours: 5,
      nombreDefisRealises: 2,
      nombreInscrits: 230,
      nombreInscritsLocaux: 10,
      nombrePointsMoyen: 100,
    };

    const aidesVelo: AidesVeloDisponibles = [
      {
        libelle: 'Aide vélo 1',
        lien: 'href',
        description: 'Aide nationale pour les vélos',
        logo: 'lien',
        collectivite: {
          kind: 'pays',
          value: 'France',
        },
      },
      {
        libelle: 'Aide vélo 2',
        lien: 'href',
        description: 'Aide agglomération pour les vélos',
        logo: 'lien',
        collectivite: {
          kind: 'epci',
          value: 'CU du Grand Reims',
          code: '200067213',
        },
      },
      {
        libelle: 'Aide vélo 3',
        lien: 'href',
        description: 'Aide régionale pour les vélos',
        logo: 'lien',
        collectivite: {
          kind: 'région',
          value: '62',
        },
      },
    ];

    const recupererDonneesCollectivitesInsee = new RecupererDonneesCollectivitesInsee(
      new DonneesCollectiviteRepositoryMock(donnees),
      new SimulerAideVeloRepositoryMock({} as SimulationVelo, aidesVelo),
    );

    // WHEN
    await recupererDonneesCollectivitesInsee.execute('75036', new DonneesCollectivitesInseePresenterImpl(expectation));

    // THEN
    function expectation(viewModel: DonneesCollectivitesInseeViewModel) {
      expect(viewModel).toStrictEqual<DonneesCollectivitesInseeViewModel>({
        nom: 'Lillers',
        departement: 'Pas-De-Calais',
        region: 'Hauts-de-France',
        indicationNombreUtilisateurs:
          'La collectivité compte <span class="text--bold">10</span> utilisateur(s) inscrit(s) parmi les <span class="text--bold">230</span> utilisateurs.',
        indicationAidesEtArticles: `<i>J'agis</i> recense <span class="text--bold">20</span> aides, ainsi que <span class="text--bold">16</span> articles pour vos habitants !`,
        cartesThematiques: [
          {
            emoji: '📺',
            titre: 'Mes achats',
            aides: [
              {
                id: 9,
                thematiques: [ClefThematiqueAPI.consommation],
                titre: 'Aide régionale pour la consommation',
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 9,
                  },
                },
              },
              {
                id: 15,
                thematiques: [ClefThematiqueAPI.consommation],
                titre: 'Aide départementale pour la consommation',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 15,
                  },
                },
              },
              {
                id: 20,
                thematiques: [ClefThematiqueAPI.consommation],
                titre: 'Aide locale pour la consommation',
                indicationGeographique: 'Lillers',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 20,
                  },
                },
              },
            ],
            articles: [
              {
                id: 25,
                thematiques: [ClefThematiqueAPI.consommation],
                titre: 'Article régional pour la consommation',
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 25,
                  },
                },
              },
              {
                id: 30,
                thematiques: [ClefThematiqueAPI.consommation],
                titre: 'Article départemental pour la consommation',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 30,
                  },
                },
              },
              {
                id: 35,
                thematiques: [ClefThematiqueAPI.consommation],
                titre: 'Article local pour la consommation',
                indicationGeographique: 'Lillers',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 35,
                  },
                },
              },
            ],
            contenusSupplementaires: [],
          },
          {
            emoji: '🍛',
            titre: 'Me nourrir',
            aides: [
              {
                id: 4,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Aide nationale pour l'alimentation",
                indicationGeographique: '🇫🇷',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 4,
                  },
                },
              },
              {
                id: 8,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Aide régionale pour l'alimentation",
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 8,
                  },
                },
              },
              {
                id: 14,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Aide départementale pour l'alimentation",
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 14,
                  },
                },
              },

              {
                id: 19,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Aide locale pour l'alimentation",
                indicationGeographique: 'Lillers',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 19,
                  },
                },
              },
            ],
            articles: [
              {
                id: 24,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Article régional pour l'alimentation",
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 24,
                  },
                },
              },
              {
                id: 29,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Article départemental pour l'alimentation",
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 29,
                  },
                },
              },
              {
                id: 34,
                thematiques: [ClefThematiqueAPI.alimentation],
                titre: "Article local pour l'alimentation",
                indicationGeographique: 'Lillers',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 34,
                  },
                },
              },
            ],
            contenusSupplementaires: [],
          },
          {
            emoji: '🚲',
            titre: 'Me déplacer',
            aides: [
              {
                id: 1,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Aide nationale pour se déplacer',
                indicationGeographique: '🇫🇷',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 1,
                  },
                },
              },
              {
                id: 5,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Aide régionale pour se déplacer',
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 5,
                  },
                },
              },
              {
                id: 10,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Aide départementale pour se déplacer',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 10,
                  },
                },
              },
              {
                id: 11,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Aide2 départementale pour se déplacer',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 11,
                  },
                },
              },
              {
                id: 16,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Aide locale pour se déplacer',
                indicationGeographique: 'Lillers',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 16,
                  },
                },
              },
            ],
            articles: [
              {
                id: 21,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Article régional pour se déplacer',
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 21,
                  },
                },
              },
              {
                id: 25,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Article départemental pour se déplacer',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 25,
                  },
                },
              },
              {
                id: 26,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Article2 départemental pour se déplacer',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 26,
                  },
                },
              },
              {
                id: 31,
                thematiques: [ClefThematiqueAPI.transports],
                titre: 'Article local pour se déplacer',
                indicationGeographique: 'Lillers',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 31,
                  },
                },
              },
            ],
            contenusSupplementaires: [
              {
                emoji: '🚲',
                titre: 'Les <span class="text--bleu">aides</span> pour l\'achat d\'un vélo',
                liste: [
                  '\n<span>\n  <span><a href="href" target="_blank">Aide vélo 1</a></span>\n  <span class="fr-text--sm line-clamp text--italic fr-mb-1v">Aide nationale pour les vélos</span>\n</span>',
                  '\n<span>\n  <span><a href="href" target="_blank">Aide vélo 2</a></span>\n  <span class="fr-text--sm line-clamp text--italic fr-mb-1v">Aide agglomération pour les vélos</span>\n</span>',
                  '\n<span>\n  <span><a href="href" target="_blank">Aide vélo 3</a></span>\n  <span class="fr-text--sm line-clamp text--italic fr-mb-1v">Aide régionale pour les vélos</span>\n</span>',
                ],
                thematiques: [ClefThematiqueAPI.transports],
              },
            ],
          },
          {
            emoji: '🧱',
            titre: 'Me loger',
            aides: [
              {
                id: 3,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Aide nationale pour le logement',
                indicationGeographique: '🇫🇷',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 3,
                  },
                },
              },
              {
                id: 7,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Aide régionale pour le logement',
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 7,
                  },
                },
              },
              {
                id: 13,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Aide départementale pour le logement',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 13,
                  },
                },
              },
              {
                id: 18,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Aide locale pour le logement',
                indicationGeographique: 'Lillers',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 18,
                  },
                },
              },
            ],
            articles: [
              {
                id: 23,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Article régional pour le logement',
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 23,
                  },
                },
              },
              {
                id: 28,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Article départemental pour le logement',
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 28,
                  },
                },
              },
              {
                id: 33,
                thematiques: [ClefThematiqueAPI.logement],
                titre: 'Article local pour le logement',
                indicationGeographique: 'Lillers',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 33,
                  },
                },
              },
            ],
            contenusSupplementaires: [],
          },
          {
            emoji: '☀️',
            titre: 'Environnement',
            aides: [
              {
                id: 2,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Aide nationale pour l'environnement",
                indicationGeographique: '🇫🇷',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 2,
                  },
                },
              },
              {
                id: 6,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Aide régionale pour l'environnement",
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 6,
                  },
                },
              },
              {
                id: 12,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Aide départementale pour l'environnement",
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 12,
                  },
                },
              },
              {
                id: 17,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Aide locale pour l'environnement",
                indicationGeographique: 'Lillers',
                url: {
                  name: 'aide-previsualisation',
                  params: {
                    id: 17,
                  },
                },
              },
            ],
            articles: [
              {
                id: 22,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Article régional pour l'environnement",
                indicationGeographique: 'Hauts-de-France',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 22,
                  },
                },
              },
              {
                id: 27,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Article départemental pour l'environnement",
                indicationGeographique: 'Pas-De-Calais',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 27,
                  },
                },
              },
              {
                id: 32,
                thematiques: [ClefThematiqueAPI.climat],
                titre: "Article local pour l'environnement",
                indicationGeographique: 'Lillers',
                url: {
                  name: 'article-previsualisation',
                  params: {
                    id: 32,
                  },
                },
              },
            ],
            contenusSupplementaires: [],
          },
        ],
        nombreInscrits: { total: 230, local: 10 },
      });
    }
  });
});
