import { ThematiqueViewModel } from '@/domaines/thematiques/adapters/thematiques.presenter.impl';
import { ThematiqueRepositoryMock } from './adapters/thematique.repository.mock';
import { RecupererListeThematiquesRecommandeesUsecase } from '@/domaines/thematiques/recupererListeThematiquesRecommandees.usecase';
import { ThematiquesRecommandeesPresenterImpl } from '@/domaines/thematiques/adapters/thematiquesRecommandees.presenter.impl';
import { ClefTechniqueAPI } from '@/shell/MenuUnivers';

describe('Fichier de tests concernant la récupération des thématiques recommandées', () => {
  it("En donnant l'id utilisateur, il doit récupérer ses thématiques recommandées", async () => {
    // GIVEN
    const usecase = new RecupererListeThematiquesRecommandeesUsecase(
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
            clefAPI: ClefTechniqueAPI.alimentation,
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
            clefAPI: ClefTechniqueAPI.transports,
            label: 'Nom de thematique parent 2',
          },
        },
        {
          titre: 'Thematique 3',
          id: '3',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estBloquee: true,
          raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefTechniqueAPI.consommation,
            label: 'Nom de thematique parent 3',
          },
        },
        {
          titre: 'Thematique 4',
          id: '4',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estBloquee: true,
          raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefTechniqueAPI.logement,
            label: 'Nom de thematique parent 4',
          },
        },
        {
          titre: 'Thematique 5',
          id: '5',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estBloquee: true,
          raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: 'thematique_inconnue',
            label: 'Nom de thematique parent 5',
          },
        },
      ]),
    );
    // WHEN
    await usecase.execute('1', new ThematiquesRecommandeesPresenterImpl(expectation));
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
          clefThematique: ClefTechniqueAPI.alimentation,
          tagThematique: {
            label: 'Nom de thematique parent 1',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoj: '🥗',
            },
          },
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
          clefThematique: ClefTechniqueAPI.transports,
          tagThematique: {
            label: 'Nom de thematique parent 2',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '?',
            },
          },
        },
        {
          titre: 'Thematique 3',
          id: '3',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          blocage: {
            raison: 'Depensez 1000 points pour débloquer cette thématiqu',
          },
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: ClefTechniqueAPI.consommation,
          tagThematique: {
            label: 'Nom de thematique parent 3',
            style: {
              backgroundColor: '#FFE8D7',
              color: '#522E02',
              emoji: '?',
            },
          },
        },
        {
          titre: 'Thematique 4',
          id: '4',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          blocage: {
            raison: 'Depensez 1000 points pour débloquer cette thématiqu',
          },
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: ClefTechniqueAPI.logement,
          tagThematique: {
            label: 'Nom de thematique parent 4',
            style: {
              backgroundColor: '#FFE2E0',
              color: '#52022E',
              emoji: '?',
            },
          },
        },
        {
          titre: 'Thematique 5',
          id: '5',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          blocage: {
            raison: 'Depensez 1000 points pour débloquer cette thématiqu',
          },
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematique_inconnue',
          tagThematique: {
            label: 'Nom de thematique parent 5',
            style: {
              backgroundColor: '#ececec',
              color: 'black',
              emoji: '?',
            },
          },
        },
      ]);
    }
  });
});
