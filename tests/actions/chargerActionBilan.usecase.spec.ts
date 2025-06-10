import { ChargerActionStrategyFactory, ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
import { ActionBilanViewModel } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';

describe("Fichier de tests concernant la récupération d'une action de type bilan", () => {
  it("En donnant l'id d'une action, on devrait pouvoir récupérer son entiereté", async () => {
    const action: ActionDetail = {
      thematique: ClefThematiqueAPI.alimentation,
      realisee: false,
      points: 30,
      consigne: 'Consigne',
      labelCompteur: '100 bilans réalisés',
      aides: [
        {
          titre: 'Titre aide 1',
          id: 'id-aide-1',
          partenaireNom: 'Partenaire',
          partenaireImg: 'partenaire_img.png',
          montantMaximum: 1200,
          estGratuit: false,
        },
        {
          titre: 'Titre aide 2',
          id: 'id-aide-2',
          partenaireNom: 'Partenaire2',
          partenaireImg: 'partenaire_img2.png',
          montantMaximum: 1200,
          estGratuit: false,
        },
        {
          titre: 'Titre aide 2',
          id: 'id-aide-2',
          partenaireNom: 'Partenaire2',
          partenaireImg: 'partenaire_img2.png',
          montantMaximum: undefined,
          estGratuit: true,
        },
      ],
      quizzFelicitations: '',
      code: 'id-action-bilan-test',
      nombreDeRealisations: 40,
      nombreAidesDisponibles: 0,
      type: TypeAction.BILAN,
      titre: '**Bilan logement**',
      quizzes: [],
      sousTitre: 'Bilan logement sous titre',
      commune: 'Noisiel',
      corps: {
        introduction: '## En **quelques mots**\n\n-, Pourquoi est-ce important de faire son bilan ?',
        astuces: '',
      },
      articles: [
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '/temp_les_bases_alim_vege.png',
          id: '1',
        },
        {
          titre: 'Comment répondre à ses besoins nutritionnels sans viande ?',
          image: '/temp_comment_repondre_besoins_nutri.png',
          id: '2',
        },
        {
          titre: '10 recettes végétariennes pour les fêtes',
          image: '/temp_10_recettes_pour_fetes.png',
          id: '3',
        },
      ],
      services: [],
      faq: [],
      sources: [
        {
          label: 'Sources',
          url: 'https://www.ademe.fr/particuliers-eco-citoyens/eco-gestes/guide-eco-gestes',
        },
      ],
      idEnchainementKYCs: 'id-enchainement-bilan',
      explicationsRecommandations: new ExplicationsRecommandation(false, [
        { labelExplication: 'Vous mangez de la viande', tag: 'manger-viande' },
        { labelExplication: 'Vous habitez en appartement', tag: 'vivre-appartement' },
      ]),
    };
    const usecase = new ChargerActionUsecase(
      new ChargerActionStrategyFactory(
        new ChargerActionClassiqueUsecase(),
        new ChargerActionQuizUsecase(),
        new ChargerActionSimulateurUsecase(),
        new ChargerActionBilanUsecase(),
      ),
      ActionsRepositoryMock.avecActionDetail(action),
      new ActionPresenterImpl(
        () => {},
        () => {},
        () => {},
        expected,
      ),
    );
    await usecase.execute('id-utilisateur', 'id-action', TypeAction.BILAN);

    function expected(viewModel: ActionBilanViewModel): void {
      expect(viewModel).toStrictEqual<ActionBilanViewModel>({
        realisee: false,
        points: 30,
        consigne: 'Consigne',
        labelCompteur: '100 bilans réalisés',
        nombreDeRealisations: 40,
        titre: '<span class="text--bold">Bilan logement</span>',
        titreAffiche: '<span class="text--bold">Bilan logement</span>',
        titrePropre: 'Bilan logement',
        sousTitre: 'Bilan logement sous titre',
        introduction: `<h2>En <span class="text--bold">quelques mots</span></h2><p>-, Pourquoi est-ce important de faire son bilan ?</p>
`,
        articlesRecommandes: [
          {
            image: '/temp_les_bases_alim_vege.png',
            titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
            url: '/article/les-bases-de-l-alimentation-vegetarienne-par-ou-commencer-/1',
          },
          {
            image: '/temp_comment_repondre_besoins_nutri.png',
            titre: 'Comment répondre à ses besoins nutritionnels sans viande ?',
            url: '/article/comment-repondre-a-ses-besoins-nutritionnels-sans-viande-/2',
          },
          {
            image: '/temp_10_recettes_pour_fetes.png',
            titre: '10 recettes végétariennes pour les fêtes',
            url: '/article/10-recettes-vegetariennes-pour-les-fetes/3',
          },
        ],
        aides: [
          {
            titre: 'Titre aide 1',
            id: 'id-aide-1',
            partenaireNom: 'Partenaire',
            partenaireImg: 'partenaire_img.png',
            titreUrl: 'titre-aide-1',
            montantMaximum: '1 200 €',
            estGratuit: false,
          },
          {
            titre: 'Titre aide 2',
            id: 'id-aide-2',
            partenaireNom: 'Partenaire2',
            partenaireImg: 'partenaire_img2.png',
            titreUrl: 'titre-aide-2',
            montantMaximum: '1 200 €',
            estGratuit: false,
          },
          {
            titre: 'Titre aide 2',
            id: 'id-aide-2',
            partenaireNom: 'Partenaire2',
            partenaireImg: 'partenaire_img2.png',
            titreUrl: 'titre-aide-2',
            montantMaximum: undefined,
            estGratuit: true,
          },
        ],
        actionId: 'id-action-bilan-test',
        thematique: ClefThematiqueAPI.alimentation,
        sources: [
          {
            label: 'Sources',
            url: 'https://www.ademe.fr/particuliers-eco-citoyens/eco-gestes/guide-eco-gestes',
          },
        ],
        idEnchainementKYCs: 'id-enchainement-bilan',
        explicationsRecommandation: {
          titre: '<span class="text--bold">Recommandée</span> pour vous car',
          justifications: ['Vous mangez de la viande', 'Vous habitez en appartement'],
        },
      });
    }
  });
});
