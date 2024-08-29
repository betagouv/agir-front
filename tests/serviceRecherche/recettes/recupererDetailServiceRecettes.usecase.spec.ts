import { RecupererDetailServiceRecettesUsecase } from '../../../src/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';
import { ServiceRechercheRecettesMock } from './adapters/serviceRechercheRecettes.repository.mock';
import {
  RecettePresenterImpl,
  RecetteViewModel,
} from '../../../src/domaines/serviceRecherche/recettes/adapters/recette.presenter.impl';
import { expect, describe, it } from 'vitest';

describe("Fichier de tests concernant le détail d'une recette", () => {
  it("En donnant l'id utilisateur, et l'id de la recette doit récuperer les détails", async () => {
    // GIVEN
    // WHEN
    const usecase = new RecupererDetailServiceRecettesUsecase(
      ServiceRechercheRecettesMock.avecRecetteARetourner({
        titre: 'Tian de sardines',
        image: '',
        tempsDePreparation: 30,
        ingredients: [
          { nom: 'sardines', quantite: '4', unite: 'unité' },
          { nom: 'tomates', quantite: '4', unite: 'unité' },
        ],
        etapes: ['Etape 1', 'Etape 2'],
        difficulte: 'Intérmédiaire',
      }),
    );
    await usecase.execute('idUtilisateur', 'idRecette', new RecettePresenterImpl(expectation));
    // THEN
    function expectation(recetteViewModel: RecetteViewModel) {
      expect(recetteViewModel).toStrictEqual<RecetteViewModel>({
        titre: 'Tian de sardines',
        image: '',
        tempsDePreparation: 'Temps de préparation : 30 min',
        ingredients: ['4 unité de sardines ', '4 unité de tomates '],
        etapes: ['Etape 1', 'Etape 2'],
        tag: {
          label: 'Intermédiaire',
          style: 'background--bleu-ecume-hover',
        },
      });
    }
  });
});
