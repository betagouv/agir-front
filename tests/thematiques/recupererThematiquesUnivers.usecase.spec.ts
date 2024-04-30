import { ThematiquesPresenterImpl, ThematiqueViewModel } from '@/thematiques/adapters/thematiques.presenter.impl';
import { RecupererThematiquesUniversUsecase, Thematique } from '@/thematiques/recupererThematiquesUnivers.usecase';
import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';

class ThematiqueRepositoryMock implements ThematiqueRepository {
  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    return [
      {
        titre: 'Thematique 1',
        id: '1',
        progression: 0,
        estBloquee: false,
        raisonDuBlocage: '',
        estNouvelle: true,
        niveau: 0,
      },
      {
        titre: 'Thematique 2',
        id: '2',
        progression: 0,
        estBloquee: true,
        raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
        estNouvelle: true,
        niveau: 0,
      },
    ];
  }
}

describe('Fichier de tests concernant la récupération des thématiques pour un Univers', () => {
  it("En donnant l'id utilisateur et l'id de l'univers doit récupérer les thématiques", async () => {
    // GIVEN
    const usecase = new RecupererThematiquesUniversUsecase(new ThematiqueRepositoryMock());
    // WHEN
    await usecase.execute('1', '1', new ThematiquesPresenterImpl(expectation));
    // THEN
    function expectation(themeatiques) {
      expect(themeatiques).toEqual<ThematiqueViewModel[]>([
        {
          titre: 'Thematique 1',
          id: '1',
          progression: 0,
          blocage: undefined,
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: 0,
          blocage: {
            raison: 'Depensez 1000 points pour débloquer cette thématique',
          },
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
        },
      ]);
    }
  });
});
