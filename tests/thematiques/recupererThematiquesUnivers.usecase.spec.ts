import {
  ThematiquesPresenterImpl,
  ThematiqueViewModel,
} from '@/domaines/thematiques/adapters/thematiques.presenter.impl';
import { RecupererThematiquesUniversUsecase } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';
import { ThematiqueRepositoryMock } from './adapters/thematique.repository.mock';

describe('Fichier de tests concernant la récupération des thématiques pour un Univers', () => {
  it("En donnant l'id utilisateur et l'id de l'univers doit récupérer les thématiques", async () => {
    // GIVEN
    const usecase = new RecupererThematiquesUniversUsecase(
      new ThematiqueRepositoryMock([
        {
          titre: 'Thematique 1',
          id: '1',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estBloquee: false,
          raisonDuBlocage: '',
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: 'thematiqueParent1',
            label: 'Nom de thematique parent 1',
          },
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estBloquee: true,
          raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: 'thematiqueParent2',
            label: 'Nom de thematique parent 2',
          },
        },
      ]),
    );
    // WHEN
    await usecase.execute('1', '1', new ThematiquesPresenterImpl(expectation));
    // THEN
    function expectation(thematiques) {
      expect(thematiques).toEqual<ThematiqueViewModel[]>([
        {
          titre: 'Thematique 1',
          id: '1',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          blocage: undefined,
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematiqueParent1',
          tagThematique: undefined,
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          blocage: {
            raison: 'Depensez 1000 points pour débloquer cette thématique',
          },
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematiqueParent2',
          tagThematique: undefined,
        },
      ]);
    }
  });
});
