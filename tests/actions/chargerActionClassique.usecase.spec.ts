import { ChargerActionStrategyFactory, ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe("Fichier de tests concernant la récupération d'une action de type classique", () => {
  it("En donnant l'id d'une action, on devrait pouvoir récupérer son entiereté", async () => {
    const action: ActionDetail = {
      thematique: ClefThematiqueAPI.alimentation,
      realisee: false,
      points: 100,
      consigne: 'Consigne',
      labelCompteur: '100 actions réalisées',
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
      code: 'id-action-test',
      nombreDeRealisations: 40,
      nombreAidesDisponibles: 0,
      type: TypeAction.CLASSIQUE,
      titre: 'Tester une nouvelle **recette végétarienne**',
      quizzes: [],
      sousTitre:
        'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
      commune: 'Noisiel',
      corps: {
        introduction:
          '## En **quelques mots**\n\n- Les repas à base de légumes sont en moyenne **30% moins chers** que ceux à base de viande.\n- Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !',
        astuces:
          '## Nos **astuces**\n\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.',
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
      services: [
        {
          type: 'recettes',
          parametreDuService: 'recette-vegetarienne',
        },
        {
          type: 'longue_vie_objets',
          parametreDuService: 'reparer',
        },
      ],
      faq: [
        {
          question: "Est-ce qu'un composteur ça coute cher ?",
          reponse: 'Pas tant que ça !',
        },
        {
          question: 'Quelle distance est considérée comme “locale” ?',
          reponse:
            'Il n’y a pas de définition unique, mais en général, on peut considérer un produit comme local **à l’échelle de la région**, ou lorsqu’il provient d’une zone géographique proche, souvent **dans un rayon de 200 km.**',
        },
        {
          question:
            'Comment faire pour les produits de base qui ne viennent pas de France, comme les huiles, les pâtes ou le riz ?',
          reponse:
            'Certains produits peuvent effectivement ne pas être produits localement. Il ne s’agit pas d’arrêter de consommer tout ce qui ne vient pas du village d’à côté, mais plutôt de **réduire les importations**. \nDans la mesure du possible, il vaut mieux privilégier au moins ce qui est **produit en France**, voire en Europe. Pour le reste, vous pouvez par exemple vous tourner vers **les produits labellisés**, qui garantissent des pratiques durables ou le commerce équitable.',
        },
      ],
      sources: [],
      idEnchainementKYCs: '',
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
        expected,
        () => {},
        () => {},
        () => {},
      ),
    );
    await usecase.execute('id-utilisateur', 'id-action', TypeAction.CLASSIQUE);

    function expected(viewModel: ActionClassiqueViewModel): void {
      expect(viewModel).toStrictEqual<ActionClassiqueViewModel>({
        realisee: false,
        points: 100,
        nombreDeRealisations: 40,
        consigne: 'Consigne',
        labelCompteur: '100 actions réalisées',
        actionId: 'id-action-test',
        titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
        titreAffiche: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
        titrePropre: 'Tester une nouvelle recette végétarienne',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        commune: 'Noisiel',
        astuces: `<h2>Nos <span class="text--bold">astuces</span></h2><ul>
<li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.</li>
</ul>
`,
        introduction: `<h2>En <span class="text--bold">quelques mots</span></h2><ul>
<li>Les repas à base de légumes sont en moyenne <span class="text--bold">30% moins chers</span> que ceux à base de viande.</li>
<li>Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !</li>
</ul>
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
        services: [
          {
            parametreDuService: 'recette-vegetarienne',
            type: 'recettes',
          },
          {
            parametreDuService: 'reparer',
            type: 'longue_vie_objets',
          },
        ],
        aides: [
          {
            titre: 'Titre aide 1',
            id: 'id-aide-1',
            partenaireNom: 'Partenaire',
            partenaireImg: 'partenaire_img.png',
            titreUrl: 'titre-aide-1',
            montantMaximum: '1 200&nbsp;€',
            estGratuit: false,
          },
          {
            titre: 'Titre aide 2',
            id: 'id-aide-2',
            partenaireNom: 'Partenaire2',
            partenaireImg: 'partenaire_img2.png',
            titreUrl: 'titre-aide-2',
            montantMaximum: '1 200&nbsp;€',
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
        faq: [
          {
            question: "Est-ce qu'un composteur ça coute cher ?",
            reponse: 'Pas tant que ça !',
          },
          {
            question: 'Quelle distance est considérée comme “locale” ?',
            reponse:
              'Il n’y a pas de définition unique, mais en général, on peut considérer un produit comme local <span class="text--bold">à l’échelle de la région</span>, ou lorsqu’il provient d’une zone géographique proche, souvent <span class="text--bold">dans un rayon de 200 km.</span>',
          },
          {
            question:
              'Comment faire pour les produits de base qui ne viennent pas de France, comme les huiles, les pâtes ou le riz ?',
            reponse:
              'Certains produits peuvent effectivement ne pas être produits localement. Il ne s’agit pas d’arrêter de consommer tout ce qui ne vient pas du village d’à côté, mais plutôt de <span class="text--bold">réduire les importations</span>. \nDans la mesure du possible, il vaut mieux privilégier au moins ce qui est <span class="text--bold">produit en France</span>, voire en Europe. Pour le reste, vous pouvez par exemple vous tourner vers <span class="text--bold">les produits labellisés</span>, qui garantissent des pratiques durables ou le commerce équitable.',
          },
        ],
        sources: [],
      });
    }
  });
});
