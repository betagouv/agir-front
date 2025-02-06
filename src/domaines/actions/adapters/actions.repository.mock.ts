import { Action, ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class ActionsRepositoryMock implements ActionsRepository {
  chargerAction(): Promise<Action> {
    return Promise.resolve({
      titre: 'Tester une nouvelle **recette végétarienne**',
      sousTitre:
        'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
      corps: {
        introduction:
          '## En **quelques mots**\n\n- Les repas à base de légumes sont en moyenne **30% moins chers** que ceux à base de viande.\n- Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !',
        astuces:
          '## Nos **astuces**\n\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.',
      },
      recommandations: [
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '',
          url: '',
        },
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '',
          url: '',
        },
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '',
          url: '',
        },
      ],
    });
  }
}
