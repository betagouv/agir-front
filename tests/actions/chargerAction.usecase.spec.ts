import { describe, expect } from 'vitest';
import { ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/action.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';

describe("Fichier de tests concernant la récupération d'une action", () => {
  it("En donnant l'id d'une action, on devrait pouvoir récupérer son entiereté", () => {
    const action: Action = {
      titre: 'Tester une nouvelle **recette végétarienne**',
      sousTitre:
        'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
      corps: {
        introduction:
          '## En **quelques mots**\n\n- Les repas à base de légumes sont en moyenne **30% moins chers** que ceux à base de viande.\n- Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !',
        astuces:
          '## Nos **astuces**\n\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.',
      },
      recommandations: [
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '/temp_les_bases_alim_vege.png',
          url: '',
        },
        {
          titre: 'Comment répondre à ses besoins nutritionnels sans viande ?',
          image: '/temp_comment_repondre_besoins_nutri.png',
          url: '',
        },
        {
          titre: '10 recettes végétariennes pour les fêtes',
          image: '/temp_10_recettes_pour_fetes.png',
          url: '',
        },
      ],
    };
    const usecase = new ChargerActionUsecase(new ActionsRepositoryMock(action));
    usecase.execute('id-action-test', new ActionPresenterImpl(expected));

    function expected(viewModel: ActionViewModel): void {
      expect(viewModel).toStrictEqual({
        titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        corps: {
          astuces: `<h2>Nos <span class="text--bold">astuces</span></h2>
<ul>
<li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.</li>
</ul>
`,
          introduction: `<h2>En <span class="text--bold">quelques mots</span></h2>
<ul>
<li>Les repas à base de légumes sont en moyenne <span class="text--bold">30% moins chers</span> que ceux à base de viande.</li>
<li>Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !</li>
</ul>
`,
        },
        recommandations: [
          {
            image: '/temp_les_bases_alim_vege.png',
            titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
            url: '',
          },
          {
            image: '/temp_comment_repondre_besoins_nutri.png',
            titre: 'Comment répondre à ses besoins nutritionnels sans viande ?',
            url: '',
          },
          {
            image: '/temp_10_recettes_pour_fetes.png',
            titre: '10 recettes végétariennes pour les fêtes',
            url: '',
          },
        ],
      });
    }
  });
});
