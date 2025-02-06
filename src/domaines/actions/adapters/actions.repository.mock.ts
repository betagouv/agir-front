import { Action, ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class ActionsRepositoryMock implements ActionsRepository {
  chargerAction(): Promise<Action> {
    return Promise.resolve({
      titre: 'Tester une nouvelle recette végétarienne',
      sousTitre:
        'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
      corps: {
        introduction:
          '<h2>En quelques mots</h2><p><ul><li>Les repas à base de légumes sont en moyenne 30% moins chers que ceux à base de viande.</li><li>Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !</li></ul></p>',
        astuces:
          '<h2>Nos astuces</h2><p><ul><li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes au légumes, chili sin carne, re-découvrez vos plats favoris en version végétariennes </li><li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes au légumes, chili sin carne, re-découvrez vos plats favoris en version végétariennes </li><li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes au légumes, chili sin carne, re-découvrez vos plats favoris en version végétariennes </li><li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes au légumes, chili sin carne, re-découvrez vos plats favoris en version végétariennes </li></ul></p>',
      },
      recommandations: [
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '',
          url: '',
        },
      ],
    });
  }
}
